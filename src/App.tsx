import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './components/Layout';

import type { Task } from './types/task';
import BoardPage from './components/features/board/BoardPage';
import TeamPage from './components/features/team/TeamPage';
import TasksPage from './components/features/tasks/TasksPage';
import DashboardPage from './components/features/dashboard/DashboardPage';

import type { TaskData } from './utils/taskForm';
import { loadTasks, saveTasks } from './utils/taskStorage';

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask(data: TaskData) {
    const newTask: Task = { id: crypto.randomUUID(), ...data };
    setTasks((prev) => [newTask, ...prev]);
  }
  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function updateTask(id: string, data: TaskData) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...data } : task)));
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage tasks={tasks} />} />
          <Route
            path="/tasks"
            element={
              <TasksPage
                tasks={tasks}
                onAdd={addTask}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            }
          />
          <Route path="/board" element={<BoardPage tasks={tasks} />} />
          <Route path="/team" element={<TeamPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
