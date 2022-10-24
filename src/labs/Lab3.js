import React, { useState, useEffect } from "react";
import Template from "../Template/Template";
import generated from '../generated.json'
import { generateArrayOfNumbers, getBaseLog, determinant, makeTableData } from '../utils/utils'

const Lab3 = ({generatedArr, setGeneratedArr}) => {

    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')

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
        let intro = `Наша виборка була згенерована за нормальним розподілом,
отже необхідно знайти 2 параметри: а і сігму в квадраті.
Маємо наступні функції для оцінки параметрів:
а = 1/n * sum(xi)
сігма в квадраті = 1/n * sum((xi - xB)^2)

Знайдемо оцінки даних параметрів методом максимальної правдоподібності:
a = ${a}
сігма в квадраті = ${sigma}
`
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
        console.log(tableData)
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
        const a = Math.round(100 * (da / dMain)) / 100
        const b = Math.round(100 * (db / dMain)) / 100
        const c = Math.round(100 * (dc / dMain)) / 100
        let intro = `Маємо нормальний розподіл, отже залежність між
значеннями інтервального розподілу та частостями цих значень є параболічною.
Необхідно знайти параметри функції залежності
y = (yi - ax^2 - bx - c)^2

Маємо наступне рівняння:
${xi4}a + ${xi3}b + ${xi2}c = ${x2y}
${xi3}a + ${xi2}b + ${Math.round(xi)}c = ${xy}
${xi2}a + ${Math.round(xi)}b + ${tableData.intervalMiddles.length}c = ${yi}

Отримаємо: а = ${a}, b = ${b}, c = ${c}
y = (yi - ${a}x^2 - ${b}x - ${c})^2`
        setData2(intro)
    }

    const labDescription = {
        number: 3,
        name: 'Статистичні оцінки параметрів розподілу. Точкові оцінки. Методи знаходження точкових оцінок. Метод найменших квадратів дослідження вибірки',
        goal: 'Навчитися: знаходити точкові оцінки за емпірічними даними вибірки; методом найменших квадратів знайти найкращю залежність між даними інтервального роподілу і частостями отриманих значень.',
        tasks: [
            {
                text: 'Для вибірки знайти будь-яким методом оцінки теоретичних параметрів розподілу.',
                func: task1,
                data: data1
            },
            {
                text: `За полігоном (гістограмою) підібрати теоретичну залежність між
                значеннями інтервального розподілу та частостями цих значень. Знайти
                методом найменших квадратів параметри відповідних залежностей.`,
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