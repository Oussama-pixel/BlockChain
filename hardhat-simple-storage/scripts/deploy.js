const {ethers} = require("hardhat"); 
//npm run compile

async function main(){
    const SimpleStorageFactory = await ethers.getContractFactory(
      "SimpleStorage"
    );
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`Deployed contract to: ${simpleStorage.address}`)
    const currentValue = await simpleStorage.retreive();
    console.log(`Current value : ${currentValue}`)

    //update current value 
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retreive();
    console.log(`Updated value : ${updatedValue}`)
}   

  async function verify(contractAddress,args){
    
  }

main()
    .then(()=>process.exit(0))
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    })