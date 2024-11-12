import { BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import routes from './routes/routes';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        {routes}
      </Routes>
    </Router>
  );
}

export default App;
