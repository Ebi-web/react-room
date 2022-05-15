import type { Task } from '../src/types/Task'
import { useState } from 'react'
import Header from '../src/components/Header'
import TaskAdd from '../src/components/TaskAdd'
import TaskList from '../src/components/TaskList'

const Index = (): JSX.Element => {
  const [taskList, setTaskList] = useState<Task[]>([])
  
  const addTask = (task: Task) => {
    setTaskList([...taskList, task])
    console.log(taskList)
  }

  return (
    <div>
      <Header />
      <TaskAdd
        addTask={addTask}
      />
      <TaskList
        taskList={taskList}
      />
    </div>
  )
}

export default Index