'use client';
import { Radio } from "@material-tailwind/react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
export function Summary() {
    return (
        <div>
            <span>Summary</span>
            <div className="grid grid-cols-2 gap-2 justify-items-center">
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            90 Bears
                        </Typography>
                        <Typography>
                        Your current bulksender allowance.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            90 Bears
                        </Typography>
                        <Typography>
                        Your current bulksender allowance.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            90 Bears
                        </Typography>
                        <Typography>
                        Your current bulksender allowance.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            90 Bears
                        </Typography>
                        <Typography>
                        Your current bulksender allowance.
                        </Typography>
                    </CardBody>
                </Card>
            </div>
            <div className="text-center underline-offset-1 my-5">Amount to approve</div>
            <div className="text-center gap-10">
                <Radio name="type" label="Exact Amount to be sent" />
                <Radio name="type" label="Unlimited amount" defaultChecked />
            </div>
            <div className="text-right my-2">
            <a
                href="#"
                className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Next
            </a>
            </div>
        </div>
    )
}