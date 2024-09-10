import axios from 'axios'
import { sepolia } from 'viem/chains'

const NETWORKS = {
  base: 'base',
  bsc: 'bsc',
  mainnet: 'mainnet',
  sepolia: 'sepolia',
}
const ETHERSCAN_API = "CRGFC2A36MV1J8HJGQ8RJRICDXI3J4N33Q";
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

const getMainURL = (
  currentNetwork: string,
  account: Address
): string | null => {
  switch (currentNetwork) {
    case NETWORKS.base:
      return `https://api.basescan.org/api?module=account&action=txlist&address=${account}&apikey=${ETHERSCAN_API}&sort=asc`
    case NETWORKS.bsc:
      return `https://api.bscscan.com/api?module=account&action=txlist&address=${account}&apikey=${ETHERSCAN_API}&sort=asc`
    case NETWORKS.mainnet:
      return `https://api.etherscan.io/api?module=account&action=txlist&address=${account}&apikey=${ETHERSCAN_API}&sort=asc`

    default:
      return `https://api-${currentNetwork}.etherscan.io/api?module=account&action=txlist&address=${account}&apikey=${ETHERSCAN_API}&sort=asc`
  }
}
const getTokenURL = (
  currentNetwork: string,
  account: Address
): string | null => {
  switch (currentNetwork) {
    case NETWORKS.base:
      return `https://api.basescan.org/api?module=account&action=tokentx&address=${account}&apikey=${ETHERSCAN_API}&sort=desc`
    case NETWORKS.bsc:
      return `https://api.bscscan.com/api?module=account&action=tokentx&address=${account}&apikey=${ETHERSCAN_API}&sort=desc`
    case NETWORKS.mainnet:
      return `https://api.etherscan.io/api?module=account&action=txlist&address=${account}&apikey=${ETHERSCAN_API}&sort=asc`
    default:
      return `https://api-${currentNetwork}.etherscan.io/api?module=account&action=txlist&address=${account}&apikey=${ETHERSCAN_API}&sort=asc`
  }
}
const fetchTransaction = async (
  currentNetwork: string,
  account: Address
): Promise<Result | undefined> => {
  try {
    const url = getMainURL(currentNetwork, account)
    if (url === null) {
      return undefined
    }
    const response = await axios.get(`${url}`)
    return response.data
  } catch (e) {
    console.log(e)
    return undefined
  }
}
export const fetchErc20Transaction = async (
  currentNetwork: string,
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
    console.log(e)
    return undefined
  }
}
