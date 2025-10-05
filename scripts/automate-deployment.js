const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 1. Ensure directories exist
const contractsDir = path.join(__dirname, '..', 'contracts');
const ignitionDir = path.join(__dirname, '..', 'ignition', 'modules');

if (!fs.existsSync(contractsDir)) {
  fs.mkdirSync(contractsDir, { recursive: true });
}

if (!fs.existsSync(ignitionDir)) {
  fs.mkdirSync(ignitionDir, { recursive: true });
}

// 2. Create default Storage contract if not exists
const storageContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Storage {
    uint256 private number;
    event NumberChanged(uint256 newNumber);

    function store(uint256 newNumber) public {
        number = newNumber;
        emit NumberChanged(newNumber);
    }

    function retrieve() public view returns (uint256) {
        return number;
    }
}`;

const storageContractPath = path.join(contractsDir, 'Storage.sol');
if (!fs.existsSync(storageContractPath)) {
  fs.writeFileSync(storageContractPath, storageContract);
  console.log('✅ Storage.sol created');
}

// 3. Create StorageModule if not exists
const storageModule = `const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('StorageModule', (m) => {
  const storage = m.contract('Storage');
  return { storage };
});`;

const storageModulePath = path.join(ignitionDir, 'StorageModule.js');
if (!fs.existsSync(storageModulePath)) {
  fs.writeFileSync(storageModulePath, storageModule);
  console.log('✅ StorageModule.js created');
}

// 4. Check if private key is set
try {
  execSync('npx hardhat vars get PRIVATE_KEY', { stdio: 'pipe' });
  console.log('✅ Private key configured');
} catch (error) {
  console.log('❌ Private key not set. Run: npx hardhat vars set PRIVATE_KEY "your_key"');
  process.exit(1);
}

// 5. Compile contracts
try {
  console.log('🔨 Compiling contracts...');
  execSync('npx hardhat compile', { stdio: 'inherit' });
  console.log('✅ Contracts compiled');
} catch (error) {
  console.log('❌ Compilation failed');
  process.exit(1);
}

// 6. Deploy to Polkadot Hub TestNet
try {
  console.log('🚀 Deploying to Polkadot Hub TestNet...');
  const deployOutput = execSync(
    'npx hardhat ignition deploy ./ignition/modules/StorageModule.js --network passetHub',
    { encoding: 'utf8' }
  );
  
  console.log(deployOutput);
  
  // Extract contract address
  const addressMatch = deployOutput.match(/0x[a-fA-F0-9]{40}/);
  if (addressMatch) {
    const contractAddress = addressMatch[0];
    console.log(`✅ Contract deployed at: ${contractAddress}`);
    console.log(`🔍 Explorer: https://blockscout-passet-hub.parity-testnet.parity.io/address/${contractAddress}`);
    
    // Update TestPage with real address
    const testPagePath = path.join(__dirname, '..', 'src', 'components', 'TestPage.tsx');
    if (fs.existsSync(testPagePath)) {
      let testPageContent = fs.readFileSync(testPagePath, 'utf8');
      testPageContent = testPageContent.replace(
        /contractAddress = '[^']*'/,
        `contractAddress = '${contractAddress}'`
      );
      fs.writeFileSync(testPagePath, testPageContent);
      console.log('✅ TestPage updated with real contract address');
    }
  }
  
} catch (error) {
  console.log('❌ Deployment failed:', error.message);
  process.exit(1);
}

console.log('🎉 All tasks completed successfully!');