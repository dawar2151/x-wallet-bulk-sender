import { Address } from "viem";

export enum ContractType {
    Native = 'Native',
    ERC20 = 'ERC20',
    ERC721 = 'ERC721',
    ERC1155 = 'ERC1155',
    Unknown = 'Unknown',
    }
export enum TypingType {
    Upload = 'Upload',
    Manually = 'Manually'
}

export interface Receiver {
    address: string;
    amount: string;
}
export enum STEPS  {
    PREPARING = "Preparing",
    APPROVE = "Approve",
    TRANSFER ="Transfer"
}
export type BulkSenderState = {
    currentStep: STEPS;
    contractType?: ContractType;
    tokenAddress?: Address;
    tokenSymbol?: string;
    currentTokenBalance?: number;
    decimals?: number;
    symbol?: string;
    stringReceivers?: string;
    receivers?: Receiver[];
    totalAmount?: number;
    currentGasPrice?: number;
    currentTypingType:TypingType
}
export const initialBulkSenderState: BulkSenderState = {
    currentStep: STEPS.PREPARING,
    contractType: ContractType.Native,
    stringReceivers: '',
    tokenSymbol: 'ETh',
    currentTokenBalance: 0,
    decimals: 0,
    symbol: '',
    receivers: [{
        address: '',
        amount: ''
    }],
    totalAmount: 0,
    currentGasPrice: 0,
    currentTypingType: TypingType.Upload
}