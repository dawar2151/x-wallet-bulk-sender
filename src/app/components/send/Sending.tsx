import { useTransferHelper } from "../confirm/useTransferHelper"
import React, { use, useEffect } from "react";
import { Alert, Button, Spinner, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { NetworksConfig } from "@/app/config/bulkSender";
import { useAccount } from "wagmi";

export const Sending = () => {
    const {transfer, isTransferConfirmed, isTransferSuccess, isTransferPending, isTransferConfirming, transferError, hash} = useTransferHelper();
    const [called, setCalled] = React.useState(false);

    useEffect(() => {
      if(!called){
        transfer()
      }else
        setCalled(true)
      //}
    }, [])
    return (    
        <>
        {(isTransferPending) && <LoadingAlert />}
        {(isTransferConfirming) && <ConfirmingAlert />}
        {(isTransferConfirmed) && <SuccessAlert hash={hash}/>}
        {transferError && <ErrorAlert resend={()=>transfer()} />}
      </>
    )
}

 
function IconSuccess() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function IconLoading() {
  return (
    <Spinner color="blue" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
  );
}
function ErrorIcon() {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        color="white"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
function LoadingAlert(){
    const [open, setOpen] = React.useState(true);
    return <Alert
    open={open}
    icon={<IconLoading />}
    onClose={() => setOpen(false)}
  >
    <Typography variant="h5" color="white">
      Sending
    </Typography>
    <Typography color="white" className="mt-2 font-normal">
      Please validate transaction on your wallet.
    </Typography>
  </Alert>
}
function ConfirmingAlert(){
  const [open, setOpen] = React.useState(true);
  return <Alert
  open={open}
  icon={<IconLoading />}
  onClose={() => setOpen(false)}
>
  <Typography variant="h5" color="white">
    Confirming
  </Typography>
  <Typography color="white" className="mt-2 font-normal">
    Please wait while the transaction is being confirmed.
  </Typography>
</Alert>
}
function ErrorAlert({resend}:{resend:()=>void}){
    const [open, setOpen] = React.useState(true);
    return <Alert
    open={open}
    color="amber"
    icon={<ErrorIcon />}
    onClose={() => setOpen(false)}
  >
    <Typography variant="h5" color="white">
      Transaction Rejected
    </Typography>
    <Typography color="white" className="mt-2 font-normal">
      Transaction rejected, please click on the button resend to retry. <Button onClick={()=>resend()}>Resend</Button>
    </Typography>
  </Alert>
}
function SuccessAlert({hash}:{hash:string}){
    const [open, setOpen] = React.useState(true);
    const router = useRouter();
    const {chainId} = useAccount();

    return <Alert
    open={open}
    icon={<IconSuccess />}
    onClose={() => setOpen(false)}
  >
    <Typography variant="h5" color="white">
      Transaction Sent
    </Typography>
    <Typography color="white" className="mt-2 font-normal">
      transaction has been sent successfully.
    </Typography>
    <div className="mt-4 flex space-x-4">
        {/* Button to go to a specific page */}
        <Button color="blue" ripple={true}>
          <a onClick={()=>router.push('/bulksender/history')} className="text-white">
            Check transaction history
          </a>
        </Button>

        {/* Button to view transaction details on Etherscan */}
        <Button color="green" ripple={true}>
          <a href={`${NetworksConfig[chainId as number].etherscanURL}/tx/${hash}`} target="_blank" rel="noopener noreferrer" className="text-white">
            View on Etherscan
          </a>
        </Button>
      </div>
  </Alert>
}