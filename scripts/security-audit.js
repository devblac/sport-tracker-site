#!/usr/bin/env node

/**
 * Security audit script
 * Performs comprehensive security checks and vulnerability assessment
 */

import https from 'https';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const log = {
  info: (msg) => console.log(chalk.blue('ℹ'), msg),
  success: (msg) => console.log(chalk.green('✓'), msg),
  error: (msg) => console.log(chalk.red('✗'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠'), msg),
};

// Security configuration
const PRODUCTION_URL = 'https://liftfire.app';
const SECURITY_HEADERS = {
  'strict-transport-security': {
    required: true,
    expectedValue: 'max-age=',
    description: 'HSTS header for HTTPS enforcement',
  },
  'x-frame-options': {
    required: true,
    expectedValue: 'DENY',
    description: 'Prevents clickjacking attacks',
  },
  'x-content-type-options': {
    required: true,
    expectedValue: 'nosniff',
    description: 'Prevents MIME type sniffing',
  },
  'x-xss-protection': {
    required: true,
    expectedValue: '1',
    description: 'XSS protection for older browsers',
  },
  'referrer-policy': {
    required: true,
    expectedValue: 'strict-origin',
    description: 'Controls referrer information',
  },
  'content-security-policy': {
    required: false,
    expectedValue: 'default-src',
    description: 'Content Security Policy',
  },
  'permissions-policy': {
    required: false,
    expectedValue: 'geolocation=',
    description: 'Feature Policy for browser APIs',
  },
};

// Vulnerability patterns to check for
const VULNERABILITY_PATTERNS = [
  {
    name: 'Hardcoded API Keys',
    pattern: /(?:api[_-]?key|secret|token|password)\s*[:=]\s*['"][a-zA-Z0-9_-]{20,}['"]/gi,
    severity: 'high',
    files: ['src/**/*.{ts,tsx,js,jsx}', '.env*', 'netlify.toml'],
  },
  {
    name: 'Console.log statements',
    pattern: /console\.(log|debug|info|warn|error)\s*\(/gi,
    severity: 'low',
    files: ['src/**/*.{ts,tsx,js,jsx}'],
  },
  {
    name: 'TODO/FIXME comments',
    pattern: /(TODO|FIXME|HACK|XXX):/gi,
    severity: 'info',
    files: ['src/**/*.{ts,tsx,js,jsx}'],
  },
  {
    name: 'Eval usage',
    pattern: /\beval\s*\(/gi,
    severity: 'high',
    files: ['src/**/*.{ts,tsx,js,jsx}'],
  },
  {
    name: 'innerHTML usage',
    pattern: /\.innerHTML\s*=/gi,
    severity: 'medium',
    files: ['src/**/*.{ts,tsx,js,jsx}'],
  },
  {
    name: 'HTTP URLs in production',
    pattern: /http:\/\/(?!localhost|127\.0\.0\.1|0\.0\.0\.0)/gi,
    severity: 'medium',
    files: ['src/**/*.{ts,tsx,js,jsx}'],
  },
];

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      timeout: 10000,
      headers: {
        'User-Agent': 'LiftFire-Security-Audit/1.0',
        ...options.headers,
      },
      method: options.method || 'GET',
    };

    const req = https.request(url, requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          url,
        });
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

async function checkSecurityHeaders() {
  log.info('Checking security headers...');
  
  try {
    const response = await makeRequest(PRODUCTION_URL);
    const headers = response.headers;
    const results = [];
    
    for (const [headerName, config] of Object.entries(SECURITY_HEADERS)) {
      const actualValue = headers[headerName.toLowerCase()];
      
      if (actualValue) {
        if (actualValue.includes(config.expectedValue)) {
          log.success(`${headerName}: ${actualValue}`);
          results.push({
            header: headerName,
            status: 'pass',
            value: actualValue,
            description: config.description,
          });
        } else {
          log.warning(`${headerName}: Unexpected value - ${actualValue}`);
          results.push({
            header: headerName,
            status: 'warning',
            value: actualValue,
            expected: config.expectedValue,
            description: config.description,
          });
        }
      } else {
        const severity = config.required ? 'error' : 'warning';
        log[severity](`${headerName}: Missing`);
        results.push({
          header: headerName,
          status: config.required ? 'fail' : 'missing',
          description: config.description,
          required: config.required,
        });
      }
    }
    
    return results;
  } catch (error) {
    log.error(`Security headers check failed: ${error.message}`);
    return [];
  }
}

async function checkSSLConfiguration() {
  log.info('Checking SSL/TLS configuration...');
  
  try {
    // Check SSL Labs API for detailed SSL analysis
    const sslLabsUrl = `https://api.ssllabs.com/api/v3/analyze?host=${new URL(PRODUCTION_URL).hostname}&publish=off&startNew=on&all=done`;
    
    log.info('Initiating SSL Labs scan (this may take a few minutes)...');
    
    // Start the scan
    await makeRequest(sslLabsUrl);
    
    // Wait a bit and check results
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const resultUrl = `https://api.ssllabs.com/api/v3/analyze?host=${new URL(PRODUCTION_URL).hostname}`;
    const sslResult = await makeRequest(resultUrl);
    
    try {
      const sslData = JSON.parse(sslResult.body);
      
      if (sslData.status === 'READY') {
        const grade = sslData.endpoints?.[0]?.grade || 'Unknown';
        log.success(`SSL Labs Grade: ${grade}`);
        
        return {
          grade,
          status: 'complete',
          details: sslData.endpoints?.[0],
        };
      } else {
        log.info(`SSL scan status: ${sslData.status}`);
        return {
          status: sslData.status,
          message: 'SSL scan in progress or failed',
        };
      }
    } catch (parseError) {
      log.warning('Could not parse SSL Labs response');
      return { status: 'error', error: 'Parse error' };
    }
  } catch (error) {
    log.warning(`SSL configuration check failed: ${error.message}`);
    return { status: 'error', error: error.message };
  }
}

async function scanForVulnerabilities() {
  log.info('Scanning for common vulnerabilities...');
  
  const results = [];
  
  for (const vulnerability of VULNERABILITY_PATTERNS) {
    log.info(`Checking for ${vulnerability.name}...`);
    
    try {
      // Use grep to search for patterns
      const grepCommand = `grep -r -n "${vulnerability.pattern.source}" ${vulnerability.files.join(' ')} || true`;
      const output = execSync(grepCommand, { 
        encoding: 'utf8', 
        stdio: 'pipe',
        maxBuffer: 1024 * 1024 // 1MB buffer
      });
      
      if (output.trim()) {
        const matches = output.trim().split('\n').filter(line => line.trim());
        
        if (matches.length > 0) {
          const severity = vulnerability.severity;
          log[severity === 'high' ? 'error' : severity === 'medium' ? 'warning' : 'info'](
            `Found ${matches.length} instances of ${vulnerability.name}`
          );
          
          results.push({
            name: vulnerability.name,
            severity: vulnerability.severity,
            matches: matches.slice(0, 10), // Limit to first 10 matches
            totalMatches: matches.length,
          });
        }
      } else {
        log.success(`No ${vulnerability.name} found`);
      }
    } catch (error) {
      log.warning(`Could not scan for ${vulnerability.name}: ${error.message}`);
    }
  }
  
  return results;
}

async function checkDependencyVulnerabilities() {
  log.info('Checking for dependency vulnerabilities...');
  
  try {
    // Run npm audit
    const auditOutput = execSync('npm audit --json', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    const auditData = JSON.parse(auditOutput);
    
    if (auditData.metadata.vulnerabilities.total === 0) {
      log.success('No dependency vulnerabilities found');
      return { status: 'clean', vulnerabilities: 0 };
    } else {
      const { high, moderate, low, info } = auditData.metadata.vulnerabilities;
      
      if (high > 0) {
        log.error(`Found ${high} high severity vulnerabilities`);
      }
      if (moderate > 0) {
        log.warning(`Found ${moderate} moderate severity vulnerabilities`);
      }
      if (low > 0) {
        log.info(`Found ${low} low severity vulnerabilities`);
      }
      
      return {
        status: 'vulnerabilities_found',
        vulnerabilities: auditData.metadata.vulnerabilities,
        advisories: Object.keys(auditData.advisories).length,
      };
    }
  } catch (error) {
    if (error.status === 1) {
      // npm audit returns exit code 1 when vulnerabilities are found
      try {
        const auditData = JSON.parse(error.stdout);
        const { high, moderate, low } = auditData.metadata.vulnerabilities;
        
        log.error(`Dependency vulnerabilities found: ${high} high, ${moderate} moderate, ${low} low`);
        
        return {
          status: 'vulnerabilities_found',
          vulnerabilities: auditData.metadata.vulnerabilities,
          advisories: Object.keys(auditData.advisories).length,
        };
      } catch (parseError) {
        log.error('Could not parse npm audit output');
        return { status: 'error', error: 'Parse error' };
      }
    } else {
      log.warning(`Dependency check failed: ${error.message}`);
      return { status: 'error', error: error.message };
    }
  }
}

async function checkFilePermissions() {
  log.info('Checking file permissions...');
  
  const sensitiveFiles = [
    '.env',
    '.env.local',
    '.env.production',
    'netlify.toml',
    'package.json',
    'package-lock.json',
  ];
  
  const results = [];
  
  for (const file of sensitiveFiles) {
    if (fs.existsSync(file)) {
      try {
        const stats = fs.statSync(file);
        const mode = (stats.mode & parseInt('777', 8)).toString(8);
        
        // Check if file is world-readable
        if (mode.endsWith('4') || mode.endsWith('6') || mode.endsWith('7')) {
          log.warning(`${file} is world-readable (${mode})`);
          results.push({
            file,
            mode,
            status: 'warning',
            issue: 'world-readable',
          });
        } else {
          log.success(`${file} permissions OK (${mode})`);
          results.push({
            file,
            mode,
            status: 'ok',
          });
        }
      } catch (error) {
        log.error(`Could not check permissions for ${file}: ${error.message}`);
        results.push({
          file,
          status: 'error',
          error: error.message,
        });
      }
    }
  }
  
  return results;
}

async function performSecurityAudit() {
  console.log(chalk.bold.blue('\n🔒 Security Audit and Vulnerability Assessment\n'));
  
  const results = {
    timestamp: new Date().toISOString(),
    url: PRODUCTION_URL,
    checks: {},
    summary: {
      total: 0,
      passed: 0,
      warnings: 0,
      failed: 0,
    },
  };
  
  // 1. Security Headers
  console.log(chalk.bold('🛡️  Security Headers'));
  console.log('-'.repeat(40));
  results.checks.securityHeaders = await checkSecurityHeaders();
  
  console.log('');
  
  // 2. SSL Configuration
  console.log(chalk.bold('🔐 SSL/TLS Configuration'));
  console.log('-'.repeat(40));
  results.checks.sslConfiguration = await checkSSLConfiguration();
  
  console.log('');
  
  // 3. Vulnerability Scan
  console.log(chalk.bold('🔍 Vulnerability Scan'));
  console.log('-'.repeat(40));
  results.checks.vulnerabilities = await scanForVulnerabilities();
  
  console.log('');
  
  // 4. Dependency Vulnerabilities
  console.log(chalk.bold('📦 Dependency Vulnerabilities'));
  console.log('-'.repeat(40));
  results.checks.dependencies = await checkDependencyVulnerabilities();
  
  console.log('');
  
  // 5. File Permissions
  console.log(chalk.bold('📁 File Permissions'));
  console.log('-'.repeat(40));
  results.checks.filePermissions = await checkFilePermissions();
  
  // Calculate summary
  const headersPassed = results.checks.securityHeaders.filter(h => h.status === 'pass').length;
  const headersWarnings = results.checks.securityHeaders.filter(h => h.status === 'warning').length;
  const headersFailed = results.checks.securityHeaders.filter(h => h.status === 'fail').length;
  
  const vulnHigh = results.checks.vulnerabilities.filter(v => v.severity === 'high').length;
  const vulnMedium = results.checks.vulnerabilities.filter(v => v.severity === 'medium').length;
  
  const permissionsOk = results.checks.filePermissions.filter(p => p.status === 'ok').length;
  const permissionsWarnings = results.checks.filePermissions.filter(p => p.status === 'warning').length;
  
  results.summary.passed = headersPassed + permissionsOk;
  results.summary.warnings = headersWarnings + vulnMedium + permissionsWarnings;
  results.summary.failed = headersFailed + vulnHigh;
  results.summary.total = results.summary.passed + results.summary.warnings + results.summary.failed;
  
  // Summary
  console.log(chalk.bold('\n📊 Security Audit Summary'));
  console.log('-'.repeat(50));
  console.log(`${chalk.green('✓')} Passed: ${results.summary.passed}`);
  console.log(`${chalk.yellow('⚠')} Warnings: ${results.summary.warnings}`);
  console.log(`${chalk.red('✗')} Failed: ${results.summary.failed}`);
  
  // Security Score
  const securityScore = Math.round(
    (results.summary.passed / Math.max(results.summary.total, 1)) * 100
  );
  
  console.log(`\n🏆 Security Score: ${securityScore}%`);
  
  if (securityScore >= 90) {
    log.success('Excellent security posture!');
  } else if (securityScore >= 75) {
    log.warning('Good security, but room for improvement');
  } else {
    log.error('Security needs attention');
  }
  
  // Recommendations
  console.log(chalk.bold('\n💡 Security Recommendations'));
  console.log('-'.repeat(50));
  
  const recommendations = [];
  
  if (headersFailed > 0) {
    recommendations.push('• Configure missing required security headers');
  }
  if (vulnHigh > 0) {
    recommendations.push('• Address high-severity code vulnerabilities immediately');
  }
  if (results.checks.dependencies.status === 'vulnerabilities_found') {
    recommendations.push('• Update dependencies with known vulnerabilities');
  }
  if (permissionsWarnings > 0) {
    recommendations.push('• Review and restrict file permissions');
  }
  
  if (recommendations.length === 0) {
    log.success('No immediate security recommendations!');
  } else {
    recommendations.forEach(rec => console.log(rec));
  }
  
  // Save results
  const resultsFile = `security-audit-${Date.now()}.json`;
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  log.info(`\nSecurity audit results saved to ${resultsFile}`);
  
  // Exit with appropriate code
  const hasFailures = results.summary.failed > 0;
  process.exit(hasFailures ? 1 : 0);
}

// Handle errors
process.on('unhandledRejection', (error) => {
  log.error('Unhandled error:', error.message);
  process.exit(1);
});

process.on('SIGINT', () => {
  log.info('\nSecurity audit interrupted');
  process.exit(0);
});

performSecurityAudit().catch((error) => {
  log.error('Security audit failed:', error.message);
  process.exit(1);
});