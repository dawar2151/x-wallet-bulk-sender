import { useReadContract } from 'wagmi';
import { ABI_ERC20 } from '@/app/abis/ERC20';
import { ABI_ERC721 } from '@/app/abis/ERC721';
import { ABI_ERC1155 } from '@/app/abis/ERC1155';
import { Address } from 'viem';
import { ContractType } from '@/app/types/BulkSenderState';
import { useContext } from 'react';
import { BulkSenderStateContext } from '../providers';


function useContractType() {
    const {bulkSenderState} = useContext(BulkSenderStateContext);
    let currentTokenType;
  // Check ERC20
  const { data: isERC20, error: errorERC20 } = useReadContract({
    address: bulkSenderState.tokenAddress as Address,
    abi: ABI_ERC20,
    functionName: 'decimals',
  });

  // Check ERC721
  // Check ERC721
  const { data: isERC721, error: errorERC721 } = useReadContract({
    address: bulkSenderState.tokenAddress as Address,
    abi: ABI_ERC721,
    functionName: 'ownerOf',
    args: [BigInt(1)],
  });

  // Check ERC1155
  const { data: isERC1155, error: errorERC1155 } = useReadContract({
    address: bulkSenderState.tokenAddress as Address,
    abi: ABI_ERC1155,
    functionName: 'uri',
    args: [BigInt(1)],
  });
  console.log(isERC20, isERC721, isERC1155);
  console.log(errorERC1155, errorERC20, errorERC721);
  if (isERC20) currentTokenType = ContractType.ERC20;
  else if (isERC721) currentTokenType =  ContractType.ERC721;
  else if (isERC1155 == '') currentTokenType = ContractType.ERC1155;
  else
  currentTokenType =  ContractType.Unknown;
   
return currentTokenType;
}

export default function CheckContractType() {
  const contractType = useContractType();
 
  return contractType;
}
