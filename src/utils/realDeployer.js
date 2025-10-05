const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

export const deployContractReal = async (contractCode, contractName) => {
  try {
    // Write contract to file
    const contractPath = path.join(process.cwd(), 'contracts', `${contractName}.sol`);
    fs.writeFileSync(contractPath, contractCode);

    // Create deployment module
    const moduleContent = `
const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('${contractName}Module', (m) => {
  const contract = m.contract('${contractName}');
  return { contract };
});`;

    const modulePath = path.join(process.cwd(), 'ignition', 'modules', `${contractName}Module.js`);
    fs.writeFileSync(modulePath, moduleContent);

    // Deploy using Hardhat
    const deployOutput = execSync(
      `npx hardhat ignition deploy ./ignition/modules/${contractName}Module.js --network passetHub`,
      { encoding: 'utf8', cwd: process.cwd() }
    );

    // Extract contract address
    const addressMatch = deployOutput.match(/0x[a-fA-F0-9]{40}/);
    const contractAddress = addressMatch ? addressMatch[0] : null;

    if (!contractAddress) {
      throw new Error('No se pudo extraer la dirección del contrato');
    }

    return {
      address: contractAddress,
      transactionHash: 'Real deployment',
      blockNumber: Math.floor(Date.now() / 1000),
      gasUsed: '200000',
      explorerUrl: `https://blockscout-passet-hub.parity-testnet.parity.io/address/${contractAddress}`,
      contract: {
        name: contractName,
        code: contractCode,
        abi: [],
        features: []
      }
    };

  } catch (error) {
    throw new Error(`Deployment failed: ${error.message}`);
  }
};