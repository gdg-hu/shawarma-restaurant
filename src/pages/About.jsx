import './StaticPages.css';

export default function About() {
  return (
    <div className="static-page">
      <div className="certificate">
        <div className="cert-header">
          <div className="cert-seal">🏛️</div>
          <div className="cert-title-block">
            <div className="cert-title">شهادة فحص صحي</div>
            <div className="cert-subtitle">Health Inspection Certificate</div>
            <div className="cert-num">رقم: #SHA-2025-ABU</div>
          </div>
          <div className="cert-seal">⚜️</div>
        </div>

        <div className="cert-divider" />

        <p className="cert-text">
          يشهد المفتش الصحي الموقر بأن مطعم <strong>أبو شاورما</strong> يلتزم بجميع معايير النظافة والسلامة الغذائية، ويستحق تصنيف <strong>★★★★★</strong>.
        </p>

        <div className="cert-divider" />

        <h2 className="cert-section-title">👥 فريق العمل</h2>
        <div className="team-grid">
          {[
            { name: 'أحمد', role: 'كبير الطباخين — يقرأ الكود بالعربي', emoji: '👨‍🍳' },
            { name: 'سارة', role: 'مهندسة الواجهات — بتصمم بالحب', emoji: '👩‍💻' },
            { name: 'محمود', role: 'مسؤول الباك إند — بخلّص قبل الدوام', emoji: '👨‍💻' },
          ].map((m, i) => (
            <div key={i} className="team-card">
              <div className="team-emoji">{m.emoji}</div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
            </div>
          ))}
        </div>

        <div className="cert-divider" />

        <h2 className="cert-section-title">🛠️ تقنيات المطبخ</h2>
        <div className="tech-list">
          {['React.js (الوصفة السرية)', 'React Router v6 (خرائط المطبخ)', 'CSS Animations (حركات الطعام)', 'Render.com (فرن النشر)', 'GitHub (دفتر الوصفات المشترك)'].map((t, i) => (
            <div key={i} className="tech-item">✅ {t}</div>
          ))}
        </div>

        <div className="cert-divider" />

        <p className="cert-footer">
          صادر عن وزارة البرمجيات اللذيذة · {new Date().getFullYear()}
        </p>

        <div className="cert-stamp">مُعتمد ✓</div>
      </div>
    </div>
  );
}
