import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import { routesConfig } from './RoutesConfig';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        {routesConfig.map(r => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App;