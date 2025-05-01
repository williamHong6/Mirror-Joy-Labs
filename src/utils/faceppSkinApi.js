// src/utils/faceppSkinApi.js


export async function analyzeSkin(base64Image) {
    const API_KEY = 'Koevbhmvdcd_CglIq3QRi5MxatpkidE4';
    const API_SECRET = 'JSCmF2FvvWN8Ploei-d9rTfRYYriHsFk';
  
    // 去掉 data:image/jpeg;base64,... 的头部，只保留纯 base64 字符串
    const base64 = base64Image.replace(/^data:image\/\w+;base64,/, '');

    const formData = new FormData();
    formData.append('api_key', API_KEY);
    formData.append('api_secret', API_SECRET);
    formData.append('image_base64', base64);

    const response = await fetch('https://api-us.faceplusplus.com/facepp/v1/skinanalyze', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    if (result.error_message) {
        throw new Error(`Face++ 错误：${result.error_message}`);
    }

    return result; // 包含 result: {...肤质分析...}
}
  