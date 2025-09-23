#!/usr/bin/env node

/**
 * Production deployment verification script
 * Verifies that the deployed application is working correctly
 */

import { execSync } from 'child_process';
import https from 'https';
import http from 'http';
import { URL } from 'url';
import chalk from 'chalk';

const log = {
  info: (msg) => console.log(chalk.blue('ℹ'), msg),
  success: (msg) => console.log(chalk.green('✓'), msg),
  error: (msg) => console.log(chalk.red('✗'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠'), msg),
};

// Configuration
const PRODUCTION_URL = 'https://liftfire.app';
const STAGING_URL = 'https://develop--liftfire.netlify.app';
const TIMEOUT = 10000; // 10 seconds

async function makeRequest(url, timeout = TIMEOUT) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.get(url, {
      timeout,
      headers: {
        'User-Agent': 'LiftFire-Deployment-Verification/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    }, (res) => {
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
      reject(new Error(`Request timeout after ${timeout}ms`));
    });
  });
}

async function verifyUrl(url, description) {
  log.info(`Checking ${description}: ${url}`);
  
  try {
    const response = await makeRequest(url);
    
    if (response.statusCode === 200) {
      log.success(`${description} is accessible (${response.statusCode})`);
      return { success: true, response };
    } else {
      log.error(`${description} returned status ${response.statusCode}`);
      return { success: false, response };
    }
  } catch (error) {
    log.error(`${description} failed: ${error.message}`);
    return { success: false, error };
  }
}

async function verifyContent(response, checks) {
  const { body } = response;
  const results = [];
  
  for (const [name, check] of Object.entries(checks)) {
    try {
      const result = check(body);
      if (result) {
        log.success(`Content check passed: ${name}`);
        results.push({ name, success: true });
      } else {
        log.error(`Content check failed: ${name}`);
        results.push({ name, success: false });
      }
    } catch (error) {
      log.error(`Content check error: ${name} - ${error.message}`);
      results.push({ name, success: false, error: error.message });
    }
  }
  
  return results;
}

async function verifyHeaders(response, requiredHeaders) {
  const { headers } = response;
  const results = [];
  
  for (const [headerName, expectedValue] of Object.entries(requiredHeaders)) {
    const actualValue = headers[headerName.toLowerCase()];
    
    if (actualValue) {
      if (typeof expectedValue === 'string' && actualValue === expectedValue) {
        log.success(`Header check passed: ${headerName}`);
        results.push({ header: headerName, success: true });
      } else if (typeof expectedValue === 'function' && expectedValue(actualValue)) {
        log.success(`Header check passed: ${headerName}`);
        results.push({ header: headerName, success: true });
      } else {
        log.error(`Header check failed: ${headerName} (expected: ${expectedValue}, got: ${actualValue})`);
        results.push({ header: headerName, success: false, expected: expectedValue, actual: actualValue });
      }
    } else {
      log.error(`Header missing: ${headerName}`);
      results.push({ header: headerName, success: false, missing: true });
    }
  }
  
  return results;
}

async function runLighthouseAudit(url) {
  log.info(`Running Lighthouse audit on ${url}`);
  
  try {
    const command = `npx lighthouse ${url} --output=json --quiet --chrome-flags="--headless --no-sandbox"`;
    const output = execSync(command, { encoding: 'utf8', timeout: 60000 });
    const results = JSON.parse(output);
    
    const scores = {
      performance: Math.round(results.lhr.categories.performance.score * 100),
      accessibility: Math.round(results.lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(results.lhr.categories['best-practices'].score * 100),
      seo: Math.round(results.lhr.categories.seo.score * 100),
    };
    
    log.info('Lighthouse scores:');
    Object.entries(scores).forEach(([category, score]) => {
      const color = score >= 90 ? 'green' : score >= 70 ? 'yellow' : 'red';
      console.log(`  ${category}: ${chalk[color](score)}/100`);
    });
    
    return { success: true, scores };
  } catch (error) {
    log.error(`Lighthouse audit failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function verifyDeployment(environment = 'production') {
  const url = environment === 'production' ? PRODUCTION_URL : STAGING_URL;
  
  console.log(chalk.bold.blue(`\n🔍 Verifying ${environment} deployment\n`));
  
  const results = {
    environment,
    url,
    timestamp: new Date().toISOString(),
    checks: {},
  };
  
  // 1. Verify main page accessibility
  const mainPageResult = await verifyUrl(url, 'Main page');
  results.checks.mainPage = mainPageResult;
  
  if (!mainPageResult.success) {
    log.error('Main page is not accessible. Stopping verification.');
    return results;
  }
  
  // 2. Verify important pages
  const pages = [
    { path: '/features', name: 'Features page' },
    { path: '/pricing', name: 'Pricing page' },
    { path: '/roadmap', name: 'Roadmap page' },
    { path: '/es', name: 'Spanish homepage' },
    { path: '/es/features', name: 'Spanish features page' },
  ];
  
  for (const page of pages) {
    const pageResult = await verifyUrl(`${url}${page.path}`, page.name);
    results.checks[`page_${page.path.replace(/\//g, '_')}`] = pageResult;
  }
  
  // 3. Verify content
  const contentChecks = {
    'Has title': (body) => body.includes('<title>') && body.includes('LiftFire'),
    'Has meta description': (body) => body.includes('<meta name="description"'),
    'Has Open Graph tags': (body) => body.includes('og:title') && body.includes('og:description'),
    'Has structured data': (body) => body.includes('application/ld+json'),
    'Has React root': (body) => body.includes('id="root"'),
    'Has theme support': (body) => body.includes('dark:') || body.includes('theme'),
    'Has language support': (body) => body.includes('lang=') || body.includes('hreflang'),
  };
  
  const contentResults = await verifyContent(mainPageResult.response, contentChecks);
  results.checks.content = contentResults;
  
  // 4. Verify security headers
  const securityHeaders = {
    'x-frame-options': (value) => value.toLowerCase() === 'deny',
    'x-content-type-options': (value) => value.toLowerCase() === 'nosniff',
    'x-xss-protection': (value) => value.includes('1'),
    'referrer-policy': (value) => value.includes('strict-origin'),
  };
  
  const headerResults = await verifyHeaders(mainPageResult.response, securityHeaders);
  results.checks.headers = headerResults;
  
  // 5. Verify static assets
  const assetChecks = [
    { path: '/vite.svg', name: 'Favicon' },
    { path: '/robots.txt', name: 'Robots.txt' },
    { path: '/sitemap.xml', name: 'Sitemap' },
  ];
  
  for (const asset of assetChecks) {
    const assetResult = await verifyUrl(`${url}${asset.path}`, asset.name);
    results.checks[`asset_${asset.name.toLowerCase().replace(/\./g, '_')}`] = assetResult;
  }
  
  // 6. Run Lighthouse audit (only for production)
  if (environment === 'production') {
    const lighthouseResult = await runLighthouseAudit(url);
    results.checks.lighthouse = lighthouseResult;
  }
  
  // 7. Summary
  const totalChecks = Object.keys(results.checks).length;
  const passedChecks = Object.values(results.checks).filter(check => 
    Array.isArray(check) ? check.every(c => c.success) : check.success
  ).length;
  
  console.log(chalk.bold(`\n📊 Verification Summary\n`));
  console.log(`Environment: ${environment}`);
  console.log(`URL: ${url}`);
  console.log(`Checks passed: ${passedChecks}/${totalChecks}`);
  
  if (passedChecks === totalChecks) {
    log.success('All verification checks passed! 🎉');
  } else {
    log.warning(`${totalChecks - passedChecks} checks failed or had warnings`);
  }
  
  return results;
}

async function main() {
  const environment = process.argv[2] || 'production';
  
  if (!['production', 'staging'].includes(environment)) {
    log.error('Invalid environment. Use "production" or "staging"');
    process.exit(1);
  }
  
  try {
    const results = await verifyDeployment(environment);
    
    // Save results to file
    const fs = await import('fs');
    const resultsFile = `deployment-verification-${environment}-${Date.now()}.json`;
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    log.info(`Verification results saved to ${resultsFile}`);
    
    // Exit with appropriate code
    const allPassed = Object.values(results.checks).every(check => 
      Array.isArray(check) ? check.every(c => c.success) : check.success
    );
    
    process.exit(allPassed ? 0 : 1);
  } catch (error) {
    log.error(`Verification failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle errors
process.on('unhandledRejection', (error) => {
  log.error('Unhandled error:', error.message);
  process.exit(1);
});

process.on('SIGINT', () => {
  log.info('\nVerification interrupted');
  process.exit(0);
});

main().catch((error) => {
  log.error('Verification failed:', error.message);
  process.exit(1);
});