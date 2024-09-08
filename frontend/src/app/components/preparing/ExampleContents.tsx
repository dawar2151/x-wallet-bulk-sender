import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Card, CardContent, Typography } from '@mui/material';

export function ExampleContents() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
  const erc20List = [
    { receiver: '0xa0BfF9CA8aF0649eB056cA1a902b559Da97FFde9', amount: 1 },
    { receiver: '0x2a2fF9CA8aF0649eB056cA1a902b559Da97FFde9', amount: 2 },
    { receiver: '0x3a3fF9CA8aF0649eB056cA1a902b559Da97FFde9', amount: 3 },
    { receiver: '0x4a4fF9CA8aF0649eB056cA1a902b559Da97FFde9', amount: 4 },
  ];

  const erc721List = [
    { receiver: '0xa0BfF9CA8aF0649eB056cA1a902b559Da97FFde9', tokenId: 1 },
    { receiver: '0x2a2fF9CA8aF0649eB056cA1a902b559Da97FFde9', tokenId: 2 },
    { receiver: '0x3a3fF9CA8aF0649eB056cA1a902b559Da97FFde9', tokenId: 3 },
    { receiver: '0x4a4fF9CA8aF0649eB056cA1a902b559Da97FFde9', tokenId: 4 },
  ];

  const erc1155List = [
    { receiver: '0xa0BfF9CA8aF0649eB056cA1a902b559Da97FFde9', tokenId: 1, amount: 1 },
    { receiver: '0x2a2fF9CA8aF0649eB056cA1a902b559Da97FFde9', tokenId: 2, amount: 2 },
    { receiver: '0x3a3fF9CA8aF0649eB056cA1a902b559Da97FFde9', tokenId: 3, amount: 3 },
    { receiver: '0x4a4fF9CA8aF0649eB056cA1a902b559Da97FFde9', tokenId: 4, amount: 4 },
  ];
  return (
    <>
      <a href="#" className="text-[#0070f3]" onClick={handleOpen}>
        Example Data
      </a>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
        <div className="p-4">
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="mb-2">ERC20 Example (Receiver, Amount)</Typography>
          <ul className="list-disc pl-6">
            {erc20List.map((item, index) => (
              <li key={index} className="text-gray-700 mb-1">
                {item.receiver}, {item.amount}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="mb-2">ERC721 Example (Receiver, TokenId)</Typography>
          <ul className="list-disc pl-6">
            {erc721List.map((item, index) => (
              <li key={index} className="text-gray-700 mb-1">
                {item.receiver}, {item.tokenId}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-2">ERC1155 Example (Receiver, TokenId, Amount)</Typography>
          <ul className="list-disc pl-6">
            {erc1155List.map((item, index) => (
              <li key={index} className="text-gray-700 mb-1">
                {item.receiver}, {item.tokenId}, {item.amount}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
        </DialogBody>
      </Dialog>
    </>
  );
}