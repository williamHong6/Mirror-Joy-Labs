import React, { useState } from 'react';
import CameraCapture from '../components/CameraCapture';
import { analyzeSkin } from '../utils/faceppSkinApi.js';

function SkinAI() {
  const [skinReport, setSkinReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageCaptured = async (base64Image) => {
    try {
      setLoading(true);
      const result = await analyzeSkin(base64Image);
      console.log("Face++ 返回结果：", result);
      setSkinReport(result.result);
    } catch (err) {
      console.error(err);
      setSkinReport({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const skinTypeToText = (type) => {
    switch (type) {
      case 0: return '油性皮肤';
      case 1: return '干性皮肤';
      case 2: return '中性皮肤';
      case 3: return '混合型皮肤';
      default: return '未知';
    }
  };

  return (
    <div>
      <h2>AI 测肤（新版接口）</h2>
      <CameraCapture onCapture={handleImageCaptured} />

      {loading && <p>正在分析，请稍候...</p>}

      {skinReport && !skinReport.error && (
        <div>
          <h3>肤质分析报告：</h3>
          <ul>
            <li>肤质类型：{
              typeof skinReport.skin_type === 'object'
                ? skinTypeToText(skinReport.skin_type.skin_type)
                : '未知'
            }</li>

            {skinReport.dark_circle && (
              <li>黑眼圈：{skinReport.dark_circle.value === '1' ? '有' : '无'}</li>
            )}

            {skinReport.acne && (
              <li>痘痘：{skinReport.acne.value === 1 ? '有' : '无'}</li>
            )}

            {skinReport.blackhead && (
              <li>黑头：{skinReport.blackhead.value === 1 ? '有' : '无'}</li>
            )}

            {skinReport.eye_finelines && (
              <li>眼部细纹：{skinReport.eye_finelines.value === '1' ? '有' : '无'}</li>
            )}

            {skinReport.nasolabial_fold && (
              <li>法令纹：{skinReport.nasolabial_fold.value === '1' ? '有' : '无'}</li>
            )}

            {skinReport.pores_forehead && (
              <li>额头毛孔粗大：{skinReport.pores_forehead.value === '1' ? '有' : '无'}</li>
            )}

            {/* 可继续添加其他字段 */}
          </ul>
        </div>
      )}

      {skinReport?.error && (
        <p style={{ color: 'red' }}>{skinReport.error}</p>
      )}
    </div>
  );
}

export default SkinAI;
