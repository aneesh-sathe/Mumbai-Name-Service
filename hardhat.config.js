require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: "kqwR9H_n3YYoZ7at4nD1i1j7-wv93xqT",
      accounts: [process.env.PRIVATE],
    },
  },
};
