import React, { useState } from 'react';

function AnalysisPage() {
  const [selectedFile, setSelectedFile] = useState(null); // Yüklenen dosya
  const [preview, setPreview] = useState(null); // Yüklenen resmin önizlemesi
  const [result, setResult] = useState(null); // Analiz sonucu gelen resim
  const [isLoading, setIsLoading] = useState(false); // Yükleme durumu (bekleme)
  const [error, setError] = useState(''); // Hata mesajı

  // FastAPI Backend'inizin adresi. Değiştirmeniz gerekirse buradan yapabilirsiniz.
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // Dosya seçildiğinde çalışacak fonksiyon
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Seçilen resmin önizlemesini oluştur
      setResult(null); // Eski sonucu temizle
      setError(''); // Eski hatayı temizle
    } else {
      setError('Lütfen geçerli bir resim dosyası seçin.');
      setSelectedFile(null);
      setPreview(null);
      setResult(null);
    }
  };

  // "Analiz Et" butonuna basıldığında çalışacak fonksiyon
  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Lütfen önce bir resim dosyası yükleyin.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null); // Yeni analiz başlarken eski sonucu temizle

    // Resmi göndermek için FormData kullanıyoruz
    const formData = new FormData();
    formData.append('file', selectedFile); // Backend'deki 'file' parametresiyle eşleşmeli

    try {
      // Fetch ile Backend'e POST isteği gönderiyoruz
      const response = await fetch(`${API_BASE_URL}/analyze/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // HTTP 4xx veya 5xx gibi bir hata dönerse
        const errorText = await response.text();
        throw new Error(`API hatası: ${response.status} - ${errorText || response.statusText}`);
      }

      // Backend'den gelen yanıt bir resim dosyası olduğu için 'blob' olarak okuyoruz
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob); // Blob'dan geçici bir URL oluştur
      setResult(imageUrl); // Sonuç görselini state'e kaydet

    } catch (err) {
      console.error("Analiz sırasında hata oluştu:", err);
      setError(`Analiz sırasında bir hata oluştu: ${err.message}. Lütfen backend sunucunuzun çalıştığından emin olun.`);
      setResult(null);
    } finally {
      setIsLoading(false); // Her durumda yükleme durumunu bitir
    }
  };

  return (
    <div className="container page-content">
      <h1 className="page-title">Yapay Zeka Destekli Görüntü Analizi</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>
        Analiz etmek istediğiniz medikal görüntüyü yükleyin ve yapay zeka modelimizin sonucunu saniyeler içinde görün.
      </p>

      <div className="analysis-container">
        {/* Yükleme Bölümü */}
        <div className="upload-section">
          <h3>1. Görüntüyü Yükleyin</h3>
          <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
          {error && <p className="error-message">{error}</p>}
          {preview && (
            <div className="image-preview">
              <h4>Yüklenen Görüntü:</h4>
              <img src={preview} alt="Yüklenen Görüntü Önizlemesi" />
            </div>
          )}
        </div>

        {/* Analiz Butonu */}
        <div className="analyze-button-section">
          <button onClick={handleAnalyze} disabled={isLoading || !selectedFile}>
            {isLoading ? 'Analiz Ediliyor...' : 'Analiz Et'}
          </button>
        </div>

        {/* Sonuç Bölümü */}
        <div className="result-section">
          <h3>2. Analiz Sonucu</h3>
          {isLoading && <div className="loader"></div>}
          {result && !isLoading && (
            <div className="image-result">
              <h4>Model Sonucu:</h4>
              <img src={result} alt="Analiz Sonucu" />
            </div>
          )}
          {!result && !isLoading && !error && (
            <p className="placeholder-text">Analiz sonucu burada görünecektir.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
