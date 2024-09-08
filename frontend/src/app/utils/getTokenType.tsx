import { useReadContract } from 'wagmi';
import { ABI_ERC20 } from '@/app/abis/ERC20';
import { ABI_ERC721 } from '@/app/abis/ERC721';
import { ABI_ERC1155 } from '@/app/abis/ERC1155';
import { Address } from 'viem';
import { ContractType } from '@/app/types/BulkSenderState';


function useContractType(address: Address) {

    let currentTokenType;
  // Check ERC20
  const { data: isERC20 } = useReadContract({
    address,
    abi: ABI_ERC20,
    functionName: 'totalSupply',
  });

  // Check ERC721
  const { data: isERC721 } = useReadContract({
    address,
    abi: ABI_ERC721,
    functionName: 'ownerOf',
    args: [BigInt(1)], // Sample tokenId
  });

  // Check ERC1155
  const { data: isERC1155 } = useReadContract({
    address,
    abi: ABI_ERC1155,
    functionName: 'uri',
    args: [BigInt(1)],
  });
  if (isERC20) currentTokenType = ContractType.ERC20;
  else if (isERC721) currentTokenType =  ContractType.ERC721;
  else if (isERC1155) currentTokenType = ContractType.ERC1155;
  else
  currentTokenType =  ContractType.Unknown;
   
return currentTokenType;
}

export default function CheckContractType({ contractAddress }:{ contractAddress: Address }) {
  const contractType = useContractType(contractAddress);
 
  return contractType;
}
