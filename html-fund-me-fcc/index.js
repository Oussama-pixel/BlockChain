import {ethers} from "./ethers-5.6.esm.min.js";
import {abi, contractAddress} from './constants.js'

const connectButton = document.getElementById("ConnectButton") 
const fundButton = document.getElementById("fundButton")
const BalanceButton = document.getElementById("balanceButton")
const widthdrawButton = document.getElementById("withdrawButton")

connectButton.onclick = connect;
fundButton.onclick = fund;
BalanceButton.onclick = getBalance;
widthdrawButton.onclick = withdraw;

async function connect(){
    if(typeof(window.ethereum) !== "undefined") {
     console.log("i see a metamask!")
     await window.ethereum.request({method:"eth_requestAccounts"})
     document.getElementById("connectButton").innerHTML = "Connected"
    }else{
        document.getElementById("connectButton").innerHTML =
         "Please install metamask!"
    }
}

//fund function 
async function fund(){
    const ethAmount = document.getElementById("ethamount").value;
    console.log(`Funding with ${ethAmount}...`);
    if(typeof(window.ethereum) !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress , abi , signer)
        try {
            const transactionResponse = await contract.fund({
                value:ethers.utils.parseEther(ethAmount)
            })
            //listen for the tx to be mined
            await listenForTransactionMine(transactionResponse, provider)
        } catch (error) {
            console.log(error);
        }
        
    }
}

function listenForTransactionMine(transactionRespnose, provider){
    console.log(`Mining ${transactionRespnose.hash} ...`);
    return new Promise((resolve,reject)=>{
        provider.once(transactionRespnose.hash, ( transactionReceipt )=>{
            console.log(`Completed with ${transactionReceipt.confirmations} confirmations`);
        });
        resolve();
    })
}
//get balance of account
async function getBalance(){
    if(typeof(window.ethereum)!=="undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(contractAddress);
        console.log(ethers.utils.formatEther(balance))
    }
}

//withdraw function
async function withdraw(){
    if(typeof(window.ethereum)!=="undefined"){
        console.log("Withdrawing ...")
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress , abi , signer)
        try {
            const transactionResponse = await contract.withdraw();
            await listenForTransactionMine(transactionResponse,provider)
        } catch (error) {
            console.log(err)
        }

    }
}