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

    const renderAdvancedTable = (data) => {
        console.log("renderAdvancedTable")
        return (
            <table className="table advanced">
                <tr className="tableRow">
                    <td className="tableCell" rowspan="3">
                        Вік людей, які<br/>
                        зареєструвались у<br/>
                        Facebook за перший<br/>
                        тиждень жовтня 2022,<br/>
                        років<br/>
                    </td>
                    <td className="tableCell" rowspan="2">
                        Середини<br/>
                        інтервалів
                    </td>
                    <td className="tableCell" colspan="8">
                        Кількість годин, проведених у Facebook користувачами за перший тиждень жовтня 2022, годин
                    </td>
                    <td className="tableCell" rowspan="3">
                        Всього
                    </td>
                    <td className="tableCell" rowspan="3">
                        Групове<br/>
                        середнє,<br/>
                        років
                    </td>
                </tr>
                <tr className="tableRow">
                    {
                        data.yIntervals.map(interval => {
                            return (
                                <td className="tableCell">
                                    {interval}
                                </td>
                            )
                        })
                    }
                </tr>
                <tr className="tableRow">
                    <td className="tableCell">
                        x/y
                    </td>
                    {
                        data.yMiddles.map(middle => {
                            return (
                                <td className="tableCell">
                                    {middle}
                                </td>
                            )
                        })
                    }
                </tr>
                {data.rows.map(row => {
                    return (
                        <tr className="tableRow">
                            <td className="tableCell">
                                {row.interval}
                            </td>
                            <td className="tableCell">
                                {row.middle}
                            </td>
                            {
                                row.values.map(val => {
                                    return (
                                        <td className="tableCell">
                                            {val || '-'}
                                        </td>
                                    )
                                })
                            }
                            <td className="tableCell">
                                {row.sum}
                            </td>
                            <td className="tableCell">
                                {row.groupMiddles}
                            </td>
                        </tr>
                    )
                })}
                <tr className="tableRow">
                    <td className="tableCell" colspan="2">
                        Всього
                    </td>
                    {
                        data.yValues.map(value => {
                            return (
                                <td className="tableCell">
                                    {value}
                                </td>
                            )
                        })
                    }
                    <td className="tableCell">
                        100
                    </td>
                </tr>
                <tr className="tableRow">
                    <td className="tableCell" colspan="2">
                        Групове середнє
                    </td>
                    {
                        data.xGroupMiddles.map(value => {
                            return (
                                <td className="tableCell">
                                    {value}
                                </td>
                            )
                        })
                    }
                    <td className="tableCell">
                        -
                    </td>
                </tr>
            </table>
        )
    }
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
                ) : data?.rows ? renderAdvancedTable(data) : (
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
                    data?.complex ? <>
                        {data.data.split('/n').map(line => {
                            return (
                                <p>{line}</p>
                            )
                        })}
                        {data.customComponent()}
                        {data.additionalData.split('/n').map(line => {
                            return (
                                <p>{line}</p>
                            )
                        })}
                    </>:
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