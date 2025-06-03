import { createBrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddBookmark from './pages/AddBookmark';
import EditBookmark from './pages/EditBookmark';
import ViewBookmark from './pages/ViewBookmark'

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/add', element: <AddBookmark /> },
  { path: '/edit/:index', element: <EditBookmark /> },
  { path: '/view/:index', element: <ViewBookmark /> }, 
]);

export default router;
