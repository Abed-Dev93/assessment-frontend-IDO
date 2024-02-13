import { Helmet } from 'react-helmet';
import './App.css'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <Helmet>
        <meta name='description' content='Enjoy managing time and tasks for better performance' />
        <meta name='keywords' content='team management, task, planning' />
      </Helmet>
      <AppRoutes />
    </>
  );
}

export default App
