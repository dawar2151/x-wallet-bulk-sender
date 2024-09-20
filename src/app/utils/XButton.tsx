import { useContext } from "react";
import { BulkSenderStateContext } from "../providers";
import { Button } from "@material-tailwind/react";

export const XButton = (props: {action: () => void; caption: string, disabled?: boolean }) => {
    const { isDarkMode } = useContext(BulkSenderStateContext);
    
    return (
        <Button
            disabled={props.disabled?? false}
            onClick={props.action}
            className={`font-bold py-2 px-4 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-700'} text-white`}
        >
            {props.caption}
        </Button>
    );
};
