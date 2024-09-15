import { useTransferHelper } from "../confirm/useTransferHelper"
import React, { use } from "react";
import { useEffect, useRef } from "react"

import { Alert, Button, Spinner, Typography } from "@material-tailwind/react";
import { useApproveHelper } from "../approve/useApproveHelper";
import { useRouter } from "next/navigation";

export const Approving = () => {
    const {approve, isAllowed, isSuccess,isConfirmed, isConfirming, isPending, approveError} = useApproveHelper();
    const router = useRouter();
    const [called, setCalled] = React.useState(false);

    useEffect(() => {
      if(!called){
        approve()
      }else
        setCalled(true)
      //}
    }, [])
    useEffect(() => {
        if(isSuccess){
            setTimeout(() => {
               router.push('/bulksender/confirm');
            }, 3000); 
        }
    }, [isSuccess]);
    console.log(isSuccess, isAllowed, isConfirmed, isConfirming, isPending, approveError);
    return (    
        <>
        {(isPending || isConfirming) && <LoadingAlert />}
        {isConfirmed && <SuccessAlert />}
        {approveError && <ErrorAlert resend={approve} />}
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
    <Spinner />
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
      Approving
    </Typography>
    <Typography color="white" className="mt-2 font-normal">
      Please validate transaction on your wallet.
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
      Transaction rejected, please click on the button resend to retry. <Button onClick={resend}>Resend</Button>
    </Typography>
  </Alert>
}
function SuccessAlert(){
    const [open, setOpen] = React.useState(true);
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
  </Alert>
}