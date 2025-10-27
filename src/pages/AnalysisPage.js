import React, { useState } from 'react';

function AnalysisPage() {
  const [selectedFile, setSelectedFile] = useState(null); 
  const [preview, setPreview] = useState(null); 
  const [result, setResult] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [analysisDetails, setAnalysisDetails] = useState(null); // <-- Analiz özetini tutar

  // KRİTİK DEĞİŞİKLİK: API adresini Netlify ortam değişkeninden okur.
  const API_BASE_URL = process.env.REACT_APP_API_URL; 

  // Dosya seçildiğinde çalışacak fonksiyon
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); 
      setResult(null); 
      setError(''); 
      setAnalysisDetails(null); // <-- Yeni yüklemede özet bilgiyi temizle
    } else {
      setError('Lütfen geçerli bir resim dosyası seçin.');
      setSelectedFile(null);
      setPreview(null);
      setResult(null);
      setAnalysisDetails(null);
    }
  };

  // "Analiz Et" butonuna basıldığında çalışacak fonksiyon
  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Lütfen önce bir resim dosyası yükleyin.');
      return;
    }

    // API adresi kontrolü (Yayınlama sonrası bir hata varsa)
    if (!API_BASE_URL || API_BASE_URL.includes('localhost')) {
        setError('HATA: API adresi doğru yüklenmedi. Netlify ortam değişkenini kontrol edin.');
        return;
    }

    setIsLoading(true);
    setError('');
    setResult(null); 
    setAnalysisDetails(null); 

    const formData = new FormData();
    formData.append('file', selectedFile); 

    try {
      // API_BASE_URL değişkenini kullanarak canlı API'ye istek gönderiyoruz.
      const response = await fetch(`${API_BASE_URL}/analyze/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`API hatası: ${response.status} - Detay: ${errorDetail}`);
      }

      // --- KRİTİK DEĞİŞİKLİK: HTTP BAŞLIKLARINI OKUYARAK ÖZET OLUŞTURMA ---
      const headers = response.headers;
      const analysisType = headers.get('X-Analysis-Type');
      let summaryText = 'Analiz tamamlandı, sonuçlar aşağıdadır.';
      
      if (analysisType === 'akciger_grafisi') {
          const diagnosis = headers.get('X-Diagnosis') || 'Belirsiz';
          const kto = headers.get('X-KTO-Value') || 'Hesaplanamadı';
          summaryText = `AKCİĞER: ${diagnosis} (KTO: ${kto})`;
      } else if (analysisType === 'kolonoskopi') {
          const polypCount = headers.get('X-Polyp-Count') || '0';
          summaryText = `KOLONOSKOPİ: ${polypCount} adet polip tespit edildi.`;
      } 
      
      setAnalysisDetails(summaryText); // Özet bilgiyi kaydet

      // Backend'den gelen yanıt resim dosyasıdır (Blob)
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob); 
      setResult(imageUrl); 

    } catch (err) {
      console.error("Analiz sırasında hata oluştu:", err);
      setError(`Analiz sırasında kritik bir hata oluştu: ${err.message}.`);
      setResult(null);
    } finally {
      setIsLoading(false); 
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
          
          {/* Analiz Sonucu Geldiğinde */}
          {result && !isLoading && (
            <div className="image-result">
              
              {/* Analiz Özetini Resmin Üzerinde Temizce Gösteriyoruz */}
              {analysisDetails && <p className="analysis-summary">
                  <strong>{analysisDetails}</strong>
              </p>}

              <h4>Model Sonucu:</h4>
              <img src={result} alt="Analiz Sonucu" />
            </div>
          )}
          
          {/* Placeholder */}
          {!result && !isLoading && !error && (
            <p className="placeholder-text">Analiz sonucu burada görünecektir.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
