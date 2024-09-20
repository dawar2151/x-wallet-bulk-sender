import { Card, CardBody, Typography } from "@material-tailwind/react";
import { BulkSenderStateContext } from "../providers";
import { useContext } from "react";

export const XCard = (props: {caption: string, description: string }) => {
    const { caption, description } = props;
    const { isDarkMode } = useContext(BulkSenderStateContext);
    return (
    <Card className='w-auto dark:bg-gray-800 bg-white'>
        <CardBody>
            <Typography variant="h5" color={isDarkMode ? 'white' : 'blue-gray'} className="mb-2">
                {caption}
            </Typography>
            <Typography color={isDarkMode ? 'gray-100' : 'gray-700'}>
                {description}
            </Typography>
        </CardBody>
    </Card>);
}