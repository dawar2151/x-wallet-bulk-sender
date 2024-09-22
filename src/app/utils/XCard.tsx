import { Card, CardBody, Typography } from "@material-tailwind/react";
import { BulkSenderStateContext } from "../providers";
import { useContext } from "react";

export const XCard = (props: {caption: string, description: string }) => {
    const { caption, description } = props;
    const { isDarkMode } = useContext(BulkSenderStateContext);
    return (
    <Card className='w-auto dark:bg-gray-800 bg-white'  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <CardBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Typography variant="h5" color={isDarkMode ? 'white' : 'blue-gray'} className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {caption}
            </Typography>
            <Typography color={isDarkMode ? 'amber' : 'gray'} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {description}
            </Typography>
        </CardBody>
    </Card>);
}