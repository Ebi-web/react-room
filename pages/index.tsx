import type { Task } from '../src/types/Task'
import Header from '../src/components/Header'
import TaskAdd from '../src/components/TaskAdd'
import TaskList from '../src/components/TaskList'

const Index = (): JSX.Element => {
  const addTask = (task: Task) => {
    taskList.push(task)
    console.log(taskList)
  }
  const taskList: Task[] = []

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