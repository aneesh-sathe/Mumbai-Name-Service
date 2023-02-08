const main = async () => {
  const [owner, random] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domain");
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();
  console.log("contract deployed by -> ", owner.address);
  console.log("contract deployed to -> ", domainContract.address);

  let reg = await domainContract.connect(random).registerDomain("mumbai");
  await reg.wait();

  const domainOwner = await domainContract.getAddress("mumbai");
  console.log("Domain Owner -> %s", domainOwner);

  reg = await domainContract
    .connect(random)
    .setDomain("mumbai", "https://www.youtube.com/watch?v=5m92gF0MFls");
  await reg.wait();

  reg = await domainContract.connect(random).getLink("mumbai");
  console.log("Domain set to -> ", reg);
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
