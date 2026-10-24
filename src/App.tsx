import { BrowserRouter, Route, Routes } from 'react-router';
import DashboardPage from './components/features/dashboard/DashboardPage';
import TasksPage from './components/features/tasks/TasksPage';
import BoardPage from './components/features/board/BoardPage';
import TeamPage from './components/features/team/TeamPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
