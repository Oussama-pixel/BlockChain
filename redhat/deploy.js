const ethers = require("ethers"); 
const fs  = require("fs-extra");
require("dotenv").config();
//npm run compile

async function main(){
    //HTTP://127.0.0.1:7545
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545")
    const encryptedJson = fs.readFileSync("./encryptedKey.json","utf8");
    let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson,process.env.PASSWORD);
    wallet = await wallet.connect(provider);
    //const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf8")
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf8");
    const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
    console.log("deploying, please wait...");
    const contract = await contractFactory.deploy();
    await contract.deployTransaction.wait(1);
    //get number
    const currentFavoriteNumber = await contract.retreive(); 
    console.log(`Current Favorite Number : ${currentFavoriteNumber.toString()}`);
    const transactionResponse = await contract.store("7");
    const transactionReceipt = await transactionResponse.wait(1);
    const updatedFavoriteNumber = await contract.retreive();
    console.log(`Updated Favorite Number : ${updatedFavoriteNumber.toString()}`);

    /*const nonce = await wallet.getTransactionCount();
    const tx = {
        nonce,
        gasPrice:2000000000,
        gasLimit:1000000,
        to:null,
        value:0,
        data:"0x608060405234801561001057600080fd5b50610973806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063471f7cdf146100675780636057361d146100855780636f760f41146100a15780638bab8dd5146100bd5780639e7a13ad146100ed578063b05784b81461011e575b600080fd5b61006f61013c565b60405161007c91906102ea565b60405180910390f35b61009f600480360381019061009a9190610345565b610142565b005b6100bb60048036038101906100b691906104b8565b610155565b005b6100d760048036038101906100d29190610514565b6101de565b6040516100e491906102ea565b60405180910390f35b61010760048036038101906101029190610345565b61020c565b6040516101159291906105dc565b60405180910390f35b6101266102c8565b60405161013391906102ea565b60405180910390f35b60005481565b806000819055506101516102c8565b5050565b600160405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190816101b49190610818565b505050806002836040516101c89190610926565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b6001818154811061021c57600080fd5b90600052602060002090600202016000915090508060000154908060010180546102459061063b565b80601f01602080910402602001604051908101604052809291908181526020018280546102719061063b565b80156102be5780601f10610293576101008083540402835291602001916102be565b820191906000526020600020905b8154815290600101906020018083116102a157829003601f168201915b5050505050905082565b60008054905090565b6000819050919050565b6102e4816102d1565b82525050565b60006020820190506102ff60008301846102db565b92915050565b6000604051905090565b600080fd5b600080fd5b610322816102d1565b811461032d57600080fd5b50565b60008135905061033f81610319565b92915050565b60006020828403121561035b5761035a61030f565b5b600061036984828501610330565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6103c58261037c565b810181811067ffffffffffffffff821117156103e4576103e361038d565b5b80604052505050565b60006103f7610305565b905061040382826103bc565b919050565b600067ffffffffffffffff8211156104235761042261038d565b5b61042c8261037c565b9050602081019050919050565b82818337600083830152505050565b600061045b61045684610408565b6103ed565b90508281526020810184848401111561047757610476610377565b5b610482848285610439565b509392505050565b600082601f83011261049f5761049e610372565b5b81356104af848260208601610448565b91505092915050565b600080604083850312156104cf576104ce61030f565b5b600083013567ffffffffffffffff8111156104ed576104ec610314565b5b6104f98582860161048a565b925050602061050a85828601610330565b9150509250929050565b60006020828403121561052a5761052961030f565b5b600082013567ffffffffffffffff81111561054857610547610314565b5b6105548482850161048a565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561059757808201518184015260208101905061057c565b60008484015250505050565b60006105ae8261055d565b6105b88185610568565b93506105c8818560208601610579565b6105d18161037c565b840191505092915050565b60006040820190506105f160008301856102db565b818103602083015261060381846105a3565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061065357607f821691505b6020821081036106665761066561060c565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026106ce7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610691565b6106d88683610691565b95508019841693508086168417925050509392505050565b6000819050919050565b600061071561071061070b846102d1565b6106f0565b6102d1565b9050919050565b6000819050919050565b61072f836106fa565b61074361073b8261071c565b84845461069e565b825550505050565b600090565b61075861074b565b610763818484610726565b505050565b5b818110156107875761077c600082610750565b600181019050610769565b5050565b601f8211156107cc5761079d8161066c565b6107a684610681565b810160208510156107b5578190505b6107c96107c185610681565b830182610768565b50505b505050565b600082821c905092915050565b60006107ef600019846008026107d1565b1980831691505092915050565b600061080883836107de565b9150826002028217905092915050565b6108218261055d565b67ffffffffffffffff81111561083a5761083961038d565b5b610844825461063b565b61084f82828561078b565b600060209050601f8311600181146108825760008415610870578287015190505b61087a85826107fc565b8655506108e2565b601f1984166108908661066c565b60005b828110156108b857848901518255600182019150602085019450602081019050610893565b868310156108d557848901516108d1601f8916826107de565b8355505b6001600288020188555050505b505050505050565b600081905092915050565b60006109008261055d565b61090a81856108ea565b935061091a818560208601610579565b80840191505092915050565b600061093282846108f5565b91508190509291505056fea2646970667358221220076b98adf23af65e2c4da9d6292b06e1c464c98cc973df3c0136e589aa64cf1764736f6c63430008110033",
        chainId:1337,
    };
    const sendTxResponse = await wallet.sendTransaction(tx);
    console.log(sendTxResponse);*/
}   

main()
    .then(()=>process.exit(0))
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    })