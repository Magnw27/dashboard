import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export function AboutProfile({ onNavigate }) {
  const items = [
    ['Age', '14 years old'],
    ['School', 'SMP NEGERI 2 KOTA KEDIRI'],
    ['Started', 'Technology since 6th grade'],
    ['Focus', 'Programming & AI Engineering'],
  ];

  return (
    <section className="profile-section shell" id="about" aria-labelledby="profile-title">
      <motion.div
        className="profile-intro"
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.85, ease }}
      >
        <p className="eyebrow"><span /> ABOUT THE DEVELOPER</p>
        <h2 id="profile-title">Curious by nature.<br /><em>Builder by choice.</em></h2>
      </motion.div>

      <div className="profile-grid">
        <motion.div className="profile-story glass-panel" initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.8, ease }}>
          <div className="profile-number">02 — 04</div>
          <p>
            Saya adalah <strong>Muhammad Arif Wicaksono</strong>, seorang developer pemula yang senang mengubah rasa penasaran menjadi karya nyata. Saya mengembangkan <strong>WickAI</strong>, bereksperimen dengan model AI, dan membangun website portofolio ini sebagai ruang untuk mendokumentasikan proses belajar, eksperimen, dan proyek-proyek yang terus saya kembangkan.
          </p>
          <p>
            Ketertarikan saya pada teknologi, terutama <strong>programming dan AI engineering</strong>, tumbuh sejak kelas 6 SD. Sejak saat itu saya terus belajar melalui praktik, mencoba teknologi baru, memahami cara kerja software, dan mengeksplorasi bagaimana AI dapat digunakan untuk menciptakan sesuatu yang bermanfaat.
          </p>
          <button className="text-link" type="button" onClick={() => onNavigate('projects')}>Lihat proyek saya <span>↗</span></button>
        </motion.div>

        <motion.div className="profile-facts" initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.8, delay: 0.08, ease }}>
          {items.map(([label, value], index) => (
            <motion.div key={label} className="fact-row" whileHover={{ x: 5 }} transition={{ duration: 0.28, ease }}>
              <span>{label}</span><strong>{value}</strong><small>0{index + 1}</small>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
