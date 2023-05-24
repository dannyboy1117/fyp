import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const BarChart = ({ data, xTitle, labels}) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const newChartData = [];

        newChartData.push([xTitle, 'number']);

        labels.forEach(label => {
            const row = [];

            row.push(label);

            let n = 0;

            data.forEach(d => {
                if(d == label){
                    n += 1
                }
            })

            row.push(n);
            newChartData.push(row)
        })

        setChartData([...newChartData])
    }, [data])

    const options = {
        legend: { position: "none" },
        colors: ['#7883ff', '#ff99df'],
        hAxis: {
            title: xTitle
        },
        bar: {
            groupWidth: '15%'
        }
    };

    return (
        <Chart chartType="Bar" data={chartData} options={options} />
    )
}

export default BarChart;
