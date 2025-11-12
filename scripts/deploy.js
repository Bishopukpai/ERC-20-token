const hre = require("hardhat");

async function main(){
    const Longtoken = await hre.ethers.getContractFactory("Longtoken")
    const longToken = await Longtoken.deploy(100000000, 50);

    await longToken.waitForDeployment();

    console.log("Long token deployed: ", await longToken.getAddress());
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})