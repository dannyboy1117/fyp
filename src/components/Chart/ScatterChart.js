import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const ScatterChart = ({ data, xTitle, yTitle, xTicks }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const newChartData = [];

        newChartData.push([xTitle, 'score']);

        setChartData([...newChartData.concat(data)])
    }, [data])

    const options = {
        hAxis: {
            title: xTitle,
            ticks: xTicks
        },
        vAxis: {
            title: yTitle
        },
        colors: ['#a52714']
    };

    return (
        <Chart chartType="Scatter" width="100%" height="300px" data={chartData} options={options} />
    )
}

export default ScatterChart;
