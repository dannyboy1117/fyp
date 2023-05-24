import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const CandleChart = ({ data, labels }) => {
    const [chartData, setChartData] = useState([])

    const getPercentile = (d, percentile) => {
        d.sort(numSort);

        var index = (percentile / 100) * d.length;
        var result;

        if (Math.floor(index) == index) {
            result = (d[(index - 1)] + d[index]) / 2;
        } else {
            result = d[Math.floor(index)];
        }

        return result;
    }

    const numSort = (a, b) => {
        return a - b;
    }

    useEffect(() => {
        const newChartData = [];


        newChartData.push(['column', 'min', 'q1', 'q3', 'max']);

        labels.forEach(label => {
            const row = [];

            row.push(label);

            const d = []

            data.forEach(dat => {
                if (dat[0] == label) {
                    d.push(dat[1])
                }
            })

            const min = Math.min.apply(Math, d)
            const q1 = getPercentile(d, 25)
            const q3 = getPercentile(d, 75)
            const max = Math.max.apply(Math, d)

            row.push(min)
            row.push(q1)
            row.push(q3)
            row.push(max)

            newChartData.push(row)
        })
        console.log(newChartData)

        setChartData([...newChartData])
    }, [data])

    const options = {
        legend: 'none',
        colors: ['#0f9d58']
    }

    return (
        <Chart chartType="CandlestickChart" width="100%" height="400px" data={chartData} options={options} />
    );
}

export default CandleChart;
