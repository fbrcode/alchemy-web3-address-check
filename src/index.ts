import Web3 from "web3";
import dotenv from "dotenv";
dotenv.config();

async function checkAddressType(address: string): Promise<string> {
  const alchemyUrl = process.env.ETH_NODE_MAINNET || undefined;
  if (!alchemyUrl) {
    throw new Error("No alchemy ethereum node URL found in .env file");
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(alchemyUrl));

  try {
    const code = await web3.eth.getCode(address);
    return code === "0x" ? "Wallet Address" : "Smart Contract";
  } catch (error: any) {
    return "Error checking address type: " + error.message;
  }
}

async function main() {
  const a1 = "0x264bd8291fae1d75db2c5f573b07faa6715997b5";
  const a2 = "0x7a250d5630b4cf539739df2c5dacb4c659f2488d";

  console.log(`address ${a1} is: ${await checkAddressType(a1)}`);
  console.log(`address ${a2} is: ${await checkAddressType(a2)}`);
}

main();
