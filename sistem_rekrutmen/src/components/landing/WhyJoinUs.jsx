import './WhyJoinUs.css';

function WhyJoinUs() {
  const features = [
    {
      icon: '📚',
      title: 'Peluang Pengembangan Karir',
      description: 'Kami memberikan akses ke program pelatihan dan pengembangan agar Anda dapat mencapai potensi terbaik dalam karir Anda.'
    },
    {
      icon: '💡',
      title: 'Lingkungan Kerja Kolaboratif',
      description: 'Lingkungan kerja yang inklusif dan mendukung kolaborasi, di mana setiap ide dan kontribusi dihargai.'
    },
    {
      icon: '🛡️',
      title: 'Keuntungan dan Fasilitas',
      description: 'Nikmati berbagai manfaat seperti asuransi kesehatan, tunjangan, dan fleksibilitas waktu kerja.'
    }
  ];

  return (
    <section className="why-join-us">
      <div className="why-join-us-container">
        <h2 className="section-title">Mengapa Harus Bergabung dengan Kami</h2>
        <p className="section-description">
          Bergabung dengan kami berarti menjadi bagian dari tim yang menghargai setiap individu dan memberikan peluang untuk berkembang. Kami menyediakan lingkungan yang mendukung inovasi, kolaborasi, dan pembelajaran terus-menerus. Di sini, setiap potensi dihargai, dan setiap langkah Anda menuju kesuksesan akan didukung sepenuhnya. Kami percaya bahwa kesuksesan perusahaan berawal dari kontribusi setiap karyawan, dan bersama kami, Anda akan memiliki kesempatan untuk tumbuh, berinovasi, dan mencapai puncak karir yang Anda impikan.
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyJoinUs;

