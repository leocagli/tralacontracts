const { Web3 } = require('web3');
const fs = require('fs');

async function deployWithWeb3() {
  try {
    // Connect to Polkadot Hub TestNet
    const web3 = new Web3('https://testnet-passet-hub-eth-rpc.polkadot.io');
    
    // Your private key
    const privateKey = '4ace1d904d766b93e513e67de170f76997ae1b03efcf33cce0a812fe9a719b79';
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    web3.eth.accounts.wallet.add(account);
    
    console.log('📍 Deploying from:', account.address);
    
    // Check balance
    const balance = await web3.eth.getBalance(account.address);
    console.log('💰 Balance:', web3.utils.fromWei(balance, 'ether'), 'PAS');
    
    if (balance === '0') {
      console.log('❌ No tokens found. Get tokens from: https://faucet.polkadot.io/?parachain=1111');
      console.log('   Address:', account.address);
      return;
    }
    
    // Contract bytecode and ABI (simplified)
    const contractCode = `
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
    `;
    
    // Simple bytecode for Storage contract
    const bytecode = '0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea2646970667358221220';
    
    const abi = [
      {
        "inputs": [{"internalType": "uint256", "name": "newNumber", "type": "uint256"}],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "retrieve",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ];
    
    console.log('🚀 Deploying Storage contract...');
    
    // Create contract instance
    const contract = new web3.eth.Contract(abi);
    
    // Deploy
    const deployTx = contract.deploy({ data: bytecode });
    const gas = await deployTx.estimateGas({ from: account.address });
    
    const deployedContract = await deployTx.send({
      from: account.address,
      gas: gas,
      gasPrice: await web3.eth.getGasPrice()
    });
    
    console.log('✅ Contract deployed!');
    console.log('📍 Address:', deployedContract.options.address);
    console.log('🔍 Explorer:', `https://blockscout-passet-hub.parity-testnet.parity.io/address/${deployedContract.options.address}`);
    
    // Update TestPage with real address
    const testPagePath = './src/components/TestPage.tsx';
    if (fs.existsSync(testPagePath)) {
      let content = fs.readFileSync(testPagePath, 'utf8');
      content = content.replace(
        /contractAddress = '[^']*'/,
        `contractAddress = '${deployedContract.options.address}'`
      );
      fs.writeFileSync(testPagePath, content);
      console.log('✅ TestPage updated with real contract address');
    }
    
    return deployedContract.options.address;
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
  }
}

deployWithWeb3();