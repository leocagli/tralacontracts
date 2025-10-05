const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function deployContract(contractCode, contractName) {
  try {
    // Escribir contrato generado por Blockly
    const contractPath = path.join(__dirname, '..', '..', 'contracts', `${contractName}.sol`);
    fs.writeFileSync(contractPath, contractCode);

    // Compilar
    execSync('npx hardhat compile', { 
      cwd: path.join(__dirname, '..', '..'),
      stdio: 'inherit' 
    });

    // Crear módulo de deployment
    const moduleContent = `
const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('${contractName}Module', (m) => {
  const contract = m.contract('${contractName}');
  return { contract };
});`;

    const modulePath = path.join(__dirname, '..', '..', 'ignition', 'modules', `${contractName}Module.js`);
    fs.writeFileSync(modulePath, moduleContent);

    // Desplegar
    const deployOutput = execSync(
      `npx hardhat ignition deploy ./ignition/modules/${contractName}Module.js --network paseo`,
      { 
        cwd: path.join(__dirname, '..', '..'),
        encoding: 'utf8' 
      }
    );

    // Extraer dirección del contrato
    const addressMatch = deployOutput.match(/0x[a-fA-F0-9]{40}/);
    const contractAddress = addressMatch ? addressMatch[0] : null;

    return {
      success: true,
      address: contractAddress,
      transactionHash: 'Generated after deployment',
      explorerUrl: `https://paseo.subscan.io/account/${contractAddress}`
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = { deployContract };