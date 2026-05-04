import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import DishDetail from './pages/DishDetail';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/menu"      element={<Menu />} />
        <Route path="/dish/:id"  element={<DishDetail />} />
        <Route path="/about"     element={<About />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/register"  element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
