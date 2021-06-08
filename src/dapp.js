const Web3 = require('web3');
const fs = require('fs');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function getWeb3() {
  return new Web3('http://localhost:8545');
}

function getSender() {
  return '0x6A64AEcFD6DcC04D2A5De06F26D3c3Ecc1ad0E09';
}

function getReceiver() {
    return '0xf28DF08Bc365eAa4652033C156e0e32eD611ba35';
}

function getMyCoinContract(web3, from, address) {
  const abi = JSON.parse(fs.readFileSync("./MyCoin_sol_MyCoin.json", { encoding : 'utf-8' }));
  
  return new web3.eth.Contract(abi, address, { from : from }); 
}

async function main() {
  
  if(process.argv.length < 3) {
      console.log("The address of the contract is required");
      return;
  }
  
  var address = process.argv[2];

  const web3 = getWeb3();
  const from = getSender();
  const to = getReceiver();

  const MyCoin = getMyCoinContract(web3, from, address);

  const existingBalance = await MyCoin.methods.getBalance(to).call();

  MyCoin.methods.sendCoin(to, 1).send({ gasPrice: 25e9 })

  await delay(1000);

  const newBalance = await MyCoin.methods.getBalance(to).call();

  console.log(`Existing balance was ${existingBalance}. New balance is ${newBalance}`);

}

main();