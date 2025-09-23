#!/usr/bin/env node

/**
 * Local deployment testing script
 * Simulates the CI/CD pipeline locally for testing
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import chalk from 'chalk';

const log = {
  info: (msg) => console.log(chalk.blue('ℹ'), msg),
  success: (msg) => console.log(chalk.green('✓'), msg),
  error: (msg) => console.log(chalk.red('✗'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠'), msg),
};

async function runCommand(command, description) {
  log.info(`Running: ${description}`);
  try {
    execSync(command, { stdio: 'inherit' });
    log.success(`Completed: ${description}`);
    return true;
  } catch (error) {
    log.error(`Failed: ${description}`);
    return false;
  }
}

async function main() {
  console.log(chalk.bold.blue('\n🚀 LiftFire Deployment Test\n'));

  // Check if node_modules exists
  if (!existsSync('node_modules')) {
    log.warning('node_modules not found, installing dependencies...');
    const installed = await runCommand('npm ci', 'Installing dependencies');
    if (!installed) {
      log.error('Failed to install dependencies');
      process.exit(1);
    }
  }

  // Quality checks
  console.log(chalk.bold('\n📋 Quality Checks\n'));
  
  const qualityChecks = [
    ['npm run type-check', 'TypeScript type checking'],
    ['npm run lint', 'ESLint code quality'],
    ['npm run format:check', 'Prettier formatting check'],
    ['npm run test:coverage', 'Unit tests with coverage'],
  ];

  for (const [command, description] of qualityChecks) {
    const success = await runCommand(command, description);
    if (!success) {
      log.error('Quality checks failed. Please fix the issues before deploying.');
      process.exit(1);
    }
  }

  // Build and optimization
  console.log(chalk.bold('\n🔨 Build & Optimization\n'));
  
  const buildSteps = [
    ['npm run build', 'Building application'],
    ['npm run build:analyze', 'Analyzing bundle size'],
  ];

  for (const [command, description] of buildSteps) {
    const success = await runCommand(command, description);
    if (!success) {
      log.error('Build failed. Please fix the issues before deploying.');
      process.exit(1);
    }
  }

  // Performance audit (optional)
  console.log(chalk.bold('\n⚡ Performance Audit\n'));
  
  log.info('Starting local server for Lighthouse audit...');
  
  // Start preview server in background
  const serverProcess = execSync('npm run preview &', { stdio: 'pipe' });
  
  // Wait a moment for server to start
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  try {
    await runCommand('npm run lighthouse', 'Running Lighthouse audit');
  } catch (error) {
    log.warning('Lighthouse audit failed or not configured');
  }

  // Kill the preview server
  try {
    execSync('pkill -f "vite preview"', { stdio: 'ignore' });
  } catch (error) {
    // Ignore errors when killing the process
  }

  console.log(chalk.bold.green('\n🎉 Deployment test completed successfully!\n'));
  
  log.info('Your application is ready for deployment.');
  log.info('Push to main branch to trigger production deployment.');
  log.info('Push to develop branch to trigger preview deployment.');
}

// Handle errors
process.on('unhandledRejection', (error) => {
  log.error('Unhandled error:', error.message);
  process.exit(1);
});

process.on('SIGINT', () => {
  log.info('\nDeployment test interrupted');
  process.exit(0);
});

main().catch((error) => {
  log.error('Deployment test failed:', error.message);
  process.exit(1);
});