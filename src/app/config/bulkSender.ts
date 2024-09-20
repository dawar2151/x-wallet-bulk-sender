import { Address } from "viem";

interface NetworkDetails {
    bulkSenderAddress: Address;
    etherscanURL: string;
    etherscanAPIKey: string;
}
export const NetworksConfig:{[key: number]: NetworkDetails} = {
    11155111:{
        bulkSenderAddress: "0x51B9a5d850375F59656f33226aeB145514Ba8496",
        etherscanAPIKey: '000000',
        etherscanURL: 'https://sepolia.etherscan.io',
    }
}