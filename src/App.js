import './App.css';
import React, { useState } from 'react';
// import Lab1 from './labs/lab1/Lab1';
// import Lab2 from './labs/lab2/Lab2';
import Lab1 from './labs/Lab1';
import Lab2 from './labs/Lab2';
import Lab3 from './labs/Lab3';
import Lab4 from './labs/Lab4';

function App() {
  const [generatedArr, setGeneratedArr] = useState([])
  const [labNumber, setLabNumber] = useState(1)
  const labs = [
    {
      number: 1,
      component: <Lab1 />
    },
    {
      number: 2,
      component: <Lab2 generatedArr={generatedArr} setGeneratedArr={setGeneratedArr}/>
    },
    {
      number: 3,
      component: <Lab3 generatedArr={generatedArr} setGeneratedArr={setGeneratedArr}/>
    },
    {
      number: 4,
      component: <Lab4 generatedArr={generatedArr} setGeneratedArr={setGeneratedArr}/>
    },
  ]

  const openLab = (labNumber) => {
    setLabNumber(labNumber)
  }

  return (
    <div className="mainWrapper">
      <nav className="navigationWrapper">
        {
          labs.map(lab => {
            return (
              <div className={lab.number === labNumber ? "navigationButton current" : "navigationButton"} onClick={() => {openLab(lab.number)}}>
                <p>Лабораторна робота {lab.number}</p>
              </div>
            )
          })
        }
      </nav>
      <main className="contentWrapper">
        {
          labs.find(el => el.number === labNumber).component
        }
      </main>
    </div>
  );
}

export default App;