require("@nomicfoundation/hardhat-toolbox");

const { vars } = require("hardhat/config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    passetHub: {
      url: 'https://testnet-passet-hub-eth-rpc.polkadot.io',
      accounts: [vars.get("PRIVATE_KEY")],
      chainId: 420420422,
      gasPrice: 1000000000,
      gas: 5000000
    },
  },
};