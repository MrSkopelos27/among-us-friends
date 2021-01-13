import {
    NavLink,
} from "react-router-dom"

import Graph from '../Graph'

export default function Summary(props) {
    const { player, i, history } = props
    const { name, games, eloHistory, crewWin, crewLoss, impostorWin, impostorLoss } = player

    const _eloHistory = eloHistory.map(elo => {
        return { y: elo }
    }).slice(history)

    const crewWinRate = parseFloat(
        (crewWin / (crewWin + crewLoss)) * 100
    ).toFixed(2)
    const impostorWinRate = parseFloat(
        (impostorWin / (impostorWin + impostorLoss)) * 100
    ).toFixed(2)

    const placements = games.length <= 10
    return <div style={{ opacity: placements ? .5 : 1 }}>
        <div><small>{placements ? '#~' : `#${i + 1}`}</small> <NavLink to={`/player/${name}`}>{name}</NavLink></div>
        <div>crew — {crewWin}<small>W</small> {crewLoss}<small>L</small> {crewWinRate !== 'NaN' && `(${crewWinRate}%)`}</div>
        <div>imposter — {impostorWin}<small>W</small> {impostorLoss}<small>L</small> {impostorWinRate !== 'NaN' && `(${impostorWinRate}%)`}</div>
        <Graph data={_eloHistory} />
    </div>
}