// src/pages/SkinResult.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function skinTypeToText(type) {
  switch (type) {
    case 0: return '油性皮肤';
    case 1: return '干性皮肤';
    case 2: return '中性皮肤';
    case 3: return '混合型皮肤';
    default: return '未知';
  }
}

function SkinResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const image = state?.imageData;
  const report = state?.report;

  if (!image || !report) {
    return <p>无数据，请返回重新拍照。</p>;
  }

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <img src={image} alt="截图" width="90%"/>
      <div>
        <h3>肤质报告</h3>
        <ul>
          <li>肤质类型：{skinTypeToText(report.skin_type?.skin_type)}</li>
          {report.acne && <li>痘痘：{report.acne.value === 1 ? '有' : '无'}</li>}
          {report.blackhead && <li>黑头：{report.blackhead.value === 1 ? '有' : '无'}</li>}
          {report.dark_circle && <li>黑眼圈：{report.dark_circle.value === '1' ? '有' : '无'}</li>}
        </ul>
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => navigate('/skin-ai')}>重新拍照</button>
          <button onClick={() => navigate('/product-recommend', { state: { report } })} style={{ marginLeft: '10px' }}>
            查看推荐商品
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkinResult;
