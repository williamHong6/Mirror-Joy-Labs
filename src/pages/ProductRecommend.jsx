import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import products from '../data/products.json';
import '../style/ProductRecommend.css';

function ProductRecommend() {
  const { state } = useLocation();
  const report = state?.report;
  const navigate = useNavigate();

  const [scoredProducts, setScoredProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    if (!report) {
      navigate('/');
      return;
    }

    const skinType = report.skin_type?.skin_type;
    const hasAcne = report.acne?.value === 1;
    const hasBlackhead = report.blackhead?.value === 1;

    const scored = products.map(p => {
      let score = 0;
      if (p.suitable_skin.includes(skinType)) score += 2;
      if (hasAcne && p.targets.includes("acne")) score += 1;
      if (hasBlackhead && p.targets.includes("blackhead")) score += 1;
      return { ...p, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const recommended = scored.filter(p => p.score > 0);
    setScoredProducts(recommended);
    setCurrentIndex(0);
  }, [report, navigate]);

  const currentItems = scoredProducts.slice(currentIndex, currentIndex + itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + itemsPerPage, scoredProducts.length - itemsPerPage));
  };

  return (
    <div className="product-recommend-page">
      <h2 className="product-recommend-title">为你推荐的护肤产品</h2>
      {scoredProducts.length === 0 && <p className="product-recommend-empty">未找到符合条件的产品</p>}

      <div className="product-recommend-slider">
        {currentIndex > 0 && (
          <button onClick={handlePrev} className="slider-arrow slider-arrow-left">←</button>
        )}

        <div className="product-list">
          {currentItems.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} className="product-image" />
              <h4 className="product-name">{item.name}</h4>
              <p className="product-price">￥{item.price}</p>
              <p className="product-type">类型：{item.type}</p>
              <p className="product-score">推荐指数：{item.score} ⭐</p>
            </div>
          ))}
        </div>

        {currentIndex + itemsPerPage < scoredProducts.length && (
          <button onClick={handleNext} className="slider-arrow slider-arrow-right">→</button>
        )}
      </div>

      <button onClick={() => navigate('/skin-ai')} className="back-button">
        返回重新测肤
      </button>
    </div>
  );
}

export default ProductRecommend;
