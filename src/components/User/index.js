import { useEffect, useState } from "react";
import Header from "../Header";
import Table from "../Table";
import Histogram from "../Chart/Histogram";
import PieChart from "../Chart/PieChart";
import './index.css'

const User = () => {
    const columns = [
        {
            name: 'User ID',
            selector: row => row.id,
            center: true,
            width: '8%'
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            center: true,
            width: '10%'
        },
        {
            name: 'Age',
            selector: row => row.age,
            center: true,
            width: '7%'
        },
        {
            name: 'Race',
            selector: row => row.race,
            center: true,
            width: '10%'
        },
        {
            name: 'Employment',
            selector: row => row.employment,
            center: true,
            width: '14%'
        },
        {
            name: 'Education',
            selector: row => row.education,
            center: true,
            width: '12%'
        },
        {
            name: 'Income',
            selector: row => row.income,
            center: true,
            width: '12%'
        },
        {
            name: 'Register Time',
            selector: row => row.registerTime,
            center: true,
            width: '17%'
        },
        {
            name: 'Device',
            selector: row => row.device,
            center: true,
            width: '10%'
        }
    ]

    const [tableData, setTableData] = useState([])
    const [ages, setAges] = useState([])
    const [genders, setGenders] = useState([])
    const [employments, setEmployments] = useState([])
    const [educations, setEducations] = useState([])
    const [incomes, setIncomes] = useState([])

    const educationColor = ['#9be2fa', '#8df7b6', '#cfeb8a', '#fca377', '#f78686', '#ea86f7']
    const employmentColor = ['#14a7d9', '#23f775', '#adde35', '#eb6f31', '#e33434', '#d02ce6']

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('./data/user.csv');

            const reader = res.body.getReader();
            const decoder = new TextDecoder('utf-8')

            const result = await reader.read()
            const data = decoder.decode(result.value);

            const rowData = data.split('\n');

            const newData = []
            const newAges = []
            const newGenders = []
            const newEmployments = []
            const newEducations = []
            const newIncomes = []

            rowData.forEach((row, index) => {
                if (index == 0 || index == rowData.length - 1) {
                    return
                }

                const col = row.split(',');

                const device = col[8] == 1 ? 'desktop' : col[8] == 2 ? 'mobile' : 'tablet'

                newData.push({
                    id: col[0],
                    gender: col[1],
                    age: col[2],
                    race: col[3],
                    employment: col[4],
                    education: col[5],
                    income: col[6],
                    registerTime: col[7],
                    device: device
                })

                newAges.push(parseInt(col[2]))
                newGenders.push(col[1])
                newEmployments.push(col[4])
                newEducations.push(col[5])
                newIncomes.push(parseInt(col[6]))
            });

            setTableData([...newData])
            setAges([...newAges])
            setGenders([...newGenders])
            setEmployments([...newEmployments])
            setEducations([...newEducations])
            setIncomes([...newIncomes])
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

                    <div className="d-flex flex-wrap justify-content-center">
                        <PieChart data={genders} labels={['male', 'female']} colors={['#9baceb', '#eda6e4']} />
                        <PieChart data={educations} labels={educations.filter((value, index, array) => array.indexOf(value) === index)}
                            colors={educationColor} />
                        <PieChart data={employments} labels={employments.filter((value, index, array) => array.indexOf(value) === index)}
                            colors={employmentColor} />
                    </div>

                    <div className="mt-n5 d-flex flex-wrap justify-content-center">
                        <Histogram data={ages} range={10} xTitle='Ages' yTitle='Number of User' />
                        <Histogram data={incomes} range={2500} xTitle='Income' yTitle='Number of User' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;
