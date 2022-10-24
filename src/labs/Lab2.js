import React, { useState, useEffect } from "react";
import Template from "../Template/Template";
import generated from '../generated.json'
import { generateArrayOfNumbers, getBaseLog } from '../utils/utils'

const Lab2 = ({generatedArr, setGeneratedArr}) => {

    const [data, setData] = useState([])
    const [rangedGeneratedArr, setRangedGeneratedArr] = useState([])
    const [data1, setData1] = useState('')
    const [polygonData, setPolygonData] = useState(null)
    const [tableData, setTableData] = useState(null)
    const [barData, setBarData] = useState(null)
    const [lineData, setLineData] = useState(null)
    const [mediana, setMediana] = useState('')
    const [uselessCalculations, setUselessCalculations] = useState('')
    const [variation, setVariation] = useState('')
    const [conclusions, setConclusions] = useState('')
    const [moda, setModa] = useState('')

    const task8 = () => {
        const numbers = generateArrayOfNumbers(100, false, 97, 142)
        setGeneratedArr(numbers)
    }

    const task13 = () => {
        const tableData = makeTableData()
        const xs = [tableData.intervals[0].split(' - ')[0], ...tableData.intervals.map((el, id) => {
            const splitedValue = el.split(' - ')
            return splitedValue[1]
        })]
        const ys = [0, ...tableData.collectedSubFrequency]
        let p1, p2
        ys.forEach((y, id) => {
            if(ys[id + 1] >= 0.5 && ys[id] <= 0.5){
                p1 = {
                    y,
                    x: parseFloat(xs[id])
                }
                p2 = {
                    y: ys[id + 1],
                    x: parseFloat(xs[id + 1])
                }
                 
            }
        })
        const x = (0.5 - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x
        const finalResult = `Медіана = ${Math.round(x * 100) / 100}`
        setModa(finalResult)
    }

    const task9 = () => {
        if(generatedArr.length){
            setRangedGeneratedArr(() => {
                const sortedNumbers = [...generatedArr].sort((a, b) => {
                    if(a > b)
                        return 1
                    if(a < b)
                        return -1
                    return 0
                })
                return sortedNumbers
            })
        }
    }

    const task10 = () => {
        const result = makeTableData()
        const finalResult = {}
        finalResult.line = {
            data: {
                labels: result.intervalMiddles,
                datasets: [
                    {
                        label: 'Полігон',
                        data: result.subFrequency,
                        borderColor: 'rgb(74, 153, 255)',
                        backgroundColor: 'rgb(0, 0, 0)'
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
        setPolygonData(finalResult)
    }

    const task11 = () => {
        const result = makeTableData()
        const finalResult = {}
        finalResult.bar = {
            data: {
                labels: result.intervals.map(el => {
                    const splitedValue = el.split(' - ')
                    return `${splitedValue[0]}                   `
                }),
                datasets: [
                    {
                        label: 'Гістограма',
                        data: result.frequency,
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
        setBarData(finalResult)
    }

    const task12 = () => {
        const result = makeTableData()
        const finalResult = {}
        finalResult.line2 = {
            data: {
                labels: [result.intervals[0].split(' - ')[0], ...result.intervals.map((el, id) => {
                    const splitedValue = el.split(' - ')
                    return splitedValue[1]
                })],
                datasets: [
                    {
                        label: 'Кумулята',
                        data: [0, ...result.collectedSubFrequency],
                        borderColor: 'rgb(74, 153, 255)',
                        backgroundColor: 'rgb(0, 0, 0)'
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
        setLineData(finalResult)
    }

    const task1 = () => {
        const numbers = [...generatedArr]
        const sortedNumbers = [...numbers].sort((a, b) => {
            if(a > b)
                return 1
            if(a < b)
                return -1
            return 0
        })
        setGeneratedArr(sortedNumbers)
        const xMax = sortedNumbers[sortedNumbers.length - 1]
        const xMin = sortedNumbers[0]
        const r = xMax - xMin
        const m = 1 + 3.3221 * getBaseLog(10, 100)
        const result = `
            Розмах: R = Xmax - Xmin = ${xMax} - ${xMin} = ${Math.round(r * 100) / 100}/n
            Кількість інтервалів: m = 1 + 3.3221 * lgn = 1 + 3.3221 * ${getBaseLog(10, 100)} = ${Math.round(m * 100) / 100}/n
            Ширина інтервалу: k = (Xmax - Xmin) / (1 + 3.3221 * lgn) = (${xMax} - ${xMin}) / (1 + 3.3221 * ${getBaseLog(10, 100)}) = ${Math.round((r / m) * 100) / 100}/n`
        setData1(result)
    }

    const makeTableData = () => {
        const xMax = generatedArr[generatedArr.length - 1]
        const xMin = generatedArr[0]
        const r = xMax - xMin
        const m = 1 + 3.3221 * getBaseLog(10, 100)
        const k = r / m
        const roundedK = Math.round(k)
        const roundedM = Math.round(m)
        let Xstart = xMin - roundedK / 2
        const result = {
            colls: [
                'i',
                'Інтервали',
                'Середини інтервалів',
                'Частота',
                'Частість',
                'Накопичена частота',
                'Накопичена частість'
            ],
            i: [],
            intervals: [],
            intervalMiddles: [],
            frequency: [],
            subFrequency: [],
            collectedFrequency: [],
            collectedSubFrequency: [],
            sums: []
        }
        let buf = 0
        for(let i = 0; Xstart < xMax; i++) {
            result.i.push(i+1)
            result.intervals.push(`${Xstart} - ${Xstart + roundedK}`)
            result.intervalMiddles.push(Math.round(((Xstart + roundedK + Xstart) / 2) * 100) / 100)
            const ni = generatedArr.filter(el => el > Xstart && el <= Xstart + roundedK).length
            result.frequency.push(ni)
            result.subFrequency.push(ni / generatedArr.length)
            result.collectedFrequency.push(ni + buf)
            result.collectedSubFrequency.push((ni + buf) / generatedArr.length)
            buf = buf + ni
            Xstart += roundedK
        }
        result.sums = [Math.round(result.collectedFrequency[result.collectedFrequency.length - 1]), 
        Math.round(result.subFrequency.reduce((previousValue, currentValue) => previousValue + currentValue))]
        return result
    }

    const task2 = () => {
        if(generatedArr)
            setTableData(makeTableData())
    }

    const task4 = () => {
        const result = makeTableData()
        const sortedFrequensy = [...result.frequency].sort((a, b) => {
            if(a > b)
                return 1
            if(a < b)
                return -1
            if(a === b)
                return 0
        })
        const maxValue = sortedFrequensy[sortedFrequensy.length - 1]
        let yzValue = [], searchedIntervals = [], modas = [];
        result.frequency.forEach((el, id) => {
            if(result.frequency[id + 1] === maxValue) {
                searchedIntervals.push(result.intervals[id + 1])
                yzValue.push({
                    yValue: result.frequency[id],
                    zValue: result.frequency[id + 2]
                })
            }
        })
        searchedIntervals.forEach((el, id) => {
            const length = (6 * yzValue[id].yValue) / (yzValue[id].zValue + yzValue[id].yValue)
            modas.push(parseInt(el.split(' - ')[0]) + length)
        })
        let modasResult = ``
        modas.forEach((moda, id) => {
            if(modas.length === 1)
                modasResult = `Мода = ${Math.round(moda * 100) / 100}`
            else
                modasResult += `Мода номер ${id + 1} = ${Math.round(moda * 100) / 100}; `
        })
        setMediana(modasResult)
    }

    const getIntervalMiddle = (first, last) => {
        return (first + last) / 2
    }

    const getFakeZero = (arr) => {
        if(arr.length % 2 === 0){
            return getIntervalMiddle(arr[arr.length / 2 - 1], arr[arr.length / 2])
        }
        return Math.floor(arr[Math.round(arr.length / 2)])
    }

    const getUselessCalculations = () => {
        const result = makeTableData()
        result.u = []
        result.nu = []
        result.nu2 = []
        result.nu12 = []
        const mediana = getFakeZero(result.intervalMiddles)
        const h = result.intervalMiddles[1] - result.intervalMiddles[0]
        result.intervalMiddles.forEach((middle, id) => {
            const u = (middle - mediana) / h
            console.log(middle, mediana, h)
            result.u.push(u)
            result.nu.push(u * result.frequency[id])
            result.nu2.push(Math.pow(u, 2) * result.frequency[id])
            result.nu12.push(Math.pow(u + 1, 2) * result.frequency[id])
        })
        const nuSum = result.nu.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const nu2Sum = result.nu2.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const M = nuSum / 100
        const M2 = nu2Sum / 100
        const xV = M * h + mediana
        const dV = (M2 - Math.pow(M, 2)) * Math.pow(h, 2)

        let bufArr = []
        result.intervalMiddles.forEach((middle, id) => {
            bufArr.push(Math.pow((middle - xV), 2) * result.frequency[id])
        })
        const preS2 = bufArr.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );

        bufArr = []
        const s2 = preS2 / 100
        const s = Math.pow(s2, 0.5)
        result.intervalMiddles.forEach((middle, id) => {
            bufArr.push(Math.pow((middle - xV), 3) * result.frequency[id])
        })
        const preA = bufArr.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const A = preA / (100 * Math.pow(s, 3))

        bufArr = []
        result.intervalMiddles.forEach((middle, id) => {
            bufArr.push(Math.pow((middle - xV), 4) * result.frequency[id])
        })
        const preE = bufArr.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const E = preE / (100 * Math.pow(s, 4)) - 3
        return {
            xV,
            dV,
            A,
            E,
            s
        }
    }

    const task5 = () => {
        const {xV, dV, A, E} = getUselessCalculations()

        const finalResult = `Середнє вибіркове: ${Math.round(xV * 100) / 100}/nВибіркова дисперсія: ${Math.round(dV * 100) / 100}/nАсиметрія: ${Math.round(A * 100) / 100}/nЕксцес: ${Math.round(E * 100) / 100}`
        setUselessCalculations(finalResult)
    }

    const task6 = () => {
        const {s, xV} = getUselessCalculations()
        const v = (s / xV) * 100
        const result = `Коефіцієнт варіації = ${Math.round(v * 100) / 100}%`
        setVariation(result)
    }

    const task7 = () => {
        const {A, E} = getUselessCalculations()
        let Aresult = '', Eresult = ''
        if(A === 0) {
            Aresult = 'Розподіл має симетричну форму.'
        }
        else if(A > 0) {
            Aresult = 'Розподіл має позитивну (правосторонню) асиметрію.'
        }
        else {
            Aresult = 'Розподіл має негативну (лівосторонню) асиметрію.'
        }
        if(E > 0) {
            Eresult = 'Полігон варіаційного ряду має більш круту вершину в порівняння з нормальною кривою.'
        }
        else {
            Eresult = 'Полігон варіаційного ряду має більш пологу вершину в порівняння з нормальною кривою.'
        }
        const result = `Коефіцієнт асиметрії: ${Aresult}/nЕксцес: ${Eresult}`
        setConclusions(result)
    }

    const labDescription = {
        number: 2,
        name: 'Створення інтервального статистичного розподілу вибірки, графічні зображення та числові характеристики вибірки',
        goal: `Навчитися: створювати інтервальний статистичний розподіл з варіант
        вибірки; зображати графічно інтервальний статистичний розподіл (побудова
        полігону, гістограми та кумуляти), знаходження моди та медіани за
        графічними зображеннями; обчислення числових характеристик ( середнього
        зваженого, дисперсії, асиметрії і ексцесу (за потреби)) вибірки.`,
        tasks: [
            {
                text: 'Згенерувати вибірку',
                func: task8,
                data: generatedArr
            },
            {
                text: 'Ранжувати згенеровану вибірку',
                func: task9,
                data: rangedGeneratedArr
            },
            {
                text: 'Для вибірки знайти розмах, кількість інтервалів та ширину інтервалу',
                func: task1,
                data: data1
            },
            {
                text: 'Створити таблицю для інтервального статистичного розподілу вибірки',
                func: task2,
                data: tableData
            },
            {
                text: 'За даними таблиці створити полігон для інтервального статистичного розподілу',
                func: task10,
                data: polygonData
            },
            {
                text: 'За даними таблиці створити гістограму для інтервального статистичного розподілу',
                func: task11,
                data: barData
            },
            {
                text: 'За даними таблиці створити кумуляту для інтервального статистичного розподілу',
                func: task12,
                data: lineData
            },
            {
                text: 'За гістограмою знайти моду',
                func: task4,
                data: mediana
            },
            {
                text: 'За кумулятою визначити медіану.',
                func: task13,
                data: moda
            },
            {
                text: `Обчислити середнє вибіркове, вибіркову дисперсію; за потреби
                обчислити асиметрію та ексцес`,
                func: task5,
                data: uselessCalculations
            },
            {
                text: 'Обчислити коефіцієнт варіації',
                func: task6,
                data: variation
            },
            {
                text: `Висновки`,
                func: task7,
                data: conclusions
            }
        ]
    }
    return (
        <Template description={labDescription} />
    )
}

export default Lab2