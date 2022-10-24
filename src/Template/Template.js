import React from 'react'
import Task from './Task'

const Template = ({ description, data }) => {

    const { number, name, goal, tasks } = description

    return (
        <div className='labWrapper'>
            <div className='labTitleWrapper'>
                <p className='labNumber'>Лабораторна робота {number}</p>
                <p className='labName'>{name}</p>
            </div>
            <div className='descriptionWrapper'>
                <div className='task'>
                    <p className='goalWrapper'>Мета роботи: {goal}</p>
                </div>
                <div className='imageWrapper'>
                    <img className="image" src="diagram.png" />
                </div>
            </div>
            <div className='taskList'>
                {
                            tasks.map((task, id) => {
                                return (
                                    <>
                                        {
                                            task?.tasks ? task.tasks.map((subtask, subId) => {
                                                return (
                                                    <Task text={subtask.text} onRun={subtask.func} data={subtask.data} />
                                                )
                                            }) : 
                                            (
                                                <Task text={task.text} onRun={task.func} data={task.data}  />
                                            )
                                        }
                                    </>
                                )
                            })
                        }
            </div>
        </div>
    )
}
 
export default Template