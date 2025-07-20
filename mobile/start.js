#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Path to the react-native binary
const rnBinPath = path.join(__dirname, 'node_modules', '.bin', 'react-native');

// Start the Metro bundler
const metro = spawn(rnBinPath, ['start'], { 
  stdio: 'inherit',
  shell: true
});

metro.on('error', (err) => {
  console.error('Failed to start Metro bundler:', err);
  process.exit(1);
});