/**
 * Utility untuk auto-fill data dummy untuk keperluan testing/prototyping
 */

export const autoFillData = {
  // Data untuk Profile Page
  profile: {
    tentangSaya: 'Saya adalah seorang profesional yang berpengalaman dalam bidang teknologi informasi dengan minat kuat pada pengembangan perangkat lunak dan keamanan siber. Saya memiliki kemampuan analitis yang baik, detail-oriented, dan selalu berusaha untuk terus belajar dan berkembang. Saya percaya bahwa dengan dedikasi dan kerja keras, saya dapat memberikan kontribusi yang berarti bagi perusahaan.',
    namaLengkap: 'Rasendriya Abel',
    tanggalLahir: '15/03/1995',
    jenisKelamin: 'laki-laki',
    email: 'rasendriyaabel@gmail.com',
    alamatTinggal: 'Jl. Raya Ubud No. 123, Ubud, Gianyar, Bali 80571',
    alamatDomisili: 'Jl. Raya Ubud No. 123, Ubud, Gianyar, Bali 80571'
  },

  // Data untuk Login Page
  login: {
    email: 'rasendriyaabel@gmail.com',
    password: 'password123'
  },

  // Data untuk Register Page
  register: {
    namaLengkap: 'Rasendriya Abel',
    email: 'rasendriyaabel@gmail.com',
    password: 'password123',
    konfirmasiPassword: 'password123'
  },

  // Data untuk Kelengkapan Berkas Page
  motivation: 'Saya sangat tertarik dengan posisi ini karena sesuai dengan latar belakang pendidikan dan pengalaman kerja saya. Saya percaya bahwa dengan kemampuan teknis yang saya miliki, saya dapat memberikan kontribusi yang signifikan bagi perusahaan. Selain itu, saya melihat peluang besar untuk berkembang dan belajar hal-hal baru di lingkungan kerja yang dinamis dan inovatif. Saya berkomitmen untuk memberikan yang terbaik dan bekerja dengan tim untuk mencapai tujuan perusahaan.'
};

/**
 * Generate dummy file untuk upload dokumen
 */
export const generateDummyFile = (fileName) => {
  // Create a dummy file object
  const blob = new Blob(['Dummy file content for testing'], { type: 'application/pdf' });
  const file = new File([blob], fileName, { type: 'application/pdf' });
  return file;
};

/**
 * Dummy file names untuk dokumen
 */
export const dummyDocumentFiles = {
  'Pakta Integritas': 'pakta_integritas.pdf',
  'Portofolio': 'portofolio.pdf',
  'CV': 'cv_rasendriya_abel.pdf',
  'Transkrip Nilai': 'transkrip_nilai.pdf',
  'SKCK': 'skck.pdf',
  'Ijazah': 'ijazah_s1.pdf',
  'Dokumen lainnya': 'dokumen_lainnya.pdf'
};

