// src/components/CameraCapture.jsx
import React, { useRef, useState, useEffect } from 'react';

function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [captured, setCaptured] = useState(null);

  useEffect(() => {
    // 请求摄像头权限并显示画面
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("摄像头访问失败:", err);
      });

    return () => {
      // 卸载时关闭摄像头
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const imageData = canvasRef.current.toDataURL('image/png');
    setCaptured(imageData);
    if (onCapture) {
      onCapture(imageData); // 可传出给 Face++ 等外部逻辑
    }
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" />
      <br />
      <button onClick={handleCapture}>📸 拍照</button>
      <br />
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
      {captured && (
        <div>
          <h4>截图预览：</h4>
          <img src={captured} alt="截图" width="320" />
        </div>
      )}
    </div>
  );
}

export default CameraCapture;
