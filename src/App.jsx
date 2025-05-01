// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SkinAI from './pages/SkinAI.jsx';
import TryOnAI from './pages/TryOnAI.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skin-ai" element={<SkinAI />} />
        <Route path="/try-on" element={<TryOnAI />} />
      </Routes>
    </>
  );
}

export default App;
