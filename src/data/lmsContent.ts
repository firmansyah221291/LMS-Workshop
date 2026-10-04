export interface LessonItem {
  id: string;
  moduleId: number;
  moduleCode: string;
  lessonNumber: number;
  globalIndex: number;
  title: string;
  duration: string;
  summary: string;
  keyPoints: string[];
  contentParagraphs: string[];
  practicalTip: string;
  reflectionPrompt: string;
}

export interface QuizQuestion {
  id: number;
  moduleId: number;
  moduleRef: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ModuleItem {
  id: number;
  code: string;
  bimtekTitle: string;
  title: string;
  subtitle: string;
  accentColor: 'mint' | 'orange' | 'lime';
  description: string;
  quote: string;
  lessons: LessonItem[];
  quiz: QuizQuestion[];
}

export const LMS_MODULES: ModuleItem[] = [
  {
    id: 1,
    code: 'MODUL 1',
    bimtekTitle: 'Bimtek Daerah Digitalisasi Pembelajaran SD 2026',
    title: 'Inspirasi Penggunaan Bahan Ajar Interaktif Berbasis Digital',
    subtitle: 'Konsep, prinsip pemilihan tepat sasaran, ragam media, dan eksplorasi platform digital',
    accentColor: 'mint',
    description:
      'Memahami definisi bahan ajar interaktif, ciri aksi-respon-adaptif, prinsip "Bukan Sekadar Keren Tapi Tepat Sasaran", Ruang Murid, dan analisis studi kasus.',
    quote: '“Bahan ajar terbaik bukan yang paling canggih, tetapi yang paling tepat membantu murid mencapai tujuan pembelajaran.”',
    lessons: [
      {
        id: 'm1-l1',
        moduleId: 1,
        moduleCode: 'MODUL 1',
        lessonNumber: 1,
        globalIndex: 0,
        title: 'Konsep & Definisi Bahan Ajar Interaktif',
        duration: '12 Menit',
        summary: 'Bahan ajar yang memungkinkan murid berinteraksi langsung dengan isi pembelajaran sehingga mereka aktif berpikir, mencoba, dan merespons.',
        keyPoints: [
          'Penggunaan bahan ajar lebih bermakna ketika murid tidak hanya melihat dan mendengar, tetapi terlibat aktif.',
          'Interaktivitas memicu keterlibatan kognitif murid untuk mencapai tujuan pembelajaran.',
          'Bergeser dari pola transmisi satu arah menuju eksplorasi dua arah.'
        ],
        contentParagraphs: [
          'Penggunaan bahan ajar akan jauh lebih bermakna ketika murid tidak sekadar duduk pasif melihat layar atau mendengarkan penjelasan guru. Bahan Ajar Interaktif adalah materi pembelajaran digital yang memungkinkan murid berinteraksi langsung dengan isi pembelajaran, sehingga mereka aktif berpikir, mencoba, dan memberikan respon untuk membantu mencapai tujuan pembelajaran.',
          'Dalam Bimbingan Teknis Daerah Digitalisasi Pembelajaran SD Tahun 2026, ditekankan bahwa interaktivitas bukan sekadar ornamen animasi visual, melainkan jembatan pedagogis agar murid mengonstruksi pemahamannya sendiri melalui aksi dan reaksi langsung.'
        ],
        practicalTip: 'Ajukan pertanyaan pemantik sebelum membuka bahan ajar digital agar murid memiliki target eksplorasi mandiri.',
        reflectionPrompt: 'Bahan ajar apa yang paling sering Bapak/Ibu gunakan di kelas, dan bagaimana respon murid saat menggunakannya?'
      },
      {
        id: 'm1-l2',
        moduleId: 1,
        moduleCode: 'MODUL 1',
        lessonNumber: 2,
        globalIndex: 1,
        title: 'Tiga Ciri Utama Bahan Ajar Interaktif',
        duration: '14 Menit',
        summary: 'Membutuhkan aksi pengguna, memberikan respon/umpan balik langsung, dan bersifat dinamis serta adaptif.',
        keyPoints: [
          '1. Membutuhkan aksi pengguna (klik, geser, ketik, pilih) agar materi bergerak atau menyajikan informasi baru.',
          '2. Memberikan respon/umpan balik berdasarkan interaksi murid (misal konfirmasi benar/salah).',
          '3. Bersifat dinamis dan adaptif menyesuaikan alur eksplorasi murid.'
        ],
        contentParagraphs: [
          'Ciri pertama: Membutuhkan aksi dari pengguna (klik, geser/drag, ketik, pilih). Bahan ajar interaktif tidak akan bergerak atau memberikan informasi baru sampai murid melakukan sesuatu. Hal ini menuntut murid senantiasa waspada dan terlibat.',
          'Ciri kedua: Memberikan respon atau umpan balik seketika. Jika murid menjawab pertanyaan atau memasangkan organ tubuh, sistem langsung mengabarkan apakah aksinya benar atau salah. Ciri ketiga: Bersifat dinamis dan adaptif, alur pembelajaran dapat menyesuaikan kecepatan dan pilihan respon murid.'
        ],
        practicalTip: 'Periksa apakah media digital yang Anda pilih benar-benar menuntut respon murid atau hanya video yang ditonton sampai selesai tanpa jeda aksi.',
        reflectionPrompt: 'Apakah materi digital yang Anda gunakan di kelas sudah memiliki umpan balik langsung saat murid salah memilih?'
      },
      {
        id: 'm1-l3',
        moduleId: 1,
        moduleCode: 'MODUL 1',
        lessonNumber: 3,
        globalIndex: 2,
        title: 'Lima Manfaat Bahan Ajar Interaktif bagi Murid SD',
        duration: '12 Menit',
        summary: 'Meningkatkan keterlibatan, memfasilitasi pemahaman mendalam, memberi umpan balik, melatih berpikir kritis, dan mencapai TP.',
        keyPoints: [
          'Membantu murid mencapai tujuan pembelajaran secara efisien.',
          'Memfasilitasi pemahaman yang lebih mendalam melalui manipulasi objek virtual.',
          'Memberikan umpan balik instan untuk membantu proses refleksi belajar.',
          'Mendorong keterampilan berpikir kritis dan pemecahan masalah nyata.',
          'Meningkatkan keterlibatan aktif (engagement) murid di kelas.'
        ],
        contentParagraphs: [
          'Bimtek Digitalisasi Pembelajaran SD merumuskan 5 manfaat inti bahan ajar interaktif. Pertama, membantu murid mencapai tujuan pembelajaran secara terukur. Kedua, memfasilitasi pemahaman konsep abstrak yang sulit dijelaskan kata-kata (misalnya peredaran darah atau pecahan).',
          'Ketiga, memberikan umpan balik tanpa penghakiman sosial sehingga murid berani mencoba lagi. Keempat, memicu daya nalar kritis saat memecahkan teka-teki konsep. Kelima, mengubah suasana kelas menjadi bersemangat dan partisipatif.'
        ],
        practicalTip: 'Gunakan bahan ajar interaktif pada bagian konsep tersulit (critical concepts) untuk mengurai miskonsepsi murid.',
        reflectionPrompt: 'Manfaat mana dari kelima poin di atas yang paling dirasakan perubahannya oleh murid Anda?'
      },
      {
        id: 'm1-l4',
        moduleId: 1,
        moduleCode: 'MODUL 1',
        lessonNumber: 4,
        globalIndex: 3,
        title: 'Prinsip 1: Keselarasan dengan Tujuan Pembelajaran',
        duration: '15 Menit',
        summary: 'Bukan sekadar keren, tapi tepat sasaran! Bahan ajar adalah "kendaraan" menuju tujuan pembelajaran.',
        keyPoints: [
          'Bahan ajar adalah "kendaraan" untuk membantu mencapai tujuan pembelajaran (TP).',
          'Jangan terjebak memilih aplikasi karena tampilannya memukau atau grafisnya ramai.',
          'Jika tujuan adalah "menganalisis proses", bahan ajar harus memfasilitasi investigasi proses, bukan sekadar tebak definisi.'
        ],
        contentParagraphs: [
          'Prinsip utama yang wajib dipegang teguh oleh guru adalah: Bukan Sekadar Keren, Tapi Tepat Sasaran! Bahan ajar hanyalah "kendaraan" pengantar menuju tempat tujuan, yaitu Tujuan Pembelajaran (TP).',
          'Sering kali guru tergiur oleh aplikasi yang penuh efek suara dan animasi gemerlap, namun ternyata isinya hanya tebakan kata yang tidak melatih kompetensi yang ditargetkan di kurikulum. Selalu tanyakan: "Apakah fitur di bahan ajar ini membimbing murid menguasai indikator TP?"'
        ],
        practicalTip: 'Tuliskan Tujuan Pembelajaran di sudut papan sebelum memilih bahan ajar, lalu cocokkan setiap fitur aktivitasnya.',
        reflectionPrompt: 'Pernahkah Anda menggunakan aplikasi digital yang sangat disukai murid namun ternyata capaian belajarnya tidak tercapai? Mengapa hal itu terjadi?'
      },
      {
        id: 'm1-l5',
        moduleId: 1,
        moduleCode: 'MODUL 1',
        lessonNumber: 5,
        globalIndex: 4,
        title: 'Prinsip 2, 3, & 4: Karakteristik Murid, Konteks & Kecukupan',
        duration: '13 Menit',
        summary: 'Menyesuaikan usia kognitif, kondisi gawai sekolah (Mode Klasikal), dan kecukupan porsi materi.',
        keyPoints: [
          'Kesesuaian Karakteristik Murid: sesuaikan dengan perkembangan kognitif usia SD.',
          'Konteks & Aksesibilitas Realistis: jika gawai terbatas, gunakan "Mode Klasikal" dengan papan interaktif.',
          'Kecukupan Materi: tidak terlalu sedikit hingga TP tak tuntas, tidak terlalu banyak hingga membebani alokasi waktu.'
        ],
        contentParagraphs: [
          'Kesesuaian Karakteristik Murid menuntut penyajian yang sesuai tahap operasional konkret anak SD. Teks tidak boleh terlalu padat dan tombol navigasi harus intuitif.',
          'Konteks & Aksesibilitas Realistis: Jangan memaksakan mode 1 murid 1 gawai jika fasilitas sekolah terbatas. Guru dapat menggunakan "Mode Klasikal" di mana bahan ajar ditayangkan di Papan Interaktif Digital / Proyektor dan murid bergiliran maju berdiskusi. Prinsip Kecukupan memastikan materi pas sesuai alokasi jam pelajaran.'
        ],
        practicalTip: 'Di kelas dengan keterbatasan internet, unduh materi Ruang Murid versi offline sebelum pembelajaran dimulai.',
        reflectionPrompt: 'Bagaimana strategi Bapak/Ibu mengelola giliran interaksi murid saat menggunakan 1 layar di depan kelas?'
      },
      {
        id: 'm1-l6',
        moduleId: 1,
        moduleCode: 'MODUL 1',
        lessonNumber: 6,
        globalIndex: 5,
        title: 'Ragam Bahan Ajar Interaktif Berbasis Digital',
        duration: '15 Menit',
        summary: 'Gim edukasi, materi bertema (pendalaman konsep & kuis cabang alur), dan lab maya (simulasi eksperimen).',
        keyPoints: [
          'Gim Edukasi: gamifikasi untuk mencapai misi tertentu sambil bermain (skor, nyawa, petualangan).',
          'Materi Bertema: interaksi 2 arah memilih jawaban, klik info, atau cabang cerita (pendalaman konsep & kuis).',
          'Lab Maya Interaktif: interaksi 2 arah untuk eksperimen dan simulasi virtual tanpa risiko fisik.'
        ],
        contentParagraphs: [
          'Terdapat tiga rumpun besar bahan ajar interaktif: Pertama, Gim Edukasi yang mengusung gamifikasi lengkap dengan misi, alur, poin, dan tantangan bertingkat. Murid belajar sambil bermain.',
          'Kedua, Materi Bertema Interaktif yang memuat pendalaman materi, latihan soal, dan alur bercabang sesuai respon murid. Ketiga, Lab Maya Interaktif yang memungkinkan simulasi praktikum sains (seperti massa jenis atau rangkaian listrik) secara virtual yang aman, hemat, dan mudah diulang.'
        ],
        practicalTip: 'Padukan Gim Edukasi untuk ice breaking / penguatan dan Lab Maya untuk pembuktian konsep sains di inti pembelajaran.',
        reflectionPrompt: 'Jenis bahan ajar interaktif mana dari ketiga ragam di atas yang paling jarang Anda manfaatkan di sekolah?'
      },
      {
        id: 'm1-l7',
        moduleId: 1,
        moduleCode: 'MODUL 1',
        lessonNumber: 7,
        globalIndex: 6,
        title: 'Eksplorasi Ruang Murid Kemendikbudristek',
        duration: '16 Menit',
        summary: 'Pemanfaatan portal rumah.pendidikan.go.id, 4.800+ materi, filter mata pelajaran, dan versi offline.',
        keyPoints: [
          'Ruang Murid gratis, inklusif, dan mendukung kondisi fasilitas sekolah yang beragam.',
          'Menyediakan 4.800+ materi video, teks, dan modul interaktif yang siap pakai.',
          'Dapat diakses di Papan Interaktif Digital, Laptop, Tablet, dan HP via akun belajar.id.',
          'Tersedia versi aplikasi offline untuk daerah dengan keterbatasan sinyal internet.'
        ],
        contentParagraphs: [
          'Kemendikbudristek menyediakan portal Ruang Murid melalui tautan rumah.pendidikan.go.id. Platform ini dirancang agar guru tidak perlu membuat media dari nol setiap kali mengajar.',
          'Guru cukup masuk menggunakan Akun Belajar.id, lalu memilih menu "Sumber Belajar". Terdapat filter jenjang (PAUD, SD, SMP, SMA/SMK), kelas, mata pelajaran, unit/sub unit, dan tipe materi pembelajaran. Fitur bookmark memudahkan guru menyimpan materi favorit untuk persiapan mengajar.'
        ],
        practicalTip: 'Simpan bahan ajar Ruang Murid ke folder favorit seminggu sebelum jadwal mengajar agar persiapan lebih tenang.',
        reflectionPrompt: 'Apakah Bapak/Ibu sudah pernah mencoba mengakses menu Sumber Belajar di rumah.pendidikan.go.id?'
      },
      {
        id: 'm1-l8',
        moduleId: 1,
        moduleCode: 'MODUL 1',
        lessonNumber: 8,
        globalIndex: 7,
        title: 'Ragam Platform Kreasi Bahan Ajar Digital',
        duration: '15 Menit',
        summary: 'Inspirasi Canva, Wayground, Wordwall, Polypad, dan Qreatif Educative untuk semua mata pelajaran.',
        keyPoints: [
          'Canva: presentasi, video, dan media interaktif visual untuk semua mata pelajaran.',
          'Wayground: menambahkan video, animasi, musik, kuis interaktif, dan rekaman suara.',
          'Wordwall: membuat aktivitas mencocokkan, roda acak, teka-teki silang, langsung di layar interaktif.',
          'Polypad (Amplify): memvisualisasikan konsep matematika abstrak melalui manipulatif digital.',
          'Qreatif Educative: kumpulan gim edukasi, virtual lab, dan media 3D interaktif.'
        ],
        contentParagraphs: [
          'Untuk memperkaya variasi belajar, guru SD dapat memanfaatkan platform kreasi global yang mudah digunakan. Canva memungkinkan pembuatan infografis dan tayangan interaktif.',
          'Wordwall sangat digemari murid SD karena menyediakan permainan mencocokkan kata dan roda keberuntungan yang seru dimainkan di papan interaktif. Untuk matematika, Polypad menyediakan ubin aljabar, pecahan visual, dan penggaris virtual yang membuat matematika tampak nyata.'
        ],
        practicalTip: 'Gunakan template Wordwall siap pakai dari komunitas guru lalu sesuaikan kata-katanya agar hemat waktu persiapan.',
        reflectionPrompt: 'Platform apa yang paling sering Bapak/Ibu gunakan untuk membuat permainan interaktif di kelas?'
      },
      {
        id: 'm1-l9',
        moduleId: 1,
        moduleCode: 'MODUL 1',
        lessonNumber: 9,
        globalIndex: 8,
        title: 'Platform Khusus Sains, Matematika, Seni & Koding',
        duration: '15 Menit',
        summary: 'PhET Simulation, Google Earth, Sketchfab 3D, ScratchJr, Coolmath4kids, dan Musicca.',
        keyPoints: [
          'PhET Interactive Simulation: simulasi praktikum virtual sains & matematika gratis dan akurat.',
          'Google Earth & Sketchfab: eksplorasi peta dunia spasial dan model 3D anatomi/fosil.',
          'Coolmath4kids: gim matematika interaktif untuk melatih kelancaran berhitung murid SD.',
          'ScratchJr: pengenalan bahasa pemrograman visual dan logika koding ramah anak.',
          'Musicca: alat musik virtual interaktif untuk materi seni musik SD.'
        ],
        contentParagraphs: [
          'Bimtek SD 2026 mengenalkan platform spesifik muatan pelajaran. Di bidang IPAS, PhET Simulation menyediakan laboratorium virtual gelombang dan listrik, sedangkan Google Earth membawa murid berkeliling benua secara 3D.',
          'Untuk pembelajaran seni dan koding, Musicca menghadirkan piano dan drum virtual di papan sentuh, sementara ScratchJr melatih logika komputasional anak melalui penyusunan blok visual cerita animasi.'
        ],
        practicalTip: 'Ajak murid mencoba simulasi PhET dengan memprediksi hasil eksperimen terlebih dahulu (metode Predict-Observe-Explain).',
        reflectionPrompt: 'Konsep sains abstrak apa di kelas Anda yang paling membutuhkan bantuan simulasi visual PhET atau model 3D?'
      },
      {
        id: 'm1-l10',
        moduleId: 1,
        moduleCode: 'MODUL 1',
        lessonNumber: 10,
        globalIndex: 9,
        title: 'Analisis Studi Kasus: Bu Lestari vs Pak Dedi',
        duration: '16 Menit',
        summary: 'Membedah mengapa pemilihan bahan ajar Bu Lestari SUDAH TEPAT sedangkan Pak Dedi KURANG TEPAT.',
        keyPoints: [
          'Studi Kasus Bu Lestari (SUDAH TEPAT): materi interaktif tata surya memadukan video konsep, latihan mencocokkan, dan diskusi murid selaras dengan TP.',
          'Studi Kasus Pak Dedi (KURANG TEPAT): menggunakan Wordwall sebelum murid memahami proses siklus air, sehingga hanya menebak definisi istilah.',
          'Kaidah: Jangan mulai dengan memilih aplikasi! Mulailah dengan menetapkan tujuan pembelajaran, kenali murid, baru pilih medianya.'
        ],
        contentParagraphs: [
          'Studi kasus Bu Lestari: Beliau menggunakan bahan ajar Ruang Murid berisi video penjelasan planet, simulasi orbit, dan latihan mencocokkan ciri planet. Pemilihan ini SUDAH TEPAT karena fiturnya berjenjang mengantar murid dari pengamatan visual ke penguatan konsep melalui diskusi bermakna.',
          'Sebaliknya pada kasus Pak Dedi: Tujuan pembelajarannya adalah murid memahami proses dan siklus air, namun Pak Dedi langsung memberi kuis Wordwall definisi istilah. Pemilihan ini KURANG TEPAT karena Wordwall hanya cocok untuk latihan/penguatan hafalan istilah, bukan untuk mengeksplorasi proses siklus air. Guru seharusnya memfasilitasi pengamatan proses terlebih dahulu.'
        ],
        practicalTip: 'Ingat urutan emas: (1) Tetapkan TP -> (2) Rancang aktivitas belajar -> (3) Pilih bahan ajar interaktif yang paling cocok.',
        reflectionPrompt: 'Bagaimana Bapak/Ibu memastikan kuis interaktif tidak diberikan terlalu dini sebelum murid memahami konsep esensialnya?'
      }
    ],
    quiz: [
      {
        id: 101,
        moduleId: 1,
        moduleRef: 'Modul 1 · Konsep Dasar',
        question: 'Berdasarkan materi Bimtek SD 2026, apa definisi paling tepat dari Bahan Ajar Interaktif Berbasis Digital?',
        options: [
          'Bahan ajar video animasi yang diputar satu arah tanpa henti sampai bel pulang sekolah berbunyi.',
          'Bahan ajar yang memungkinkan murid berinteraksi langsung dengan isi pembelajaran sehingga mereka aktif berpikir, mencoba, dan merespons.',
          'Buku teks pelajaran cetak yang diubah menjadi file PDF statis dan dibaca di layar proyektor.',
          'Kumpulan soal ujian pilihan ganda di kertas fotokopi yang dinilai manual oleh guru.'
        ],
        correctIndex: 1,
        explanation: 'Bahan ajar interaktif memungkinkan interaksi dua arah di mana murid berinteraksi langsung dengan isi pembelajaran melalui aksi dan memperoleh respon langsung.'
      },
      {
        id: 102,
        moduleId: 1,
        moduleRef: 'Modul 1 · Ciri Interaktif',
        question: 'Manakah di bawah ini yang BUKAN merupakan tiga ciri utama bahan ajar interaktif?',
        options: [
          'Membutuhkan aksi dari pengguna (klik, geser, ketik, pilih) agar materi bergerak atau menyajikan informasi baru.',
          'Memberikan respon atau umpan balik seketika berdasarkan interaksi yang dilakukan murid.',
          'Bersifat dinamis dan adaptif menyesuaikan masukan serta kecepatan respon murid.',
          'Hanya menampilkan teks panjang tanpa tombol navigasi atau aktivitas interaksi murid.'
        ],
        correctIndex: 3,
        explanation: 'Tiga ciri bahan ajar interaktif adalah: membutuhkan aksi pengguna, memberikan respon/umpan balik, dan bersifat dinamis serta adaptif.'
      },
      {
        id: 103,
        moduleId: 1,
        moduleRef: 'Modul 1 · Prinsip Pemilihan',
        question: 'Prinsip "Bukan Sekadar Keren, Tapi Tepat Sasaran!" dalam pemilihan bahan ajar memiliki makna filosofis...',
        options: [
          'Guru harus selalu membeli aplikasi luar negeri termahal yang memiliki grafis 3D tercanggih.',
          'Bahan ajar adalah "kendaraan" yang harus selaras dan efektif membantu ketercapaian Tujuan Pembelajaran.',
          'Guru bebas memakai aplikasi apa pun asalkan murid senang berteriak dan suasana kelas heboh.',
          'Penggunaan media digital wajib menggantikan sepenuhnya peran pendidik di ruang kelas.'
        ],
        correctIndex: 1,
        explanation: 'Bahan ajar berfungsi sebagai kendaraan; keindahan visual harus tunduk pada keselarasan dengan Tujuan Pembelajaran dan karakteristik murid.'
      },
      {
        id: 104,
        moduleId: 1,
        moduleRef: 'Modul 1 · Studi Kasus',
        question: 'Pada studi kasus Bimtek SD, mengapa penggunaan Wordwall oleh Pak Dedi pada materi proses siklus air dinilai KURANG TEPAT?',
        options: [
          'Karena aplikasi Wordwall berbayar mahal dan tidak boleh digunakan di sekolah dasar.',
          'Karena tujuan pembelajaran menuntut pemahaman proses siklus air, sedangkan kuis Wordwall hanya mencocokkan definisi istilah tanpa eksplorasi proses.',
          'Karena murid-murid Pak Dedi tidak ada yang memiliki gawai pribadi di rumah.',
          'Karena papan interaktif digital di kelas Pak Dedi mengalami mati listrik mendadak.'
        ],
        correctIndex: 1,
        explanation: 'Wordwall lebih tepat sebagai latihan penguatan istilah. Untuk memahami proses dan siklus hubungan sebab-akibat, murid membutuhkan simulasi atau eksplorasi proses terlebih dahulu.'
      },
      {
        id: 105,
        moduleId: 1,
        moduleRef: 'Modul 1 · Platform & Akses',
        question: 'Apabila sebuah sekolah dasar memiliki keterbatasan jumlah gawai murid, langkah paling realistis dan inklusif sesuai materi Bimtek adalah...',
        options: [
          'Membatalkan seluruh rencana pembelajaran digital dan kembali mendikte catatan di papan tulis.',
          'Mewajibkan seluruh orang tua murid membeli tablet baru untuk dibawa ke sekolah besok pagi.',
          'Menerapkan "Mode Klasikal" dengan menayangkan bahan ajar di Papan Interaktif Digital/Proyektor dan murid bergiliran aktif mencoba.',
          'Hanya mengajar 3 orang murid yang kebetulan membawa gawai ke sekolah.'
        ],
        correctIndex: 2,
        explanation: 'Konteks dan aksesibilitas realistis: jika gawai murid terbatas, guru menerapkan Mode Klasikal secara kolaboratif menggunakan layar bersama.'
      }
    ]
  },
  {
    id: 2,
    code: 'MODUL 2',
    bimtekTitle: 'Bimtek Daerah Digitalisasi Pembelajaran SD 2026',
    title: 'Pengembangan dan Pembuatan Media Pembelajaran Interaktif',
    subtitle: 'Karakteristik MPI, siklus prinsip kerja, prinsip desain visual, dan kreasi Canva AI',
    accentColor: 'orange',
    description:
      'Menguasai 6 karakteristik MPI, siklus Input-Proses-Feedback-Coba Lagi, anti-pola desain (animasi berlebih & tanpa aksi), dan langkah pembuatan gim Canva AI.',
    quote: '“Media pembelajaran interaktif bukan sekadar tentang teknologi, tetapi tentang menciptakan pengalaman belajar yang membuat murid aktif, berpikir, dan bahagia dalam belajar.”',
    lessons: [
      {
        id: 'm2-l1',
        moduleId: 2,
        moduleCode: 'MODUL 2',
        lessonNumber: 1,
        globalIndex: 10,
        title: 'Urgensi Media Pembelajaran Interaktif di Era Digital',
        duration: '14 Menit',
        summary: 'Mengubah media biasa yang pasif menuju pembelajaran interaktif, mendalam, dan bermakna.',
        keyPoints: [
          'Teknologi di abad ke-21 bukan pengganti guru, melainkan pendukung pembelajaran mendalam (deep learning).',
          'Papan Interaktif Digital berpotensi besar bila dipadukan dengan pendekatan pedagogis yang tepat.',
          'Pembelajaran bermakna selalu berakar dari keterlibatan aktif pikiran dan rasa ingin tahu murid.'
        ],
        contentParagraphs: [
          'Perangkat teknologi mutakhir seperti Papan Interaktif Digital (Interactive Flat Panel) yang telah dibagikan ke ribuan sekolah dasar berpotensi luar biasa untuk mewujudkan pembelajaran mendalam apabila digunakan dengan pendekatan pedagogis yang tepat.',
          'Jika layar sentuh besar tersebut hanya dipakai untuk menampilkan file PDF atau memutar video seperti televisi biasa, potensi interaktivitasnya akan mubazir. Media Pembelajaran Interaktif (MPI) menjamin setiap murid menjadi pelaku belajar yang aktif.'
        ],
        practicalTip: 'Manfaatkan kemampuan multitouch papan interaktif agar dua murid dapat bekerja sama memecahkan tantangan di layar.',
        reflectionPrompt: 'Seberapa sering perangkat layar interaktif di sekolah Anda digunakan untuk interaksi murid dibanding sekadar tayangan guru?'
      },
      {
        id: 'm2-l2',
        moduleId: 2,
        moduleCode: 'MODUL 2',
        lessonNumber: 2,
        globalIndex: 11,
        title: 'Pengertian & Batasan Media Pembelajaran Interaktif (MPI)',
        duration: '13 Menit',
        summary: 'Bahan ajar digital bertema dengan pola interaksi dua arah, pilihan alur, dan umpan balik atas setiap interaksi.',
        keyPoints: [
          'Murid tidak hanya melihat dan mendengar, tetapi aktif berpikir, mencoba, dan merespons.',
          'Pola interaksi dua arah: murid memilih jawaban, mengklik, atau menentukan cabang alur materi.',
          'Setiap aksi murid memperoleh umpan balik informatif atau korektif dari sistem.'
        ],
        contentParagraphs: [
          'Media Pembelajaran Interaktif (MPI) adalah bahan ajar digital bertema yang memiliki pola interaksi dua arah: murid dapat memilih jawaban, melakukan aktivitas klik/geser, atau menentukan cabang alur yang memengaruhi penyajian materi, serta memperoleh umpan balik atas setiap interaksinya.',
          'Pembeda utama antara MPI dengan media presentasi konvensional adalah adanya kendali pengguna (user control). Pada MPI, jalannya informasi ditentukan oleh keputusan dan input yang diambil oleh murid.'
        ],
        practicalTip: 'Pastikan ada percabangan (branching) sederhana jika murid memilih jawaban yang berbeda agar mereka merasakan dampak pilihannya.',
        reflectionPrompt: 'Bagian mana dari media yang biasa Anda buat yang paling membuat murid merasa memiliki kendali atas belajarnya?'
      },
      {
        id: 'm2-l3',
        moduleId: 2,
        moduleCode: 'MODUL 2',
        lessonNumber: 3,
        globalIndex: 12,
        title: 'Enam Karakteristik Media Pembelajaran Interaktif',
        duration: '15 Menit',
        summary: 'Interaktif, Partisipatif, Umpan Balik, Terarah, Multimedia, dan Bermakna.',
        keyPoints: [
          '1. Interaktif: adanya komunikasi dua arah pengguna dengan media.',
          '2. Partisipatif: mendorong keterlibatan fisik dan mental murid.',
          '3. Umpan Balik: memberi tahu kemajuan belajar dan memperbaiki kesalahan.',
          '4. Terarah: alur eksplorasi jelas disertai instruksi penggunaan.',
          '5. Multimedia: memadukan teks, audio, gambar, animasi, dan video secara harmonis.',
          '6. Bermakna: membantu murid menguasai konsep secara utuh dan mendalam.'
        ],
        contentParagraphs: [
          'Sebuah MPI berkualitas tinggi harus memenuhi 6 pilar karakteristik. Interaktif dan Partisipatif menjamin murid tidak pasif. Umpan Balik memastikan murid tidak dibiarkan dalam ketidaktahuan saat salah melangkah.',
          'Terarah berarti memiliki tombol petunjuk dan peta navigasi yang jelas. Multimedia mengombinasikan elemen sensorik secara seimbang tanpa menimbulkan beban kognitif berlebih, dan Bermakna mengaitkan konsep dengan kehidupan sehari-hari anak.'
        ],
        practicalTip: 'Sertakan tombol "Bantuan / Petunjuk" dengan ikon tanda tanya yang jelas di setiap halaman media.',
        reflectionPrompt: 'Dari 6 karakteristik MPI di atas, mana yang menurut Anda paling menantang untuk diwujudkan dalam pembuatan media?'
      },
      {
        id: 'm2-l4',
        moduleId: 2,
        moduleCode: 'MODUL 2',
        lessonNumber: 4,
        globalIndex: 13,
        title: 'Siklus Prinsip Kerja MPI: Contoh Metamorfosis Katak',
        duration: '16 Menit',
        summary: 'Proses berulang: Input Pengguna -> Proses Sistem -> Umpan Balik -> Coba Lagi -> Hasil Belajar.',
        keyPoints: [
          'Input Pengguna: murid memberi respon (klik, drag, ketik pilihan). Contoh: klik "Berudu Berkaki".',
          'Proses Sistem: sistem memvalidasi input sesuai aturan logis materi.',
          'Umpan Balik: muncul respon suara/teks "Benar! Berudu mulai tumbuh kaki belakang".',
          'Coba Lagi: jika keliru, sistem memberi petunjuk korektif tanpa mencela dan mengarahkan mencoba lagi.',
          'Hasil Belajar: murid menguasai pemahaman bermakna melalui pengalaman langsung.'
        ],
        contentParagraphs: [
          'Prinsip kerja MPI berputar pada siklus yang memberdayakan murid. Pada contoh pembelajaran metamorfosis katak: Murid mengklik gambar fase berudu (Input Pengguna). Sistem memvalidasi apakah urutan tersebut sesuai konsep biologi (Proses Sistem).',
          'Jika benar, muncul suara tepuk tangan dan teks konfirmasi (Umpan Balik). Jika salah, sistem tidak memvonis bodoh, melainkan memberikan petunjuk korektif seperti: "Perhatikan bagian ekor dan kakinya!" lalu memberi kesempatan mencoba kembali (Coba Lagi) hingga murid mencapai Hasil Belajar tuntas.'
        ],
        practicalTip: 'Rancang umpan balik kegagalan yang bersifat membimbing (scaffolding hint), bukan sekadar tanda silang merah mati.',
        reflectionPrompt: 'Bagaimana kata-kata umpan balik di media Anda dapat menumbuhkan semangat pantang menyerah pada murid?'
      },
      {
        id: 'm2-l5',
        moduleId: 2,
        moduleCode: 'MODUL 2',
        lessonNumber: 5,
        globalIndex: 14,
        title: 'Bentuk Interaksi & Contoh Penerapan Muatan Pelajaran',
        duration: '15 Menit',
        summary: 'Drag & Drop, Kuis Interaktif, Video Interaktif, Peta Interaktif, dan Lab Maya.',
        keyPoints: [
          'Drag & Drop: Matematika pengukuran berat (memasangkan timbangan dengan beban).',
          'Video Interaktif: Bahasa Indonesia jenis kata (jeda video untuk kuis pemahaman).',
          'Peta Interaktif: IPS persebaran SDA (klik pulau untuk menjelajahi kekayaan tambang).',
          'Eksplorasi Objek: IPA Tata Surya (klik planet untuk simulasi orbit dan info rotasi).',
          'Timeline Sejarah: Sejarah Proklamasi (klik kronologi peristiwa Rengasdengklok).'
        ],
        contentParagraphs: [
          'Penerapan bentuk interaksi harus disesuaikan dengan karakteristik materi. Untuk IPA Tata Surya, interaksi klik planet memungkinkan murid melihat rotasi 3 dimensi dan jarak relatif orbit secara dinamis.',
          'Untuk IPS, peta persebaran sumber daya alam interaktif memungkinkan murid mengklik kepulauan Nusantara untuk melihat komoditas lokal. Pada Matematika, aktivitas drag and drop memasangkan timbangan melatih pemahaman konsep kesetaraan nilai secara konkret.'
        ],
        practicalTip: 'Pilihlah bentuk interaksi Drag & Drop untuk materi klasifikasi/pengelompokan dan Bentuk Klik Peta untuk topik spasial.',
        reflectionPrompt: 'Materi apa di kelas Anda yang paling cocok diubah menjadi aktivitas drag-and-drop di papan interaktif?'
      },
      {
        id: 'm2-l6',
        moduleId: 2,
        moduleCode: 'MODUL 2',
        lessonNumber: 6,
        globalIndex: 15,
        title: 'Tujuh Prinsip Mendesain Media Pembelajaran Interaktif',
        duration: '14 Menit',
        summary: 'Animasi sederhana, warna kontras, gambar edukatif, materi padat, kuis/game, bahasa sederhana, dan libatkan murid.',
        keyPoints: [
          '1. Tambahkan animasi sederhana: animasi ringan membuat penyampaian materi menyenangkan.',
          '2. Gunakan warna kontras: kontras teks dan latar terjaga; hindari warna neon menyilaukan.',
          '3. Gunakan gambar edukatif yang relevan membantu pemahaman materi.',
          '4. Materi jangan terlalu panjang: sampaikan inti secara padat, ringkas, dan jelas.',
          '5. Berikan kuis atau permainan untuk menantang pemikiran.',
          '6. Gunakan bahasa yang mudah dipahami murid usia SD.',
          '7. Libatkan murid secara aktif: ajak bertanya, memilih, dan berpendapat.'
        ],
        contentParagraphs: [
          'Dalam mendesain media untuk anak SD, keterbacaan adalah nomor satu. Kontras warna antara teks dan latar belakang harus terjaga sesuai standar aksesibilitas; hindari warna neon menyilaukan yang membuat mata lelah.',
          'Materi harus disajikan dalam potongan-potongan kecil (chunking) dengan bahasa lugas dan ramah anak. Gambar yang disematkan harus memiliki nilai edukasi langsung, bukan sekadar dekorasi pemanis ruang kosong.'
        ],
        practicalTip: 'Uji kontras warna: pastikan teks hitam/biru tua di atas latar krem/putih atau teks putih di atas latar biru gelap.',
        reflectionPrompt: 'Apakah media yang pernah Anda buat sudah menggunakan bahasa yang ringkas atau masih berupa paragraf buku yang disalin?'
      },
      {
        id: 'm2-l7',
        moduleId: 2,
        moduleCode: 'MODUL 2',
        lessonNumber: 7,
        globalIndex: 16,
        title: 'Hal-Hal yang Perlu Dihindari (Anti-Pola Desain)',
        duration: '13 Menit',
        summary: 'Hindari: animasi berlebih, fokus tampilan semata, media hanya jadi tontonan, tanpa aktivitas murid, dan tanpa feedback.',
        keyPoints: [
          'Terlalu banyak animasi: animasi berlebihan mengalihkan perhatian dari tujuan belajar.',
          'Fokus pada tampilan: visual glamor belum tentu membantu murid paham konsep.',
          'Media hanya menjadi tontonan: murid menonton pasif tanpa berpikir kritis.',
          'Tidak ada aktivitas murid: tidak ada ruang latihan atau pemecahan masalah.',
          'Tidak ada feedback: murid tidak tahu apakah responnya benar atau keliru.'
        ],
        contentParagraphs: [
          'Bimtek SD 2026 menegaskan peringatan penting: "Interaktif bukan berarti banyak animasi!" Animasi yang terlalu heboh justru membebani memori kerja (cognitive load) anak sehingga esensi konsep ilmiahnya malah terlewatkan.',
          'Dosa terbesar dalam pembuatan media interaktif adalah meniadakan umpan balik. Jika murid mengklik opsi dan media diam saja atau langsung pindah slide tanpa penjelasan, murid kehilangan kesempatan belajar dari kekeliruannya.'
        ],
        practicalTip: 'Setiap kali membuat tombol aksi, pastikan ada efek suara lembut atau teks tanggapan yang menyertainya.',
        reflectionPrompt: 'Pernahkah Anda melihat media yang sangat bagus grafisnya tetapi membingungkan cara memainkannya? Apa yang salah?'
      },
      {
        id: 'm2-l8',
        moduleId: 2,
        moduleCode: 'MODUL 2',
        lessonNumber: 8,
        globalIndex: 17,
        title: 'Tahapan Pengembangan Media Pembelajaran Interaktif',
        duration: '15 Menit',
        summary: 'Analisis Kebutuhan -> Perancangan Alur (Flowchart) -> Pembuatan Aset -> Integrasi Interaksi -> Uji Coba.',
        keyPoints: [
          'Tahap 1: Analisis kebutuhan belajar murid dan karakteristik Capaian Pembelajaran.',
          'Tahap 2: Merumuskan Tujuan Pembelajaran dan membuat alur alur media (flowchart/storyboard).',
          'Tahap 3: Menyiapkan aset multimedia (teks inti, gambar vektor, audio umpan balik).',
          'Tahap 4: Mengintegrasikan tombol navigasi, variabel skor, dan logika percabangan.',
          'Tahap 5: Uji coba teknis di layar papan interaktif sebelum dipakai mengajar di kelas.'
        ],
        contentParagraphs: [
          'Membuat media pembelajaran interaktif membutuhkan alur terstruktur. Jangan langsung membuka software tanpa konsep! Mulailah dengan membuat sketsa alur (flowchart) di kertas: halaman awal -> halaman materi -> aktivitas tantangan -> umpan balik -> evaluasi skor.',
          'Setelah alur jelas, barulah aset teks dan gambar dirangkai. Uji coba mandiri sangat krusial untuk memastikan tidak ada tautan tombol yang mati (broken link) atau respon yang macet saat ditekan oleh jari anak.'
        ],
        practicalTip: 'Gambarkan diagram kotak alur di buku catatan Anda sebelum mulai mendesain di aplikasi komputer.',
        reflectionPrompt: 'Tahap pengembangan mana yang paling sering Anda lewati saat terburu-buru menyiapkan media mengajar?'
      },
      {
        id: 'm2-l9',
        moduleId: 2,
        moduleCode: 'MODUL 2',
        lessonNumber: 9,
        globalIndex: 18,
        title: 'Pembuatan Gim Interaktif Menggunakan Canva AI',
        duration: '17 Menit',
        summary: 'Langkah praktis Canva AI Mode Kode: formula prompt terstruktur, komponen wajib MPI, dan pengujian tombol.',
        keyPoints: [
          'Media yang baik memuat: Tujuan Pembelajaran, Panduan Penggunaan, Materi Inti, Aktivitas Interaktif, dan Evaluasi/Umpan Balik.',
          'Prinsip Utama: "Prompt menentukan kualitas hasil!"',
          'Langkah Canva AI: Buka Canva -> pilih Canva AI -> Mode Kode -> ketik prompt spesifik -> sesuaikan kode -> publikasikan.',
          'Uji seluruh tombol navigasi dan respon skor sebelum dibagikan ke murid.'
        ],
        contentParagraphs: [
          'Perkembangan kecerdasan artifisial kini memungkinkan guru SD membuat media interaktif tanpa harus menjadi programmer handal. Fitur Canva AI Mode Kode memungkinkan guru mengetik instruksi (prompt) dalam bahasa Indonesia yang terstruktur.',
          'Formula prompt yang efektif harus mencantumkan: topik pelajaran, sasaran kelas SD, mekanisme interaksi (misalnya kuis seret gambar), aturan skor, dan umpan balik saat benar/salah. Canva AI akan menyusun kode interaktif yang siap dijalankan di browser.'
        ],
        practicalTip: 'Gunakan struktur prompt: [Peran] + [Materi & Kelas] + [Aturan Main & Tombol] + [Pesan Umpan Balik Benar/Salah].',
        reflectionPrompt: 'Ide gim edukasi apa yang ingin segera Anda wujudkan menggunakan bantuan Canva AI?'
      },
      {
        id: 'm2-l10',
        moduleId: 2,
        moduleCode: 'MODUL 2',
        lessonNumber: 10,
        globalIndex: 19,
        title: 'Praktik & Refleksi Implementasi MPI di Sekolah',
        duration: '14 Menit',
        summary: 'Menyusun lembar kerja perancangan MPI, simulasi di kelas, dan komitmen menciptakan pembelajaran bermakna.',
        keyPoints: [
          'Melengkapi LK Perancangan: Identitas, Mapel, Kelas, TP, Alur Flowchart, Prompt, dan Hasil Media.',
          'Mempresentasikan hasil karya kepada rekan sejawat untuk mendapatkan masukan pedagogis.',
          'Langkah kecil segera: mencoba 1 media interaktif sederhana pada topik materi minggu depan.',
          'Teknologi adalah sarana, tetapi hati dan dedikasi guru adalah penentu kebahagiaan belajar murid.'
        ],
        contentParagraphs: [
          'Pada sesi akhir Modul 2, peserta Bimtek menyusun Lembar Kerja Pembuatan MPI secara mandiri. Karya yang dibuat diuji kelayakan interaksinya dan dipresentasikan di hadapan fasilitator serta rekan sejawat.',
          'Refleksi pamungkas mengingatkan kita: Media pembelajaran interaktif bukan sekadar tentang teknologi canggih, melainkan tentang menciptakan lingkungan belajar yang aman, menyenangkan, dan memantik potensi terbaik setiap anak Indonesia.'
        ],
        practicalTip: 'Mulai dari yang sederhana: buat satu kuis interaktif 5 soal untuk materi IPA atau Matematika minggu ini.',
        reflectionPrompt: 'Apa langkah kecil konkret yang akan Bapak/Ibu lakukan besok pagi di sekolah terkait media interaktif?'
      }
    ],
    quiz: [
      {
        id: 201,
        moduleId: 2,
        moduleRef: 'Modul 2 · Karakteristik MPI',
        question: 'Manakah pernyataan yang paling tepat mendeskripsikan karakteristik esensial dari Media Pembelajaran Interaktif (MPI)?',
        options: [
          'Media yang memiliki animasi 3D sebanyak mungkin agar murid terpesona meskipun tidak ada tombol interaksi.',
          'Bahan ajar bertema dengan pola interaksi dua arah di mana tindakan pengguna memengaruhi penyajian materi dan memperoleh umpan balik.',
          'Dokumen modul cetak hitam putih yang dibagikan kepada setiap siswa untuk dikerjakan secara hening.',
          'Video ceramah guru selama 60 menit penuh yang tidak dapat dijeda atau diulang oleh murid.'
        ],
        correctIndex: 1,
        explanation: 'Karakteristik esensial MPI adalah interaksi dua arah: tindakan murid memengaruhi materi dan menghasilkan umpan balik bermakna.'
      },
      {
        id: 202,
        moduleId: 2,
        moduleRef: 'Modul 2 · Prinsip Kerja',
        question: 'Pada siklus prinsip kerja MPI (contoh: metamorfosis katak), apa yang seharusnya terjadi jika murid memilih jawaban yang keliru?',
        options: [
          'Sistem langsung mematikan aplikasi dan memberikan nilai nol tanpa kesempatan mengulang.',
          'Sistem mengeluarkan suara klakson keras dan membagikan nama murid ke media sosial sekolah.',
          'Sistem memberikan petunjuk korektif yang mendidik dan mengarahkan murid untuk mencoba kembali (Coba Lagi).',
          'Sistem otomatis melompat ke bab berikutnya tanpa memedulikan pemahaman murid.'
        ],
        correctIndex: 2,
        explanation: 'Siklus MPI memuat tahapan Coba Lagi di mana murid memperoleh umpan balik petunjuk korektif untuk memperbaiki hasil belajarnya.'
      },
      {
        id: 203,
        moduleId: 2,
        moduleRef: 'Modul 2 · Prinsip Desain',
        question: 'Berikut ini adalah hal-hal yang DIANJURKAN dalam mendesain media pembelajaran interaktif ramah anak SD, KECUALI...',
        options: [
          'Menggunakan warna kontras teks dan latar yang terjaga serta mudah dibaca.',
          'Menyampaikan inti materi secara padat, ringkas, dan jelas (tidak terlalu panjang).',
          'Menyisipkan animasi berlebihan dan warna neon menyilaukan di seluruh sudut layar.',
          'Melibatkan murid secara aktif melalui kuis, permainan, atau pemilihan alur eksplorasi.'
        ],
        correctIndex: 2,
        explanation: 'Animasi berlebihan dan warna neon menyilaukan adalah hal yang HARUS DIHINDARI karena mengalihkan fokus dari tujuan pembelajaran.'
      },
      {
        id: 204,
        moduleId: 2,
        moduleRef: 'Modul 2 · Canva AI',
        question: 'Prinsip utama yang paling menentukan keberhasilan dan kualitas media interaktif yang dibuat melalui Canva AI adalah...',
        options: [
          '"Kecepatan internet menentukan segalanya."',
          '"Prompt menentukan kualitas hasil."',
          '"Semakin banyak slide, semakin pintar muridnya."',
          '"Cukup gunakan satu kata tanpa instruksi detail."'
        ],
        correctIndex: 1,
        explanation: 'Sesuai panduan Bimtek SD 2026: "Prompt menentukan kualitas hasil". Instruksi yang jelas, terstruktur, dan spesifik menghasilkan media interaktif yang akurat.'
      },
      {
        id: 205,
        moduleId: 2,
        moduleRef: 'Modul 2 · Komponen Wajib',
        question: 'Sebuah Media Pembelajaran Interaktif yang baik wajib memuat lima komponen utama, yaitu...',
        options: [
          'Logo sponsor, biodata keluarga guru, daftar harga barang, nomor telepon, dan iklan.',
          'Tujuan pembelajaran, panduan penggunaan, materi inti, aktivitas interaktif, dan evaluasi/umpan balik.',
          'Kata pengantar 10 halaman, daftar riwayat hidup, daftar pustaka, tabel indeks, dan glosarium asing.',
          'Kamera pengawas, sensor sidik jari, barcode pembayaran, tiket masuk, dan struk belanja.'
        ],
        correctIndex: 1,
        explanation: 'Lima komponen wajib MPI: Tujuan Pembelajaran, Panduan Penggunaan, Materi Inti, Aktivitas Interaktif, dan Evaluasi/Umpan Balik.'
      }
    ]
  },
  {
    id: 3,
    code: 'MODUL 3',
    bimtekTitle: 'Bimtek Daerah Digitalisasi Pembelajaran SD 2026',
    title: 'Inspirasi Asesmen Berbasis Digital',
    subtitle: 'Backward Design, paradigma "Bisa Apa?", Formatif vs Sumatif, dan ragam platform digital',
    accentColor: 'lime',
    description:
      'Memahami Backward Design (analogi destinasi liburan), pergeseran "Nilai Berapa ke Bisa Apa", Permendikbud No. 21/2022, As/For/Of Learning, dan platform asesmen.',
    quote: '“Asesmen terbaik bukan tentang kecanggihannya, tetapi tentang seberapa besar ia membantu murid bertumbuh dalam belajar dan mencapai tujuan pembelajaran.”',
    lessons: [
      {
        id: 'm3-l1',
        moduleId: 3,
        moduleCode: 'MODUL 3',
        lessonNumber: 1,
        globalIndex: 20,
        title: 'Refleksi Perencanaan: Forward vs Backward Design',
        duration: '14 Menit',
        summary: 'Menghindari jebakan "cari kegiatan dulu" dengan menerapkan alur mundur Understanding by Design (UbD).',
        keyPoints: [
          'Forward Design sering membuat soal asesmen meleset dan tidak selaras dengan tujuan.',
          'Backward Design: memikirkan hasil akhir (bukti ketercapaian) terlebih dahulu.',
          'Tahapan: (1) Apa yang ingin dicapai? -> (2) Apa bukti bahwa murid sudah mencapainya? -> (3) Kegiatan apa yang dirancang untuk memperoleh bukti tersebut?'
        ],
        contentParagraphs: [
          'Saat merancang pembelajaran, guru kerap terjebak pada alur maju: Tujuan -> Kegiatan seru -> Asesmen. Sering kali saat tiba di tahap penyusunan soal, guru menyadari soalnya tidak sesuai target atau kegiatannya melenceng, sehingga harus merevisi ulang rencana di tengah jalan.',
          'Pendekatan Backward Design (Understanding by Design) mengajak kita berpikir dari hasil akhir. Pertama: rumuskan Tujuan Pembelajaran. Kedua: tentukan Asesmen bukti belajar (bukti apa yang menunjukkan anak sudah paham?). Ketiga: baru rancang Kegiatan Pembelajaran dan medianya.'
        ],
        practicalTip: 'Tuliskan bentuk asesmen dan rubriknya sebelum Anda memilih lembar kerja atau gim digital untuk kelas.',
        reflectionPrompt: 'Dalam kebiasaan mengajar Bapak/Ibu, apakah asesmen dirancang sebelum atau sesudah menyusun lembar aktivitas?'
      },
      {
        id: 'm3-l2',
        moduleId: 3,
        moduleCode: 'MODUL 3',
        lessonNumber: 2,
        globalIndex: 21,
        title: 'Analogi Destinasi Liburan dalam Asesmen Pembelajaran',
        duration: '13 Menit',
        summary: 'Tujuan (Destinasi), Asesmen (Bukti Foto di Lokasi), dan Kegiatan Belajar (Kendaraan Perjalanan).',
        keyPoints: [
          'Tujuan Pembelajaran = Destinasi Liburan (Murid harus paham apa di akhir nanti?).',
          'Asesmen = Hasil Foto di Lokasi (Apa buktinya kalau murid sudah benar-benar sampai di tujuan?).',
          'Kegiatan Pembelajaran = Kendaraan (Langkah metode dan aplikasi apa yang mengantar murid ke sana?).',
          'Contoh konkret: TP membandingkan pecahan -> Asesmen rubrik kinerja unjuk kerja -> Kegiatan praktik kue pecahan.'
        ],
        contentParagraphs: [
          'Untuk mempermudah pemahaman Backward Design, Bimtek SD 2026 menggunakan analogi liburan. Bayangkan Anda mendapat tiket liburan gratis. Yang pertama dipikirkan adalah tujuannya (misalnya Pantai Kuta), bukan kendaraannya.',
          'Tujuan Pembelajaran adalah Destinasi. Asesmen adalah Bukti Foto di Lokasi (bukti autentik bahwa anak sudah tiba di tujuan). Kegiatan dan Media Digital adalah Kendaraannya. Jangan sampai kendaraannya sangat mewah tetapi justru mengantar murid ke tempat yang salah!'
        ],
        practicalTip: 'Gunakan analogi ini saat berdiskusi di Komunitas Belajar (Kombel) sekolah untuk menyelaraskan RPP guru paralel.',
        reflectionPrompt: 'Apakah bukti asesmen yang biasa Anda tagih ke murid sudah seperti "foto di lokasi tujuan" atau baru foto di terminal?'
      },
      {
        id: 'm3-l3',
        moduleId: 3,
        moduleCode: 'MODUL 3',
        lessonNumber: 3,
        globalIndex: 22,
        title: 'Membangun Pemahaman Bermakna (Enduring Understanding)',
        duration: '14 Menit',
        summary: 'Mengonstruksi pemahaman penting yang tetap diingat dan dibawa murid seumur hidupnya.',
        keyPoints: [
          'Backward Design bertujuan mengonstruksi pemahaman esensial, bukan sekadar menuntaskan hafalan bab materi.',
          'Enduring Understanding adalah pemahaman yang tetap dibawa murid dan dapat diterapkan dalam kehidupan nyata.',
          'Contoh: bukan sekadar hafal nama organ lambung, tapi paham bahwa kesehatan organ perlu dijaga melalui pilihan gizi harian.'
        ],
        contentParagraphs: [
          'Pernahkah Anda bertanya: "Setelah ujian selesai dan libur semester lewat, apa yang masih tertinggal di kepala murid kita?" Jika yang diajarkan hanya hafalan definisi untuk ulangan, semuanya akan lenyap begitu saja.',
          'Enduring Understanding adalah ide besar yang bertahan seumur hidup. Misalnya pada materi organ pencernaan: murid memahami bahwa setiap organ bekerja saling berkaitan dan kesehatan tubuh bergantung pada komitmen memilih makanan sehat sehari-hari.'
        ],
        practicalTip: 'Rumuskan satu kalimat hikmah kehidupan (Big Idea) di setiap modul ajar yang Anda susun.',
        reflectionPrompt: 'Konsep apa dari mata pelajaran Anda yang paling ingin Anda lihat terus dipraktikkan murid hingga mereka dewasa?'
      },
      {
        id: 'm3-l4',
        moduleId: 3,
        moduleCode: 'MODUL 3',
        lessonNumber: 4,
        globalIndex: 23,
        title: 'Pergeseran Paradigma: "Bisa Apa?" dan "Create Expert"',
        duration: '15 Menit',
        summary: 'Beralih dari "Nilai Berapa?" ke "Bisa Apa?", serta dari "To Rank" (membuat peringkat) ke "Create Expert" (membuat ahli).',
        keyPoints: [
          'Alih-alih bertanya "Nilai Berapa?", mari kuatkan pertanyaan: "Murid sudah Bisa Apa?".',
          'Alih-alih "To Rank" (mengurutkan peringkat juara kelas), mari kuatkan "Create Expert" (menjadikan setiap murid mahir).',
          'Asesmen bukan alat seleksi untuk menghukum anak, melainkan alat bantu agar anak bertumbuh.'
        ],
        contentParagraphs: [
          'Pendidikan Indonesia mengalami pergeseran paradigma asesmen yang mendasar. Pola lama selalu terobsesi dengan angka: "Anak ini dapat nilai berapa di rapor?". Akibatnya terjadi kompetisi ranking semu yang mengabaikan keterampilan hidup.',
          'Paradigma baru menanyakan: "Setelah belajar topik ini, murid sudah bisa apa?". Tugas guru bukan memilah-milah peringkat anak (To Rank), melainkan membimbing setiap anak mencapai potensi terbaiknya hingga mereka menjadi ahli di bidangnya masing-masing (Create Expert).'
        ],
        practicalTip: 'Ganti budaya memanggil peringkat 1-3 saat pembagian rapor dengan mengapresiasi keunggulan unik setiap anak di kelas.',
        reflectionPrompt: 'Bagaimana perasaan murid di kelas Anda yang biasanya mendapat nilai rendah saat cara pandang "Bisa Apa?" diterapkan?'
      },
      {
        id: 'm3-l5',
        moduleId: 3,
        moduleCode: 'MODUL 3',
        lessonNumber: 5,
        globalIndex: 24,
        title: 'Konsep Dasar Asesmen & Tiga Prinsip Penilaian',
        duration: '15 Menit',
        summary: 'Permendikbud No. 21 Tahun 2022: Tiga prinsip utama Berkeadilan, Edukatif, dan Objektif.',
        keyPoints: [
          'Asesmen adalah proses pengumpulan dan pengolahan informasi untuk mengetahui kebutuhan belajar dan capaian murid.',
          '1. Berkeadilan: penilaian tidak bias oleh latar belakang sosioekonomi, agama, suku, gender, atau kebutuhan khusus.',
          '2. Edukatif: hasil penilaian digunakan sebagai umpan balik untuk memotivasi dan memperbaiki proses belajar murid.',
          '3. Objektif: didasarkan pada informasi faktual atas pencapaian bukti nyata perkembangan murid.'
        ],
        contentParagraphs: [
          'Berdasarkan Permendikbud No. 21 Tahun 2022 tentang Standar Penilaian Pendidikan, asesmen didefinisikan sebagai proses pengumpulan dan pengolahan informasi komprehensif untuk mengetahui kebutuhan belajar serta hasil belajar murid.',
          'Ada 3 prinsip yang mengikat seluruh pendidik: Berkeadilan (tidak membeda-bedakan latar belakang murid), Edukatif (hasilnya memicu semangat belajar baru, bukan membuat putus asa), dan Objektif (didasarkan pada rubrik dan bukti kinerja autentik).'
        ],
        practicalTip: 'Gunakan rubrik penilaian berjenjang yang dibagikan kepada murid sebelum mereka mulai mengerjakan tugas.',
        reflectionPrompt: 'Apakah penilaian yang Anda lakukan selama ini sudah bebas dari bias kedekatan pribadi dengan murid atau orang tuanya?'
      },
      {
        id: 'm3-l6',
        moduleId: 3,
        moduleCode: 'MODUL 3',
        lessonNumber: 6,
        globalIndex: 25,
        title: 'Membedah Asesmen Formatif vs Sumatif',
        duration: '16 Menit',
        summary: 'Formatif (Rambu Perjalanan) memantau proses vs Sumatif (Akhir Tujuan) menilai ketercapaian akhir.',
        keyPoints: [
          'Asesmen Formatif: dilakukan selama proses belajar (sebelum, saat, sesudah) untuk memperbaiki strategi mengajar.',
          'Asesmen Sumatif: dilakukan di akhir lingkup materi atau akhir semester untuk mengukur ketercapaian akhir tujuan.',
          'Analogi mudah: Formatif = Rambu Penunjuk Arah selama perjalanan; Sumatif = Garis Akhir Kedatangan.',
          'Contoh formatif: tanya jawab, observasi, exit ticket, kuis singkat. Contoh sumatif: ujian praktik, projek akhir, ulangan bab.'
        ],
        contentParagraphs: [
          'Bimtek SD 2026 memberikan analogi yang sangat jernih: Asesmen formatif ibarat rambu-rambu di sepanjang jalan tol yang memberi tahu pengemudi jika salah lajur atau bensin menipis, agar pengemudi bisa segera membetulkan jalurnya.',
          'Sedangkan asesmen sumatif adalah pengecekan saat kendaraan sudah sampai di kota tujuan. Di kelas merdeka belajar, proporsi asesmen formatif harus diperbanyak agar kesalahan belajar anak dapat diperbaiki sejak dini sebelum ujian akhir tiba.'
        ],
        practicalTip: 'Terapkan Exit Ticket 1 pertanyaan di selembar kertas kecil atau form digital 5 menit sebelum kelas berakhir.',
        reflectionPrompt: 'Berapa persen waktu mengajar Anda yang dialokasikan untuk asesmen formatif dibanding hanya menunggu ulangan akhir?'
      },
      {
        id: 'm3-l7',
        moduleId: 3,
        moduleCode: 'MODUL 3',
        lessonNumber: 7,
        globalIndex: 26,
        title: 'Tiga Fungsi Asesmen: As, For, dan Of Learning',
        duration: '15 Menit',
        summary: 'Assessment as Learning (refleksi diri), for Learning (perbaikan mengajar), dan of Learning (evaluasi sumatif).',
        keyPoints: [
          'Assessment as Learning: murid aktif merefleksikan proses belajarnya sendiri (self-assessment, peer assessment, jurnal reflektif).',
          'Assessment for Learning: umpan balik bagi guru untuk mendiagnosis kesulitan dan memodifikasi strategi mengajar.',
          'Assessment of Learning: pembuktian capaian di akhir proses pembelajaran (tes sumatif, laporan nilai rapor).'
        ],
        contentParagraphs: [
          'Asesmen memiliki 3 fungsi strategis: Assessment as Learning melibatkan murid sebagai subjek penilaian mandiri. Mereka menilai karyanya sendiri dan teman sejawat berdasarkan kriteria yang disepakati, melatih metakognisi.',
          'Assessment for Learning digunakan guru untuk melihat bagian mana dari penjelasannya yang belum dipahami murid, sehingga guru bisa mengubah metode di pertemuan berikutnya. Assessment of Learning adalah evaluasi resmi untuk pelaporan hasil belajar kepada orang tua.'
        ],
        practicalTip: 'Ajak murid mengisi checklist 3 butir: "Hal yang sudah saya pahami", "Hal yang masih bingung", dan "Bantuan yang saya butuhkan".',
        reflectionPrompt: 'Apakah murid di kelas Anda sudah pernah dilatih untuk menilai karyanya sendiri secara jujur?'
      },
      {
        id: 'm3-l8',
        moduleId: 3,
        moduleCode: 'MODUL 3',
        lessonNumber: 8,
        globalIndex: 27,
        title: 'Ragam Teknik Asesmen Konvensional & Otentik',
        duration: '15 Menit',
        summary: 'Observasi, Lisan, Kinerja, Tes Tertulis, Penugasan, Portofolio, Penilaian Diri, dan Projek.',
        keyPoints: [
          'Observasi: mengamati perilaku atau keterampilan murid secara langsung dengan lembar checklist.',
          'Kinerja: menilai kemampuan melakukan tugas nyata (praktik wudhu, presentasi, percobaan sains).',
          'Portofolio: kumpulan karya terbaik murid dalam kurun waktu tertentu yang menunjukkan grafik perkembangan.',
          'Projek: serangkaian aktivitas terencana lintas mata pelajaran yang menghasilkan karya nyata kontekstual.'
        ],
        contentParagraphs: [
          'Teknik asesmen tidak boleh terbatas pada soal pilihan ganda di atas kertas. Kemampuan murid SD sangat beragam; ada anak yang lemah dalam tes tertulis namun sangat mahir saat unjuk kerja (kinerja) atau presentasi lisan.',
          'Portofolio map karya anak merupakan salah satu teknik paling otentik karena memperlihatkan perjalanan transformasi murid dari gambar pertama yang masih kaku hingga lukisan akhir yang penuh detail.'
        ],
        practicalTip: 'Sediakan map folder portofolio untuk setiap murid guna mendokumentasikan karya terbaik mereka sepanjang semester.',
        reflectionPrompt: 'Teknik asesmen mana di luar tes tertulis yang paling memberikan informasi kaya tentang bakat murid Anda?'
      },
      {
        id: 'm3-l9',
        moduleId: 3,
        moduleCode: 'MODUL 3',
        lessonNumber: 9,
        globalIndex: 28,
        title: 'Integrasi Asesmen Konvensional vs Asesmen Digital',
        duration: '14 Menit',
        summary: '"Konvensional bukan berarti ketinggalan zaman." Gunakan sesuai tujuan, fungsi, dan kondisi kelas.',
        keyPoints: [
          'Asesmen konvensional (kertas tempel, jurnal observasi guru, wawancara lisan) tetap sangat bernilai tinggi.',
          'Asesmen digital unggul dalam: koreksi otomatis, pengolahan data cepat, dan visualisasi grafik capaian seketika.',
          'Keduanya saling melengkapi; pilih media penilaian berdasarkan efisiensi dan relevansi tujuan belajar.'
        ],
        contentParagraphs: [
          'Muncul kesalahpahaman bahwa setelah era digital, asesmen kertas dan wawancara tatap muka harus dibuang. Bimtek SD 2026 menegaskan: "Konvensional bukan berarti ketinggalan zaman! Pakai sesuai tujuan dan fungsinya".',
          'Catatan anekdotal di buku saku guru saat mengamati kejujuran murid saat bermain di lapangan tidak dapat digantikan oleh Google Form. Namun untuk kuis harian 10 soal, asesmen digital sangat menghemat waktu koreksi guru sehingga analisis nilai langsung tersedia.'
        ],
        practicalTip: 'Kombinasikan tes formatif digital untuk konsep cepat dan rubrik observasi non-digital untuk sikap dan kolaborasi.',
        reflectionPrompt: 'Kapan saat paling tepat menggunakan penilaian non-digital dibandingkan platform digital di sekolah Anda?'
      },
      {
        id: 'm3-l10',
        moduleId: 3,
        moduleCode: 'MODUL 3',
        lessonNumber: 10,
        globalIndex: 29,
        title: 'Inspirasi Platform Asesmen Digital & Refleksi Akhir',
        duration: '16 Menit',
        summary: 'Wayground, Google Form, Kahoot, Wordwall, Ruang Murid, dan komitmen evaluasi bermakna.',
        keyPoints: [
          'Platform Asesmen Digital Populer: Wayground, Google Form, Kahoot, Wordwall, dan rumah.pendidikan.go.id.',
          'Keunggulan platform: fitur gamifikasi, analisis butir soal otomatis, dan rekap spreadsheet real-time.',
          'Pesan Penutup: "Asesmen terbaik bukan tentang kecanggihannya, tetapi tentang seberapa besar ia membantu murid bertumbuh dalam belajar dan mencapai tujuan pembelajaran."'
        ],
        contentParagraphs: [
          'Bimtek merekomendasikan berbagai platform asesmen digital yang ramah anak. Google Form unggul untuk survei refleksi dan kuis tertata rapi di Google Drive. Kahoot dan Wayground menghadirkan atmosfer kompetisi ceria yang memicu antusiasme kelas.',
          'Refleksi penutup: Asesmen bukanlah garis finis yang menakutkan, melainkan lentera yang menerangi langkah murid dan guru agar proses belajar selanjutnya menjadi lebih terarah, adil, dan membahagiakan.'
        ],
        practicalTip: 'Unduh hasil rekap nilai kuis digital ke format spreadsheet agar mudah dianalisis kompetensi mana yang perlu remedial.',
        reflectionPrompt: 'Apa satu komitmen perubahan terbesar yang akan Anda lakukan dalam merancang asesmen setelah menuntaskan materi ini?'
      }
    ],
    quiz: [
      {
        id: 301,
        moduleId: 3,
        moduleRef: 'Modul 3 · Backward Design',
        question: 'Dalam pendekatan Backward Design (Understanding by Design / UbD), urutan perancangan pembelajaran yang benar adalah...',
        options: [
          'Mencari game seru dulu -> Menentukan jam istirahat -> Menulis tujuan pembelajaran.',
          'Menentukan Tujuan Pembelajaran -> Menentukan Asesmen Bukti Ketercapaian -> Merancang Kegiatan Pembelajaran.',
          'Menyusun soal ulangan akhir semester -> Mencetak rapor -> Mengajar seadanya.',
          'Menentukan kegiatan pembelajaran -> Mencari buku paket -> Menulis soal kuis.'
        ],
        correctIndex: 1,
        explanation: 'Backward Design dimulai dari hasil akhir yang diinginkan: (1) Tujuan Pembelajaran, (2) Bukti asesmen ketercapaian, lalu (3) Kegiatan belajar dan medianya.'
      },
      {
        id: 302,
        moduleId: 3,
        moduleRef: 'Modul 3 · Analogi Konsep',
        question: 'Pada analogi Destinasi Liburan dalam perencanaan asesmen, posisi "Hasil Foto di Lokasi Wisata" melambangkan...',
        options: [
          'Tujuan Pembelajaran yang ingin dicapai.',
          'Kendaraan atau aplikasi teknologi yang digunakan di jalan.',
          'Asesmen sebagai bukti nyata bahwa murid sudah benar-benar sampai di tujuan pemahaman.',
          'Daftar oleh-oleh yang dibeli di toko cinderamata.'
        ],
        correctIndex: 2,
        explanation: 'Foto di lokasi wisata melambangkan Asesmen, yaitu bukti konkret tak terbantahkan bahwa murid telah sampai di tempat tujuan (menguasai kompetensi).'
      },
      {
        id: 303,
        moduleId: 3,
        moduleRef: 'Modul 3 · Paradigma Asesmen',
        question: 'Salah satu pergeseran paradigma asesmen yang ditekankan dalam materi Bimtek SD 2026 adalah...',
        options: [
          'Bergeser dari pertanyaan "Bisa Apa?" menjadi sekadar mengejar "Nilai Berapa?".',
          'Bergeser dari orientasi "To Rank" (membuat peringkat) menuju orientasi "Create Expert" (membuat murid ahli di potensinya).',
          'Menghapuskan seluruh kegiatan belajar dan hanya melakukan ujian setiap hari.',
          'Memastikan hanya anak dari keluarga mampu yang boleh mendapatkan nilai tinggi.'
        ],
        correctIndex: 1,
        explanation: 'Paradigma baru memperjuangkan pergeseran dari sekadar "To Rank" (membuat peringkat kompetitif) menjadi "Create Expert" (membimbing setiap anak mahir di potensinya).'
      },
      {
        id: 304,
        moduleId: 3,
        moduleRef: 'Modul 3 · Formatif vs Sumatif',
        question: 'Asesmen yang berfungsi sebagai "rambu perjalanan" untuk memantau proses belajar dan memperbaiki strategi mengajar guru disebut...',
        options: [
          'Asesmen Sumatif Akhir Jenjang.',
          'Asesmen Formatif (Assessment for and as Learning).',
          'Ujian Seleksi Masuk SMP.',
          'Audit Keuangan Bantuan Operasional Sekolah (BOS).'
        ],
        correctIndex: 1,
        explanation: 'Asesmen formatif bertindak sebagai rambu perjalanan selama proses belajar untuk memantau kemajuan dan memperbaiki strategi belajar secara berkelanjutan.'
      },
      {
        id: 305,
        moduleId: 3,
        moduleRef: 'Modul 3 · Konvensional vs Digital',
        question: 'Pernyataan paling bijak mengenai integrasi asesmen konvensional (non-digital) dan asesmen digital di sekolah dasar adalah...',
        options: [
          'Asesmen konvensional harus dimusnahkan karena dianggap terbelakang dan kuno.',
          'Konvensional bukan berarti ketinggalan zaman; gunakan teknik asesmen sesuai tujuan, fungsi, dan kondisi nyata murid.',
          'Asesmen digital wajib diterapkan 100% meskipun di sekolah pelosok yang tidak ada aliran listrik.',
          'Guru dilarang menggunakan Google Form atau Wordwall karena merusak tulisan tangan murid.'
        ],
        correctIndex: 1,
        explanation: 'Konvensional bukan berarti ketinggalan zaman. Guru memadukan asesmen non-digital dan digital secara harmonis sesuai fungsi dan konteks kelas.'
      }
    ]
  }
];

export const ALL_LESSONS: LessonItem[] = LMS_MODULES.flatMap((m) => m.lessons);

export const ALL_QUIZZES: QuizQuestion[] = LMS_MODULES.flatMap((m) => m.quiz);
