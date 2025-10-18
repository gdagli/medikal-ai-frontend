import React from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import polypImage from '../assets/polyp-segmentation.jpg';
import cardiomegalyImage from '../assets/cardiomegaly-detection.jpg';

import polypGif from '../assets/polyp.gif';
import cardiomegalyGif from '../assets/cardiomegaly.gif';

const mathJaxConfig = {
  loader: { load: ["input/tex", "output/svg"] },
  tex: { inlineMath: [["$", "$"], ["\\(", "\\)"]] },
  svg: { fontCache: "global" }
};

function ProjectsPage() {
  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className="container page-content">
        <h1 className="page-title">Yapay Zeka Destekli Çözümlerimiz</h1>

        {/* Polip Segmentasyonu Bölümü */}
        <section id="polyp-segmentation" className="project-section">
          <div className="project-header">
            <h2>Erken Teşhis Hayat Kurtarır: Akıllı Polip Analizi</h2>
          </div>
          <div className="project-content">
            <div className="image-wrapper">
              <img src={polypImage} alt="Kolonoskopi Polip Segmentasyonu" />
            </div>
            <div className="text-content">
              <h3>Problemin Önemi</h3>
              <p>Kolorektal kanser, dünyada en sık görülen kanser türlerinden biridir ve genellikle poliplerden gelişir. Kolonoskopi sırasında bu poliplerin tespiti ve çıkarılması, kanseri önlemenin en etkili yoludur. Ancak, insan gözü küçük, düz veya alışılmadık şekilli polipleri gözden kaçırabilir. Bu durum, "interval kanser" olarak bilinen ve bir sonraki taramaya kadar gelişen kanser riskini artırır.</p>

              <h3>Yapay Zeka Destekli Çözümümüz</h3>
              <p>Geliştirdiğimiz derin öğrenme tabanlı segmentasyon modeli, kolonoskopi video akışını veya görüntülerini gerçek zamanlı olarak analiz eder.</p>
              <ul>
                <li><strong>Tespit (Detection):</strong> Modelimiz, bir polip adayı gördüğünde anında bunu belirler.</li>
                <li><strong>Segmentasyon (Segmentation):</strong> Sadece polipin yerini göstermekle kalmaz, aynı zamanda sınırlarını piksel piksel hassasiyetle çizer (segmente eder). Bu, polipin boyutu, şekli ve morfolojisi hakkında doktora anında detaylı bilgi sunar.</li>
              </ul>

              <h3>Sağladığı Avantajlar</h3>
              <ul>
                <li><strong>Artırılmış Adenom Tespit Oranı (ADR):</strong> Gözden kaçabilecek poliplerin yakalanmasını sağlayarak hekimin tespit oranını artırır.</li>
                <li><strong>Zaman Tasarrufu:</strong> Otomatik tespit sayesinde inceleme süresi optimize edilir.</li>
                <li><strong>Nesnel Değerlendirme:</strong> Doktor yorgunluğuna veya deneyimine bağlı değişkenliği ortadan kaldırır.</li>
              </ul>
            </div>
            <img src={polypGif} alt="Polip Segmentasyon GIF" style={{ width: '100%', maxWidth: '700px', display: 'block', margin: '20px auto',boxShadow: 'none' }} />
          </div>
        </section>

        {/* Kardiyomegali Tespiti Bölümü */}
        <section id="cardiomegaly-detection" className="project-section">
          <div className="project-header">
            <h2>Kalp Sağlığına Açılan Pencere: Otomatik Kardiyomegali Analizi</h2>
          </div>
          <div className="project-content reverse-order">
            <div className="image-wrapper">
              <img src={cardiomegalyImage} alt="Akciğer Grafisi Kardiyomegali Tespiti" />
            </div>
            <div className="text-content">
              <h3>Problemin Tanımı</h3>
              <p>Kardiyomegali, kalbin normalden büyük olması durumudur ve genellikle altta yatan bir kalp hastalığının (örneğin kalp yetmezliği, hipertansiyon) önemli bir belirtisidir. Akciğer grafilerinde bu durumu değerlendirmek için <strong>Kardiyotorasik Oran (KTO)</strong> hesaplanır. Manuel hesaplama zaman alıcı olabilir ve ölçümlerde kişiden kişiye farklılıklar gösterebilir.</p>
              
              <h3>Otomatik KTO Hesaplama Sistemimiz</h3>
              <p>Yapay zeka modelimiz, posteroanterior (PA) akciğer grafilerini saniyeler içinde analiz ederek aşağıdaki adımları otomatik olarak gerçekleştirir:</p>
              <ul>
                <li><strong>Anatomik Sınırların Tespiti:</strong> Model, göğüs kafesinin (toraks) ve kalbin sınırlarını hassas bir şekilde çizer.</li>
                <li><strong>Ölçümlerin Alınması:</strong> Kalbin ve göğüs kafesinin en geniş yatay mesafelerini ölçer.</li>
                <li><strong>KTO Hesaplaması:</strong> Bu ölçümleri kullanarak Kardiyotorasik Oran'ı anında hesaplar.</li>
              </ul>

              <h4>Kardiyotorasik Oran (KTO) Formülü:</h4>
              <MathJax hideUntilTypeset={"first"}>
                {`$$KTO = \\frac{\\text{Kalp Genişliği (A + B)}}{\\text{Göğüs Kafesi Genişliği (C)}}$$`}
              </MathJax>
              <p><strong>Değerlendirme:</strong> Hesaplanan KTO değeri, standart eşik değeriyle karşılaştırılır. Genellikle <strong>KTO > 0.50 (%50)</strong> olması kardiyomegali lehine bir bulgu olarak kabul edilir. Sistemimiz, hesaplanan oranı ve potansiyel kardiyomegali riskini anında raporlar.</p>
              
            </div>
            <img src={cardiomegalyGif} alt="Kardiyomegali Tespit Süreci GIF" style={{ width: '100%', maxWidth: '700px', display: 'block', margin: '20px auto',boxShadow: 'none' }} />
          </div>
        </section>
      </div>
    </MathJaxContext>
  );
}

export default ProjectsPage;