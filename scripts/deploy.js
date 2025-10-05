const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function deployContract(contractCode, contractName = 'DynamicContract') {
  try {
    // Write contract to file
    const contractPath = path.join(__dirname, '..', 'contracts', `${contractName}.sol`);
    fs.writeFileSync(contractPath, contractCode);

    // Compile contract
    console.log('Compiling contract...');
    execSync('npx hardhat compile', { stdio: 'inherit' });

    // Create deployment module
    const moduleContent = `
const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('${contractName}Module', (m) => {
  const contract = m.contract('${contractName}');
  return { contract };
});`;

    const modulePath = path.join(__dirname, '..', 'ignition', 'modules', `${contractName}Module.js`);
    fs.writeFileSync(modulePath, moduleContent);

    // Deploy to Polkadot
    console.log('Deploying to Polkadot Hub TestNet...');
    const deployOutput = execSync(`npx hardhat ignition deploy ./ignition/modules/${contractName}Module.js --network passetHub`, 
      { encoding: 'utf8' });

    // Extract contract address from output
    const addressMatch = deployOutput.match(/0x[a-fA-F0-9]{40}/);
    const contractAddress = addressMatch ? addressMatch[0] : null;

    return {
      success: true,
      address: contractAddress,
      transactionHash: 'Generated after deployment',
      explorerUrl: `https://blockscout-passet-hub.parity-testnet.parity.io/address/${contractAddress}`
    };

  } catch (error) {
    console.error('Deployment failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Export for use in other modules
module.exports = { deployContract };

// CLI usage
if (require.main === module) {
  const contractCode = process.argv[2];
  const contractName = process.argv[3] || 'DynamicContract';
  
  if (!contractCode) {
    console.error('Usage: node deploy.js "<contract_code>" [contract_name]');
    process.exit(1);
  }

  deployContract(contractCode, contractName)
    .then(result => {
      console.log('Deployment result:', JSON.stringify(result, null, 2));
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}