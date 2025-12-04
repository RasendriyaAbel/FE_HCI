import Header from '../components/explore/Header';
import Footer from '../components/landing/Footer';
import './AboutPage.css';

function AboutPage() {
  const managementTeam = [
    {
      name: 'Mr. I Made Warsa, SH',
      position: 'Director',
      image: 'https://via.placeholder.com/200x250?text=Director'
    },
    {
      name: 'Mr. I Putu Aca',
      position: 'Accounting Manager',
      image: 'https://via.placeholder.com/200x250?text=Accounting+Manager'
    },
    {
      name: 'Mr. Armijn Woda Kolo',
      position: 'HR & Operation Manager',
      image: 'https://via.placeholder.com/200x250?text=HR+Operation'
    },
    {
      name: 'Mr. Ketut Artadana',
      position: 'Ass. HR & Operational',
      image: 'https://via.placeholder.com/200x250?text=Ass+HR'
    }
  ];

  return (
    <div className="about-page">
      <Header />

      <main className="about-content">
        <section className="about-hero">
          <h1 className="about-title">PT Andal Aman Abadi</h1>
        </section>

        <section className="about-overview">
          <p className="about-description">
            PT Andal Aman Abadi adalah perusahaan jasa tenaga kerja formal yang didirikan
            secara legal sesuai dengan peraturan pemerintah Indonesia. Perusahaan ini
            menyediakan layanan outsourcing yang mencakup rekrutmen, penempatan, pengembangan
            keterampilan, dan outsourcing SDM. Perusahaan menekankan fleksibilitas, efisiensi,
            dan efektivitas dalam layanannya. Saat ini, perusahaan mengelola lebih dari 200
            pekerja terampil formal, terutama di industri pariwisata dan perhotelan, dari
            tingkat dasar hingga manajerial. Perusahaan juga memiliki lebih dari 1000 pelamar
            dengan latar belakang pendidikan dan keterampilan yang beragam dalam databasenya.
            Teks ini menyoroti komitmen perusahaan terhadap keandalan, kepercayaan, layanan
            yang sangat baik, dan perhatian terhadap detail, menyatakan bahwa reputasi
            jangka panjangnya di industri outsourcing mewakili kejujuran.
          </p>
        </section>

        <section className="about-vision-mission">
          <div className="vm-grid">
            <div className="vm-card">
              <h2 className="vm-title">Visi Kami</h2>
              <p className="vm-text">
                Menjadi vendor outsourcing yang terpercaya dan profesional serta mitra
                strategis utama bagi pengusaha, pekerja, dan stakeholder outsourcing,
                khususnya di wilayah Bali.
              </p>
            </div>
            <div className="vm-card">
              <h2 className="vm-title">Misi Kami</h2>
              <p className="vm-text">
                Menyediakan pekerja yang profesional, berkomitmen, dan konsisten untuk
                memberikan layanan berkualitas kepada klien.
              </p>
            </div>
          </div>
        </section>

        <section className="about-team">
          <h2 className="about-section-title">Our Management Team</h2>
          <p className="about-team-intro">
            PT Andal Aman Abadi memiliki tim yang solid dengan pengetahuan dan pengalaman
            yang luas di industri jasa, berkomitmen untuk memberikan tingkat layanan
            tertinggi dan terus berusaha meningkatkan pengalaman pengguna.
          </p>
          <div className="team-grid">
            {managementTeam.map((member, index) => (
              <div key={index} className="team-member">
                <div className="team-member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-position">{member.position}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-contact">
          <div className="contact-info">
            <h2 className="about-section-title">Kontak Kami</h2>
            <div className="contact-details">
              <div className="contact-item">
                <h3 className="contact-label">Main Office</h3>
                <p className="contact-text">
                  Jl. Siligita Jl. Raya Nusa Dua Selatan No.14, Benoa, Kec. Kuta Sel.,
                  Kabupaten Badung, Bali 80363
                </p>
              </div>
              <div className="contact-item">
                <h3 className="contact-label">Email</h3>
                <p className="contact-text">
                  <a href="mailto:tripleA.bali@gmail.com" className="contact-link">
                    tripleA.bali@gmail.com
                  </a>
                </p>
              </div>
              <div className="contact-item">
                <h3 className="contact-label">Phone</h3>
                <p className="contact-text">
                  <a href="tel:+62361775291" className="contact-link">
                    +62 0361 775 291
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="contact-image">
            <div className="office-image-placeholder">
              <p>Foto Gedung Kantor</p>
              <p className="office-image-note">
                PT. ANDAL AMAN ABADI
                <br />
                Jl. Siligita Jl. Raya Nusa Dua Selatan No.14
                <br />
                Benoa, Kec. Kuta Sel., Kabupaten Badung, Bali 80363
                <br />
                Tel: +62 0361 775 291
                <br />
                Email: tripleA.bali@gmail.com
                <br />
                <br />
                TRIPLE SECURITY & RECRUITMENT SERVICE
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;

