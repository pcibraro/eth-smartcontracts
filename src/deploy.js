const Web3 = require('web3');
const fs = require('fs');

function getWeb3() {
  return new Web3('http://localhost:8545');
}

function getSender() {
  return '0x6A64AEcFD6DcC04D2A5De06F26D3c3Ecc1ad0E09';
}

function getMyCoinContract(web3) {
  const abi = JSON.parse(fs.readFileSync("./MyCoin_sol_MyCoin.json", { encoding : 'utf-8' }));
  const data = '0x' + fs.readFileSync("./MyCoin_sol_MyCoin.bin", { encoding : 'utf-8' });;
  
  return new web3.eth.Contract(abi, { data : data }); 
}

async function main() {
  const web3 = getWeb3();
  const from = getSender();
  
  const MyCoin = getMyCoinContract(web3);

  const instance =  await MyCoin.deploy().send({ from, gas: 1000000 });
  
  const address = instance.options.address;
  
  console.log(`Contract deployed at ${address}`);
}

main();