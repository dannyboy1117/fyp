import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const Histogram = ({ data, range, xTitle, yTitle }) => {
    const [chartData, setChartData] = useState([])
    const [chartOptions, setChartOptions] = useState({})

    const getMin = (data, range) => {
        let min = -1;

        data.forEach(value => {
            if (min == -1 || value < min) {
                min = value
            }
        })

        if(min == 0){
            return 0
        }

        return (Math.ceil(min / range) * range - range);
    }

    const getMax = (data, range) => {
        let max = -1;

        data.forEach(value => {
            if (max == -1 || value > max) {
                max = value
            }
        })

        return (Math.ceil(max / range) * range);
    }

    useEffect(() => {
        setChartData([...[[xTitle]].concat(data.map(d => [d]))])

        const options = {
            legend: { position: "none" },
            histogram: {
                bucketSize: range,
                minValue: getMin(data, range),
                maxValue: getMax(data, range),
            },
            colors: ['#78d2ff'],
            hAxis: {
                title: xTitle
            },
            vAxis: {
                title: yTitle
            }
        };

        setChartOptions({...options})
    }, [data, range])

    return (
        <Chart chartType="Histogram" data={chartData} options={chartOptions} width='100%' height='400px' />
    )
}

export default Histogram;
