import { useEffect, useState } from "react";
import ScatterChart from "../Chart/ScatterChart";
import Header from "../Header"
import CandleChart from "../Chart/CandleChart";
import './index.css'

const Dashboard = () => {
    const [ageVersusScore, setAgeVersusScore] = useState([])

    const [interactions, setInteractions] = useState([])
    const [interactionVersusScore, setInteractionVersusScore] = useState([])

    const [prizes, setPrizes] = useState([])
    const [prizeVersusScore, setPrizeVersusScore] = useState([])

    const [genderVersusScore, setGenderVersusScore] = useState([])

    const [educations, setEducations] = useState([])
    const [educationVersusScore, setEducationVersusScore] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('./data/merged_data.csv');

            const reader = res.body.getReader();
            const decoder = new TextDecoder('utf-8')

            const result = await reader.read()
            const data = decoder.decode(result.value);

            const rowData = data.split('\n');

            const newAgeVersusScore = []
            const newInteractions = []
            const newInteractionVersusScore = []
            const newPrizes = []
            const newPrizeVersusScore = []
            const newGenderVersusScore = []
            const newEducations = []
            const newEducationVersusScore = []

            rowData.forEach((row, index) => {
                if (index == 0 || index == rowData.length - 1) {
                    return
                }

                const col = row.split(',');

                const score = parseInt(col[12])

                const interaction = parseInt(col[20]) == 0 ? 'voice' : 'motion'
                const prize = col[17]
                const education = col[5]

                newAgeVersusScore.push([parseInt(col[2]), score])
                newInteractionVersusScore.push([interaction, score])
                newPrizeVersusScore.push([prize, score])
                newGenderVersusScore.push([col[1], score])
                newEducationVersusScore.push([education, score])

                if (!newInteractions.includes(interaction)) {
                    newInteractions.push(interaction)
                }

                if (!newPrizes.includes(prize)) {
                    newPrizes.push(prize)
                }

                if (!newEducations.includes(education)) {
                    newEducations.push(education)
                }
            });

            setAgeVersusScore([...newAgeVersusScore])
            setInteractionVersusScore([...newInteractionVersusScore])
            setInteractions([...newInteractions])
            setPrizeVersusScore([...newPrizeVersusScore])
            setPrizes([...newPrizes])
            setGenderVersusScore([...newGenderVersusScore])
            setEducationVersusScore([...newEducationVersusScore])
            setEducations([...newEducations])
        }

        fetchData();
    }, [])

    return (
        <div>
            <Header />

            <div className="content">
                <div>
                    <h6 className="label">Game score of user in differect ages</h6>
                    <ScatterChart data={ageVersusScore} xTitle='Ages' yTitle='Game Score' />
                </div>

                <div className="mt-100 row">
                    <div className="col-6">
                        <h6 className="label">Game score of user in differect interaction methods</h6>
                        <CandleChart data={interactionVersusScore} labels={interactions} />
                    </div>

                    <div className="col-6">
                        <h6 className="label">Game score of user in differect redeem prizes</h6>
                        <CandleChart data={prizeVersusScore} labels={prizes} />
                    </div>
                </div>

                <div className="mt-100 row">
                    <div className="col-6">
                        <h6 className="label">Game score of user in differect genders</h6>
                        <CandleChart data={genderVersusScore} labels={['male', 'female']} />
                    </div>

                    <div className="col-6">
                        <h6 className="label">Game score of user in differect educations</h6>
                        <CandleChart data={educationVersusScore} labels={educations} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard;
