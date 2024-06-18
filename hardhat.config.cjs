require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    version: "0.8.4",
  },
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: "https://polygon-amoy.g.alchemy.com/v2/IupynVF5yWkCysI40cqtzsnvtDeAT4Sr",
      accounts: [
        "2659e8c5d3e1f43dc1b9e61e75cc0f4d919aa226156f85ef724197d6114e6dd7",
      ],
      matic: {
        url: "https://polygon-amoy.g.alchemy.com/v2/IupynVF5yWkCysI40cqtzsnvtDeAT4Sr",
        accounts: [
          "2659e8c5d3e1f43dc1b9e61e75cc0f4d919aa226156f85ef724197d6114e6dd7",
        ],
      },
    },
  },
};
