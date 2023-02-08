const { ethers } = require("hardhat");

const main = async () => {
  const [random] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domain");
  const domainContract = await domainContractFactory.deploy("mumbai");
  await domainContract.deployed();

  console.log("contract address -> ", domainContract.address);

  let txn = await domainContract
    .connect(random)
    .registerDomain("aneesh", { value: hre.ethers.utils.parseEther("0.5") });
  await txn.wait();

  console.log("aneesh.mumbai minted");

  txn = await domainContract
    .connect(random)
    .setDomain("aneesh", "https://www.youtube.com/watch?v=WILNIXZr2oc");
  await txn.wait();
  const link = await domainContract.connect(random).getLink("aneesh");
  console.log("aneesh.mumbai set to ->", link);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("contract balance -> ", hre.ethers.utils.formatEther(balance));
};

const run = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

run();
