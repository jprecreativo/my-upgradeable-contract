const { ethers, upgrades } = require('hardhat');

async function main() {
  console.log("Starting deployment...");

  const VendingMachineV1 = await ethers.getContractFactory('VendingMachineV1');
  
  console.log("Deploying Proxy...");
  
  const proxy = await upgrades.deployProxy(VendingMachineV1, [100]);

  // Wait for the transaction to be mined on Sepolia
  await proxy.waitForDeployment();

  // Retrieve addresses
  const proxyAddress = await proxy.getAddress();
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);

  console.log('--------------------------------------------');
  console.log('Proxy contract address: ' + proxyAddress);
  console.log('Implementation contract address: ' + implementationAddress);
  console.log('--------------------------------------------');
}

// Robust error handling and exit process
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });