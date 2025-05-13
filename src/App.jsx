// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import TryOnAI from './pages/TryOnAI.jsx';
import SkinCapture from "./pages/SkinCapture.jsx";  
import SkinLoading from './pages/SkinLoading.jsx';
import SkinResult from './pages/SkinResult.jsx';
import ProductRecommend from './pages/ProductRecommend.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/skin-ai" element={<SkinCapture />} />
      <Route path="/skin-loading" element={<SkinLoading />} />
      <Route path="/skin-result" element={<SkinResult />} />
      <Route path="/try-on" element={<TryOnAI />} />
      <Route path="/product-recommend" element={<ProductRecommend />} />
    </Routes>
  );
}

export default App;
