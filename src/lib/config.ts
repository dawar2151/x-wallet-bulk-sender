import { url } from 'inspector';
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, base, bsc } from 'wagmi/chains'
const sepoliaUrl = "https://sepolia.infura.io/v3/27ccbfa1c9d443d094d1b22e6c4af5cf";

export const config = createConfig({
  chains: [mainnet, sepolia, base, bsc],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(`https://sepolia.infura.io/v3/27ccbfa1c9d443d094d1b22e6c4af5cf`),
    [bsc.id]: http()
  },
})