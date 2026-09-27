require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { task } = require("hardhat/config");

task("accounts", "Prints the list of accounts", async (_, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

const { ALCHEMY_API_KEY_URL, MUMBAI_PRIVATE_KEY, POLYGONSCAN_KEY } = process.env;

if (!ALCHEMY_API_KEY_URL || !MUMBAI_PRIVATE_KEY) {
  throw new Error("❌ Missing environment variables in .env file");
}

module.exports = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true, // ✅ Fixes "Stack too deep"
    },
  },

  networks: {
    hardhat: {},
    amoy: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [MUMBAI_PRIVATE_KEY],
      chainId: 80002, // ✅ Polygon Amoy Testnet Chain ID
    },
  },

  etherscan: {
    apiKey: {
      polygonAmoy: POLYGONSCAN_KEY,
    },
    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },
    ],
  },
};
