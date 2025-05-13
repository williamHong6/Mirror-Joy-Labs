// src/pages/SkinLoading.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { analyzeSkin } from '../utils/faceppSkinApi';

function SkinLoading() {
  const location = useLocation();
  const navigate = useNavigate();

  const imageData = location.state?.imageData;

  useEffect(() => {
    if (!imageData) {
      navigate('/skin-ai');
      return;
    }

    // 调用分析API
    analyzeSkin(imageData)
      .then(result => {
        navigate('/skin-result', {
          state: {
            imageData,
            report: result.result
          }
        });
      })
      .catch(err => {
        alert('分析失败: ' + err.message);
        navigate('/skin-ai');
      });
  }, [imageData, navigate]);

  return (
    <div>
      <h2>正在分析，请稍候...</h2>
    </div>
  );
}

export default SkinLoading;
