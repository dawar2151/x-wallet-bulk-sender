import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Mark } from '@mui/material/Slider/useSlider.types';
import { safe } from 'wagmi/connectors';
import { BulkSenderStateContext } from '@/app/providers';


export default function DiscreteSliderLabel() {
    const [marks, setMarks] = React.useState<Mark[]>([]);
    const [proposeGasPrice, setProposeGasPrice] = React.useState<number>(0);
    const [fastGasPrice, setFastGasPrice] = React.useState<number>(0);
    const [safeGasPrice, setSafeGasPrice] = React.useState<number>(0);
    const [min, setMin] = React.useState<number>(0);
    const [max, setMax] = React.useState<number>(0);
    const [value, setValue] = React.useState<number>();
    const {bulkSenderState, setBulkSenderState} = React.useContext(BulkSenderStateContext);

    function valuetext(value: number) {
    
        if(value === 1){
            return `Slow: ${safeGasPrice} GWEI`;
        }else if(value === 2){
            return `Average: ${proposeGasPrice} GWEI`;
         } else if(value === 3){
            return `Fast: ${fastGasPrice} GWEI`;
        }else
        return `Unknown: ${value}`;
    }
    React.useEffect(() => {
        setBulkSenderState({
            ...bulkSenderState,
            currentGasPrice: safeGasPrice as number
        })
    }, [safeGasPrice]);
    const proceedChange = (newValue: number | number[]) => {
        setValue(newValue as number);
        setBulkSenderState({
            ...bulkSenderState,
            currentGasPrice: newValue as number
        })

    }
    const getGas = async () => {
        const apiKey = 'CRGFC2A36MV1J8HJGQ8RJRICDXI3J4N33Q';
        const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;
        console.log(url);
        try {
            const response = await fetch(url);
            console.log(response);
            const data = await response.json();
            console.log(data);
            setMarks([
                {
                    value: 1,
                    label: `Slow`,
                },
                {
                    value: 2,
                    label: `Average`,
                },
                {
                    value: 3,
                    label: `Fast`,
                },
            ]);
            setMin(1);
            setMax(3);
            setFastGasPrice(data.result.FastGasPrice);
            setProposeGasPrice(data.result.ProposeGasPrice);
            setSafeGasPrice(data.result.SafeGasPrice);

        } catch (error) {
            console.error('Failed to fetch gas prices:', error);
            return null;
        }
    }
    React.useEffect(() => {
        getGas();
    }, [min, max]);
    return (
        <Box>
            <Slider
                min={min}
                max={max}
                aria-label="Always visible"
                value={value}
                size='small'
                getAriaValueText={valuetext}
                getAriaLabel={(value)=>  'Gas Fee'}
                onChange={(event, newValue) => proceedChange(newValue)}
                valueLabelFormat={valuetext}
                marks={marks}
                valueLabelDisplay="on"
            />
        </Box>
    );
}