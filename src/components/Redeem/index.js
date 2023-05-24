import { useEffect, useState } from "react";
import Header from "../Header";
import Table from "../Table";
import PieChart from "../Chart/PieChart";

const Redeem = () => {
    const columns = [
        {
            name: 'Redeem ID',
            selector: row => row.id,
            center: true,
            width: '10%'
        },
        {
            name: 'User ID',
            selector: row => row.user_id,
            center: true,
            width: '10%'
        },
        {
            name: 'Date',
            selector: row => row.date,
            center: true,
            width: '20%'
        },
        {
            name: 'Token Earned',
            selector: row => row.token,
            center: true,
            width: '10%'
        },
        {
            name: 'Redeem Prize',
            selector: row => row.prize,
            center: true,
            width: '20%'
        },
        {
            name: 'Redeem Score',
            selector: row => row.score,
            center: true,
            width: '15%'
        },
        {
            name: 'Token Remained',
            selector: row => row.token_remained,
            center: true,
            width: '15%'
        }
    ]

    const [tableData, setTableData] = useState([])
    const [prizes, setPrizes] = useState([])

    const prizeColor = ['#9be2fa', '#8df7b6', '#cfeb8a', '#fca377', '#f78686', '#ea86f7']

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('./data/redeem.csv');

            const reader = res.body.getReader();
            const decoder = new TextDecoder('utf-8')

            const result = await reader.read()
            const data = decoder.decode(result.value);

            const rowData = data.split('\n');

            const newData = []
            const newPrizes = []

            rowData.forEach((row, index) => {
                if (index == 0 || index == rowData.length - 1) {
                    return
                }

                const col = row.split(',');

                newData.push({
                    id: col[0],
                    user_id: col[1],
                    date: col[2],
                    token: col[3],
                    prize: col[4],
                    score: col[5],
                    token_remained: col[6]
                })

                newPrizes.push(col[4])
            });

            setTableData([...newData])
            setPrizes([...newPrizes])
        }

        fetchData();
    }, [])

    return (
        <div>
            <Header />

            <div className="content">
                <div className="table-container">
                    <div className="table-container">
                        <Table columns={columns} data={tableData} />
                    </div>

                    <br />

                    <div className="d-flex justify-content-center">
                        <PieChart data={prizes} labels={prizes.filter((value, index, array) => array.indexOf(value) === index)}
                            colors={prizeColor} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Redeem;
