// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying MedicineRegistry contract...");

  // ✅ Get the contract factory
  const MedicineRegistry = await hre.ethers.getContractFactory("MedicineRegistry");

  // ✅ Deploy the contract
  const contract = await MedicineRegistry.deploy();

  // ✅ Wait for deployment (Ethers v5 syntax)
  await contract.deployed();

  // ✅ Print address
  console.log("✅ Contract deployed successfully!");
  console.log("📜 Contract Address:", contract.address);

  // ✅ Optional: Verify automatically
  // console.log("🔍 Verifying on PolygonScan...");
  // await hre.run("verify:verify", {
  //   address: contract.address,
  //   constructorArguments: [],
  // });
  // console.log("✅ Verified successfully!");
}

// Run deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
