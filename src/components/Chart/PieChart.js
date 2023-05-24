import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const PieChart = ({ data, labels, colors }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const newChartData = [];

        newChartData.push(['column', 'number']);

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
        colors: colors,
        width: 450
    }

    return (
        <Chart chartType="PieChart" data={chartData} options={options} width='400px' height='400px' />
    )
}

export default PieChart;
