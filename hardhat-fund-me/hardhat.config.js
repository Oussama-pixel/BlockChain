require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers:[
      {version:"0.8.8"},
      {version:"0.6.6"}
    ]
  },
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/",
      chainId:31337
    },
  },
  gasReporter:{
    enabled:true,
    outputFile:"gas-report.txt",
    noColors:true,
    currency:"USD",
  }
};
