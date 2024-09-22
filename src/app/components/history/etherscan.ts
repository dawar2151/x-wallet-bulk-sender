import axios from 'axios'
import { Address } from 'viem';
import { sepolia } from 'viem/chains'

const NETWORKS: { [key: number]: { name: string; chainId: number } } = {
  1115511: {
    name: 'base',
    chainId: 11155111
  },
  56: {
    name: 'bsc',
    chainId: 56
  },
  1: {
    name: 'mainnet',
    chainId: 1
  },
  11155111: {
    name: 'sepolia',
    chainId: 11155111,
  },
}
const ETHERSCAN_API = process.env.ETHERSCAN_API;
export interface Transaction {
  tokenName: string
  tokenSymbol: string
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: string
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  isError: string
  txreceipt_status: string
  input: string
  contractAddress: string
  cumulativeGasUsed: string
  gasUsed: string
  confirmations: string
  methodId: string
  functionName: string
}
interface Result {
  status: string
  message: string
  result: readonly Transaction[]
}

export interface TransactionERC20 {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: string
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  isError: string
  txreceipt_status: string
  input: string
  contractAddress: string
  cumulativeGasUsed: string
  gasUsed: string
  confirmations: string
  methodId: string
  functionName: string
  tokenName: string
  tokenSymbol: string
  tokenDecimal: string
}
interface ResultERC20 {
  status: string
  message: string
  result: readonly TransactionERC20[]
}


const getTokenURL = (
  currentNetwork: number,
  account: Address
): string | null => {
  switch (currentNetwork) {
    case NETWORKS[1].chainId:
      return `https://api.basescan.org/api?module=account&action=tokentx&address=${account}&apikey=${ETHERSCAN_API}&sort=desc`
    case NETWORKS[56].chainId:
      return `https://api.bscscan.com/api?module=account&action=tokentx&address=${account}&apikey=${ETHERSCAN_API}&sort=desc`
    case NETWORKS[56].chainId:
      return `https://api.etherscan.io/api?module=account&action=txlist&address=${account}&apikey=${ETHERSCAN_API}&sort=asc`
    default:
      return `https://api-${NETWORKS[currentNetwork].name as string}.etherscan.io/api?module=account&action=txlist&address=${account}&apikey=${ETHERSCAN_API}&sort=desc`
  }
}

export const fetchErc20Transaction = async (
  currentNetwork: number,
  account: Address
): Promise<ResultERC20 | undefined> => {
  try {
    const url = getTokenURL(currentNetwork, account)
    if (url === null) {
      return undefined
    }
    const response = await axios.get(`${url}`)
    return response.data
  } catch (e) {
    return undefined
  }
}
