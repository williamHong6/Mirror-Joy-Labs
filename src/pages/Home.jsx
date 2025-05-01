// src/pages/Home.jsx
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>欢迎来到 AI 美妆镜</h1>
      <Link to="/skin-ai"><button>AI 测肤</button></Link>
      <Link to="/try-on"><button>AI 试妆</button></Link>
    </div>
  );
}

export default Home;
