import { useEffect, useState } from "react";
import Header from "../Header";
import Table from "../Table";
import Histogram from "../Chart/Histogram";

const Game = () => {
    const columns = [
        {
            name: 'Game ID',
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
            name: 'Start Time',
            selector: row => row.start_time,
            center: true,
            width: '30%'
        },
        {
            name: 'Duration',
            selector: row => row.duration,
            center: true,
            width: '10%'
        },
        {
            name: 'Score',
            selector: row => row.score,
            center: true,
            width: '20%'
        },
        {
            name: 'Interaction',
            selector: row => row.interaction,
            center: true,
            width: '20%'
        }
    ]

    const [tableData, setTableData] = useState([])
    const [scores, setScores] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('./data/game.csv');

            const reader = res.body.getReader();
            const decoder = new TextDecoder('utf-8')

            const result = await reader.read()
            const data = decoder.decode(result.value);

            const rowData = data.split('\n');

            const newData = []
            const newScores = []

            rowData.forEach((row, index) => {
                if (index == 0 || index == rowData.length - 1) {
                    return
                }

                const col = row.split(',');

                newData.push({
                    id: col[0],
                    user_id: col[1],
                    start_time: col[2],
                    duration: col[3],
                    score: col[4],
                    interaction: col[5],
                })

                newScores.push(parseInt(col[4]))
            });

            setTableData([...newData])
            setScores([...newScores])
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
                        <Histogram data={scores} range={200} xTitle='Score' yTitle='Number of Game' />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Game;
