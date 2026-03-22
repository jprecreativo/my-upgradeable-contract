const { ethers, upgrades } = require('hardhat');

// Make sure this is your actual Proxy address from the previous deployment
const proxyAddress = '0xF4FF4Ca731E2fCce18166CE49eeE852A4C717B66';

async function main() {
  console.log("Preparing upgrade...");

  const VendingMachineV2 = await ethers.getContractFactory('VendingMachineV2');
  
  // 1. Upgrade the proxy
  const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV2);

  // 2. Wait for the upgrade transaction to be mined (v6 syntax)
  await upgraded.waitForDeployment();

  // 3. Get the new implementation address
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );

  // 4. In v6, contract calls like owner() return a Promise, so we MUST await them
  const owner = await upgraded.owner();

  console.log('--------------------------------------------');
  console.log('Proxy address (stays the same): ' + proxyAddress);
  console.log('New Implementation address: ' + implementationAddress);
  console.log("The current contract owner is: " + owner);
  console.log('--------------------------------------------');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });