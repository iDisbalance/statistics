import React, { useState, useEffect } from "react";
import Template from "../Template/Template";
import generated from '../generated.json'
import { generateArrayOfNumbers, getBaseLog, determinant, makeTableData } from '../utils/utils'

const Lab3 = ({generatedArr, setGeneratedArr}) => {

    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [data3, setData3] = useState('')

    const task1 = () => {
        const sum = generatedArr.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const a = Math.round((sum / generatedArr.length) * 100) / 100
        let presigmaValue = 0
        generatedArr.forEach(element => {
            presigmaValue += Math.pow((element - a), 2)
        });
        const sigma = Math.round((presigmaValue / generatedArr.length) * 100) / 100
        let intro = `Маємо вибірку, згенеровану за нормальним розподілом./n
Шукані теоретичні параметри нормального розподілу: параметр а та дисперсія випадкової величини (стандартне відхилення)./n
Параметр а обчислюється за формулою: а = 1 / n * sum(Хi).
Дисперсія випадкової величини дорівнює 1 / n * sum((Хi - Хв)^2)/n
У результаті обчислень отримали: a = ${a}; D = ${sigma}`
        setData1(intro)
    }

    const task2 = () => {
        let xi = 0
        let xi2 = 0
        let xi3 = 0
        let xi4 = 0
        let yi = 0
        let xy = 0
        let x2y = 0
        const tableData = makeTableData(generatedArr)
        tableData.intervalMiddles.forEach((middle, id) => {
            xi += middle
            xi2 += Math.round(Math.pow(middle, 2))
            xi3 += Math.round(Math.pow(middle, 3))
            xi4 += Math.round(Math.pow(middle, 4))
            yi += Math.round(tableData.frequency[id])
            xy += Math.round(middle * tableData.frequency[id])
            x2y += Math.round(Math.pow(middle, 2) * tableData.frequency[id])
        })
        const dMain = determinant([[xi4,xi3,xi2],[xi3,xi2,Math.round(xi)],[xi2,Math.round(xi),tableData.intervalMiddles.length]])
        const da = determinant([[x2y,xy,yi],[xi3,xi2,Math.round(xi)],[xi2,Math.round(xi),tableData.intervalMiddles.length]])
        const db = determinant([[xi4,xi3,xi2],[x2y,xy,yi],[xi2,Math.round(xi),tableData.intervalMiddles.length]])
        const dc = determinant([[xi4,xi3,xi2],[xi3,xi2,Math.round(xi)],[x2y,xy,yi]])
        const a = Math.round(10000 * (da / dMain)) / 10000
        const b = Math.round(10000 * (db / dMain)) / 10000
        const c = Math.round(10000 * (dc / dMain)) / 10000
        let intro = `Оскільки вибірка згенерована за нормальним розподілом, то залежність між значеннями інтервального розподілу та частостями цих значень є параболічною.
Функція залежності: y = ax^2 + bx + c/n
Знайдемо параметри a, b, c/n
Підставивши значення з розрахункової таблиці у загальні формули для оцінки параметрів, отримали:/n
${xi4}a + ${xi3}b + ${xi2}c = ${x2y}/n
${xi3}a + ${xi2}b + ${Math.round(xi)}c = ${xy}/n
${xi2}a + ${Math.round(xi)}b + ${tableData.intervalMiddles.length}c = ${yi}/n
Після застосування правила Крамера, маємо: а = ${a}, b = ${b}, c = ${c}/n
Отже, y = ${a}x^2 - ${b}x + ${c}`
        setData2(intro)
    }

    const task3 = () => {
        const tableData = makeTableData(generatedArr)
        const result = {
            colls: [
                'i',
                'Xi',
                'Xi^2',
                'Xi^3',
                'Xi^4',
                'Yi',
                'XiYi',
                'Xi^2Yi'
            ],
            i: [],
            Xi: [],
            Xi2: [],
            Xi3: [],
            Xi4: [],
            Yi: [],
            XiYi: [],
            Xi2Yi: [],
            sums: []
        }
        let xi = 0
        let xi2 = 0
        let xi3 = 0
        let xi4 = 0
        let yi = 0
        let xy = 0
        let x2y = 0
        tableData.intervalMiddles.forEach((middle, id) => {
            result.i.push(id + 1)
            result.Xi.push(middle)
            result.Xi2.push(Math.round(Math.pow(middle, 2) * 100) / 100)
            result.Xi3.push(Math.round(Math.pow(middle, 3) * 100) / 100)
            result.Xi4.push(Math.round(Math.pow(middle, 4) * 100) / 100)
            result.Yi.push(Math.round(tableData.frequency[id] * 100) / 100)
            result.XiYi.push(Math.round(middle * tableData.frequency[id] * 100) / 100)
            result.Xi2Yi.push(Math.round(Math.pow(middle, 2) * tableData.frequency[id] * 100) / 100)
            xi += middle
            xi2 += Math.round(Math.pow(middle, 2) * 100) / 100
            xi3 += Math.round(Math.pow(middle, 3) * 100) / 100
            xi4 += Math.round(Math.pow(middle, 4) * 100) / 100
            yi += Math.round(tableData.frequency[id] * 100) / 100
            xy += Math.round(middle * tableData.frequency[id] * 100) / 100
            x2y += Math.round(Math.pow(middle, 2) * tableData.frequency[id] * 100) / 100
        })
        result.sums = [
            Math.round(xi * 10) / 10,
            Math.round(xi2 * 100) / 100,
            Math.round(xi3 * 100) / 100,
            Math.round(xi4 * 100) / 100,
            Math.round(yi * 100) / 100,
            Math.round(xy * 100) / 100,
            Math.round(x2y * 100) / 100,
        ]
        setData3(result)
    }

    const labDescription = {
        number: 3,
        name: 'Статистичні оцінки параметрів розподілу. Точкові оцінки. Методи знаходження точкових оцінок. Метод найменших квадратів дослідження вибірки',
        goal: 'навчитися знаходити точкові оцінки за емпірічними даними вибірки; методом найменших квадратів знайти найкращу залежність між даними інтервального роподілу і частостями отриманих значень.',
        tasks: [
            {
                text: 'Для вибірки знайти будь-яким методом оцінки теоретичних параметрів розподілу',
                func: task1,
                data: data1
            },
            {
                text: `Cкласти розрахункову таблицю`,
                func: task3,
                data: data3
            },
            {
                text: `За полігоном (гістограмою) підібрати теоретичну залежність між
                значеннями інтервального розподілу та частостями цих значень. Знайти
                методом найменших квадратів параметри відповідних залежностей`,
                func: task2,
                data: data2
            }
        ]
    }
    return (
        <Template description={labDescription} />
    )
}

export default Lab3