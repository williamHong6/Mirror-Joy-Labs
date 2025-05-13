// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import '../style/Home.css';



function Home() {
  return (
    <div>
      <h1 className = "big_heading">-Mirror Joy Labs-</h1>
      <Link to="/skin-ai"><button className="home_button">AI 测肤</button></Link>
      <Link to="/try-on"><button className="home_button">AI 试妆</button></Link>
    </div>
  );
}

export default Home;
