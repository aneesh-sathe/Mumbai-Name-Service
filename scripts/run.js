const main = async () => {
  const [owner, random] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domain");
  const domainContract = await domainContractFactory.deploy("mumbai");
  await domainContract.deployed();
  console.log("contract deployed by -> ", owner.address);
  console.log("contract deployed to -> ", domainContract.address);

  let reg = await domainContract
    .connect(random)
    .registerDomain("aneesh", { value: hre.ethers.utils.parseEther("0.1") });
  await reg.wait();

  const domainOwner = await domainContract.getAddress("aneesh");
  console.log("Domain Owner -> %s", domainOwner);

  reg = await domainContract
    .connect(random)
    .setDomain("aneesh", "https://www.youtube.com/watch?v=5m92gF0MFls");
  await reg.wait();

  reg = await domainContract.connect(random).getLink("aneesh");
  console.log("Domain set to -> ", reg);

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
