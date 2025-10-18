import React from 'react';

function HomePage() {
  return (
    <>
      <header className="hero">
        <h1>Medikal Görüntü Analizinde 
          Yapay Zeka Destekli Yenilikçi Çözümler</h1>
        <p>Doktorlar için daha hızlı, daha hassas ve daha güvenilir teşhis imkanı sunuyoruz.</p>
      </header>
      <div className="container page-content">
        <h2>Teknolojimiz Hakkında</h2>
        <p>
          Tıbbi teşhis süreçlerinde en kritik adımlardan biri medikal görüntülerin doğru ve etkin bir şekilde yorumlanmasıdır. Geliştirdiğimiz son teknoloji yapay zeka modelleri ile radyologlara ve gastroenterologlara, hastalıkların erken teşhisinde güçlü bir destek sağlıyoruz. Kolonoskopi görüntülerinden polip segmentasyonundan akciğer grafilerinde kardiyomegali tespitine kadar, insan hatasını minimize eden ve verimliliği artıran akıllı sistemler geliştiriyoruz. Daha fazla bilgi için "Projelerimiz" sayfamızı ziyaret edin.
        </p>
      </div>
    </>
  );
}

export default HomePage;