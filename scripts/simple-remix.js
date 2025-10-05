const { exec } = require('child_process');

console.log('🚀 Opening Remix IDE...');

// Open Remix in default browser
exec('start https://remix.ethereum.org', (error) => {
  if (error) {
    console.error('Error opening browser:', error);
    return;
  }
});

console.log('\n📋 Manual steps in Remix:');
console.log('1. Create new file: Storage.sol');
console.log('2. Paste this contract code:');
console.log(`
// SPDX-License-Identifier: MIT
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
}
`);
console.log('3. Compile: Solidity Compiler → Compile');
console.log('4. Deploy: Deploy & Run → Injected Provider');
console.log('5. Add network in MetaMask:');
console.log('   - RPC: https://testnet-passet-hub-eth-rpc.polkadot.io');
console.log('   - Chain ID: 420420422');
console.log('6. Import key: 4ace1d904d766b93e513e67de170f76997ae1b03efcf33cce0a812fe9a719b79');
console.log('7. Get tokens: https://faucet.polkadot.io/?parachain=1111');
console.log('8. Deploy contract and copy address');
console.log('\n✅ Remix should be opening now...');