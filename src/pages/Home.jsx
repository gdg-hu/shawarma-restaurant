import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [phase, setPhase] = useState('outside');
  const navigate = useNavigate();

  const handleClick = () => {
    if (phase !== 'outside') return;
    setPhase('opening');
    setTimeout(() => setPhase('loading'), 900);
    setTimeout(() => setPhase('entering'), 2600);
    setTimeout(() => navigate('/menu'), 3300);
  };

  const stars = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: ((i * 137.5) % 100).toFixed(1),
    top: ((i * 97.3) % 80).toFixed(1),
    delay: ((i * 0.37) % 4).toFixed(2),
    size: (0.4 + (i % 5) * 0.18).toFixed(2),
  }));

  return (
    <div className="home-scene" onClick={handleClick}>
      <div className="stars">
        {stars.map(s => (
          <span key={s.id} className="star" style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s`, fontSize: `${s.size}rem` }}>✦</span>
        ))}
      </div>

      <div style={{ position: 'absolute', top: '8%', left: '12%', fontSize: '3rem', opacity: 0.9, animation: 'float 6s ease-in-out infinite' }}>🌙</div>

      <div className="building">
        <div className={`restaurant-sign ${phase !== 'outside' ? 'bright' : ''}`}>
          <div className="sign-arabic">أبو شاورما</div>
          <div className="sign-sub">منذ ١٩٨٥ · أحسن شاورما بالحي</div>
          <div className="sign-lights">
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i} className="bulb" style={{ animationDelay: `${i * 0.13}s` }} />
            ))}
          </div>
        </div>

        <div className="wall-section">
          <div className="window">
            <div className="window-glow" />
            <span className="window-item">🥙</span>
          </div>

          <div className="door-frame">
            <div className={`door ${phase === 'opening' || phase === 'loading' ? 'door-open' : ''}`}>
              <div className="door-panels">
                <div className="door-panel-left">
                  <div className="door-decor" />
                  <div className="door-handle right-handle">●</div>
                </div>
                <div className="door-panel-right">
                  <div className="door-decor" />
                  <div className="door-handle left-handle">●</div>
                </div>
              </div>
            </div>
            <div className={`door-inside ${phase !== 'outside' ? 'visible' : ''}`}>
              <div className="inside-glow" />
              <div className="inside-items"><span>🔥</span><span>🥙</span><span>🔥</span></div>
            </div>
            {phase === 'outside' && (
              <div className="door-cta">
                <span className="cta-arrow">↓</span>
                <span>اطرق وادخل</span>
              </div>
            )}
          </div>

          <div className="window">
            <div className="window-glow" />
            <span className="window-item">🍢</span>
          </div>
        </div>

        <div className="steps">
          <div className="step step-1" />
          <div className="step step-2" />
          <div className="step step-3" />
        </div>
      </div>

      {(phase === 'loading' || phase === 'entering') && (
        <div className={`loading-overlay ${phase === 'entering' ? 'fade-out' : ''}`}>
          <div className="loading-content">
            <span className="loading-spinner">🥙</span>
            <p className="loading-text">جاري التجهيز...</p>
            <div className="loading-dots"><span /><span /><span /></div>
          </div>
        </div>
      )}
    </div>
  );
}
