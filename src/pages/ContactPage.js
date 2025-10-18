import React from 'react';

function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mesajınız başarıyla gönderildi!');
  };

  return (
    <div className="container page-content">
      <h1 className="page-title">İletişim</h1>
      <p style={{ textAlign: 'center', marginBottom: '30px' }}>
        Projelerimiz hakkında daha fazla bilgi almak, demo talebinde bulunmak veya iş birliği olanaklarını görüşmek için aşağıdaki formu doldurabilirsiniz.
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Adınız Soyadınız</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-posta Adresiniz</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Konu</label>
          <input type="text" id="subject" name="subject" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mesajınız</label>
          <textarea id="message" name="message" rows="6" required></textarea>
        </div>
        <button type="submit" className="submit-btn">Gönder</button>
      </form>
    </div>
  );
}

export default ContactPage;