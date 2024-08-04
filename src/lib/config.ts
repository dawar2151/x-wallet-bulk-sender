import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, base, bsc } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, base, bsc],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http()
  },
})