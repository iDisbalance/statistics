import React, { useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    BarController
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    BarElement,
    BarController,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Task = ({ text, onRun, data }) => {
    const formatData = (data) => {
        const formatedData = []
        let bufArr = [] 
        data.forEach((el, id) => {
          bufArr.push(el)
          if((id + 1) % 10 === 0){
            formatedData.push(bufArr)
            bufArr = []
          }
        })
        return formatedData
    }

    const [isOpened, setIsOpened] = useState(false)

    const handleRun = () => {
        setIsOpened(true)
        onRun()
    }

    const toggleSolution = () => {
        setIsOpened(isOpened => !isOpened)
    }

    return (
        <>
            <div className="taskWrapper">
                <div className="runWrapper">
                    <span className="material-symbols-outlined" onClick={handleRun}>play_circle</span>
                </div>
                <div className="taskNameWrapper">
                    <p>{text}</p>
                </div>
                <div className="toggleWrapper">
                    <span className={isOpened ? "material-symbols-outlined rotated" : "material-symbols-outlined"} onClick={toggleSolution}>
                        expand_more
                    </span>
                </div>
            </div>
            <div className={isOpened ? "solutionWrapper" : "solutionWrapper closed"}>
                {typeof data === 'string' ? (
                    data.split('/n').map(line => {
                        return (
                            <p>{line}</p>
                        )
                    })
                ) : (
                    data?.colls ? (
                        <table className="table">
                            <tr className="tableRow">
                                {
                                    data.colls.map(collName => {
                                        return (
                                            <td className="tableCell first">
                                                {collName}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                            {
                                (data.i).map((el, id) => {
                                    return (
                                        <tr className="tableRow">
                                            {
                                                Object.keys(data).map(key => {
                                                    return key !== 'colls' && key !== 'sums' ? (
                                                        <td className="tableCell">
                                                            {data[key][id]}
                                                        </td>
                                                    ) : null
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                            <tr className="tableRow">
                                <td className="tableCell first">
                                    Сума
                                </td>
                                {
                                    data.sums.map(sum => {
                                        return (
                                            <td className={sum ? "tableCell first" : "tableCell"}>
                                                {sum}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        </table>
                    ) : data?.line ? <Line options={data.line.options} data={data.line.data}/> :
                    data?.bar ? <Bar data={data.bar.data}/> :
                    data?.line2 ? <Line options={data.line2.options} data={data.line2.data}/> :
                    data && formatData(data).map((el, id) => {
                        return (
                        <div className="dataWrapper">
                            <p className="rowNumeration">{id + 1}</p>
                            <div className="ageRowWrapper">{el.map(subEl => {
                            return <p className="age">{subEl.age ? subEl.age : subEl}</p>
                            })}</div>
                        </div>
                        )
                    }
                ))}
            </div>
        </>
    )
}

export default Task