import { Address } from "viem";

export enum TokenType {
    Native = 'Native',
    ERC20 = 'ERC20',
    ERC721 = 'ERC721',
    ERC1155 = 'ERC1155',
    Other = 'Other'
}
export interface Receiver {
    address: string;
    amount: string;
}
export type BulkSenderState = {
    tokenType?: TokenType;
    tokenAddress?: Address;
    decimals?: number;
    symbol?: string;
    stringReceivers?: string;
    receivers?: Receiver[];
    totalAmount?: number;
}
export const initialBulkSenderState: BulkSenderState = {
    tokenType: TokenType.Native,
    stringReceivers: '',
    tokenAddress: '0x',
    decimals: 0,
    symbol: '',
    receivers: [{
        address: '',
        amount: ''
    }],
    totalAmount: 0
}