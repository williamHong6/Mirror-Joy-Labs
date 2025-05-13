// src/pages/SkinCapture.jsx
import React from 'react';
import CameraCapture from '../components/CameraCapture';
import { useNavigate } from 'react-router-dom';

function SkinCapture() {
  const navigate = useNavigate();

  const handleCapture = (imageData) => {
    navigate('/skin-loading', { state: { imageData } });
  };

  return (
    <div>
      <h2>请拍照</h2>
      <CameraCapture onCapture={handleCapture} />
    </div>
  );
}

export default SkinCapture;
