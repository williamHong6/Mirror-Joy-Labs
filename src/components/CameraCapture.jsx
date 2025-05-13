// src/components/CameraCapture.jsx
import React, { useRef, useEffect } from 'react';

function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // 启动摄像头
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
      // 页面卸载时关闭摄像头
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const imageData = canvasRef.current.toDataURL('image/jpeg', 0.9); // ✅ 输出 JPEG
    if (onCapture) {
      onCapture(imageData);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <video ref={videoRef} width="640" height="480" style={{ borderRadius: '8px' }} />
      <br />
      <button onClick={handleCapture} style={{ marginTop: '10px' }}>📸 拍照</button>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
    </div>
  );
}

export default CameraCapture;
