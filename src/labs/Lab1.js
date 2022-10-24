import React, { useState, useEffect } from "react";
import Template from "../Template/Template";
import { generateArrayOfNumbers } from "../utils/utils";
import generated from '../generated.json'

const Lab1 = () => {

    const [data1, setData1] = useState([])
    const [data2, setData2] = useState(null)
    const [data3, setData3] = useState(null)
    const [data4, setData4] = useState(null)
    const [data5, setData5] = useState(null)
    const [data6, setData6] = useState(null)
    const [data7, setData7] = useState(null)
    const [data8, setData8] = useState(null)
    const [data9, setData9] = useState(null)

    const sortData = () => {
        return [...data1].sort((a, b) => {
            if(a.age < b.age)
                return -1
            if(a.age > b.age)
                return 1
            return 0
        })
    }

    const task8 = () => {
        setData8(generated)
    }

    const task1 = () => {
        if(data8)
            setData1(data8.slice(0, 100))
    }

    const task2 = () => {
        if(data1)
            setData2(sortData())
    }

    const task3 = () => {
        if(data2){
            const sortedData = sortData()
            const maxAge = sortedData[sortedData.length - 1].age
            const minAge = sortedData[0].age
            setData3(`Розмах вибірки: ${maxAge - minAge}`)
        }
    }

    const task4 = () => {
        setData4(generateArrayOfNumbers(100, true))
    }

    const task5 = () => {
        if(data4)
            setData5(data4.map(val => Math.round(val * 900) / 100))
    }

    const task6 = () => {
        if(data5)
            setData6([...data5].sort())
    }   

    const task7 = () => {
        if(data6){
            const sortedNumbers = [...data6].sort()
            const maxVal = sortedNumbers[sortedNumbers.length - 1]
            const minVal = sortedNumbers[0]
            setData7(`Розмах вибірки випадкових чисел: ${Math.round((maxVal - minVal) * 100) / 100}`)
        }
    }

    const task9 = () => {
        if(data4){
            const sortedNumbers = [...data4].sort()
            const uniqueNumbers = new Set(sortedNumbers)
            const friquency = []
            uniqueNumbers.forEach(number => {
                friquency.push(sortedNumbers.filter(num => num === number).length)
            })
            let finalResult = {}
            finalResult.bar = {
                data: {
                    labels: [...uniqueNumbers],
                    datasets: [
                        {
                            label: 'Гістограма',
                            data: friquency,
                            backgroundColor: 'rgb(74, 153, 255)',
                            borderColor: 'rgb(21, 93, 187)',
                            borderWidth: 1,
                            categoryPercentage: 0.9,
                            barPercentage: 0.9
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxis: {
                            grid: { borderColor: 'rgb(74, 153, 255)' },
                            title: {
                                display: true,
                                text: 'Xi'
                            },
                        },
                        yAxis: {
                            grid: { borderColor: 'rgb(74, 153, 255)' },
                            title: {
                                display: true,
                                text: 'W'
                            },
                        }
                    }
                }
            }
            setData9(finalResult)
        }
    }

    const labDescription = {
        number: 1,
        name: 'ВИБІРКОВИЙ МЕТОД, ЙОГО ХАРАКТЕРИСТИКИ',
        goal: 'вивчити методи утворення репрезентативної вибірки.',
        tasks: [
            {
                text: 'Використання реальних статистичних даних з інтернету.',
                tasks: [
                    {
                        text: 'Відобразити 1000 елементів реальних статичних даних з Інтернету',
                        func: task8,
                        data: data8
                    },
                    {
                        text: 'Обрати 100 елементів',
                        func: task1,
                        data: data1
                    },
                    {
                        text: 'Ранжувати вибірку',
                        func: task2,
                        data: data2
                    },
                    {
                        text: 'Знайти розмах вибірки',
                        func: task3,
                        data: data3
                    }
                ]
            },
            {
                text: 'Використання генератора випадкових чисел.',
                tasks: [
                    {
                        text: 'Згенерувати 100 випадкових, нормально розподілених (N(0,1)) випадкових величин.',
                        func: task4,
                        data: data4
                    },
                    {
                        text: 'Побудувати гістограму для згенерованої вибірки',
                        func: task9,
                        data: data9
                    },
                    {
                        text: 'Помножити отримані дані на 9.',
                        func: task5,
                        data: data5
                    },
                    {
                        text: 'Ранжувати вибірку.',
                        func: task6,
                        data: data6
                    },
                    {
                        text: 'Знайти розмах вибірки.',
                        func: task7,
                        data: data7
                    }
                ]
            }
        ]
    }

    return <Template description={labDescription} />
}

export default Lab1