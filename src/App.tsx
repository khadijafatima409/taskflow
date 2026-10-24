import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import { seedTasks } from './data/seedTasks';

import type { Task } from './types/task';
import BoardPage from './components/features/board/BoardPage';
import TeamPage from './components/features/team/TeamPage';
import TasksPage from './components/features/tasks/TasksPage';
import DashboardPage from './components/features/dashboard/DashboardPage';

function App() {
  const [tasks] = useState<Task[]>(seedTasks);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage tasks={tasks} />} />
          <Route path="/tasks" element={<TasksPage tasks={tasks} />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
