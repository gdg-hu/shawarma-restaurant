import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import menuData from '../data/menu';
import './DishDetail.css';

// Interactive steps per dish
const DISH_STEPS = {
  1: [ // شاورما دجاج
    { label: 'افتح الخبز', icon: '🫓', desc: 'خبز عربي طازج وساخن' },
    { label: 'أضف الدجاج', icon: '🍗', desc: 'شرائح دجاج متبلة من السيخ' },
    { label: 'أضف الخضار', icon: '🥒', desc: 'خيار مخلل وخس طازج' },
    { label: 'صوص ثوم', icon: '🧄', desc: 'ثوم كريمي بحنية' },
    { label: 'لفّها!', icon: '🌯', desc: 'شاورما دجاج جاهزة 🎉' },
  ],
  2: [ // شاورما لحمة
    { label: 'افتح الخبز', icon: '🫓', desc: 'خبز رقيق وطري' },
    { label: 'أضف اللحمة', icon: '🥩', desc: 'لحم بقر متبل عالسيخ' },
    { label: 'بصل وبقدونس', icon: '🧅', desc: 'بصل رقيق وبقدونس طازج' },
    { label: 'طحينية', icon: '🫙', desc: 'طحينية بليمونة' },
    { label: 'لفّها!', icon: '🌯', desc: 'شاورما لحمة جاهزة 🔥' },
  ],
  3: [ // زنجر
    { label: 'خبز توست', icon: '🍞', desc: 'خبز توست مقرمش' },
    { label: 'قطعة دجاج', icon: '🍗', desc: 'دجاج مقلي بالتتبيلة' },
    { label: 'خس', icon: '🥬', desc: 'خس طازج وبارد' },
    { label: 'مايونيز حار', icon: '🫙', desc: 'صوص حار بدبس' },
    { label: 'مخلل', icon: '🥒', desc: 'مخلل مقرمش' },
    { label: 'اقفلها!', icon: '🍔', desc: 'زنجر أحمد! 🎊' },
  ],
  4: [ // سلطة خس وبندورة
    { label: 'خس', icon: '🥬', desc: 'خس مقطع طازج' },
    { label: 'بندورة', icon: '🍅', desc: 'بندورة حمرا' },
    { label: 'خيار', icon: '🥒', desc: 'خيار مقطع' },
    { label: 'زيت زيتون', icon: '🫒', desc: 'زيت زيتون بكر' },
    { label: 'هزّ!', icon: '🥗', desc: 'سلطة جاهزة 🌿' },
  ],
  5: [ // سلطة ملفوف
    { label: 'ملفوف', icon: '🥬', desc: 'ملفوف مقطع رفيع' },
    { label: 'جزر', icon: '🥕', desc: 'جزر مبشور' },
    { label: 'بقدونس', icon: '🌿', desc: 'بقدونس طازج' },
    { label: 'ليمون وملح', icon: '🍋', desc: 'عصير ليمون وملح' },
    { label: 'قلّب!', icon: '🥗', desc: 'سلطة ملفوف جاهزة ✅' },
  ],
  6: [ // كباب
    { label: 'لحم مفروم', icon: '🥩', desc: 'لحم بقر طازج مع توابل' },
    { label: 'ضع على السيخ', icon: '🍢', desc: 'اعصر اللحم على السيخ' },
    { label: 'على الفحم', icon: '🔥', desc: 'فحم جاهز والحرارة مظبوطة' },
    { label: 'اقلب', icon: '↔️', desc: 'اقلب الكباب من الجهتين' },
    { label: 'قدّمه', icon: '🍽️', desc: 'صحن كباب جاهز! 💨' },
  ],
  7: [ // بطاطا
    { label: 'بطاطا مقطعة', icon: '🥔', desc: 'شرائح بطاطا موحدة الحجم' },
    { label: 'بالزيت الحار', icon: '🔥', desc: 'زيت 180 درجة جاهز' },
    { label: 'اقليها', icon: '⬇️', desc: 'دقيقتين باليورو' },
    { label: 'صفّيها', icon: '🗑️', desc: 'صفّي الزيت الزايد' },
    { label: 'ملّح!', icon: '🧂', desc: 'بطاطا مقرمشة جاهزة 🍟' },
  ],
  8: [ // غازي
    { label: 'كوب بثلج', icon: '🧊', desc: 'كوب بارد ومثلجات' },
    { label: 'اختار النكهة', icon: '🥤', desc: 'كولا / ليمون / برتقال' },
    { label: 'اشرب!', icon: '🫧', desc: 'غازي بارد ببقاعاته 🥤' },
  ],
  9: [ // مي
    { label: 'من الثلاجة', icon: '🌡️', desc: 'ماء مثلج ومنعش' },
    { label: 'مباشرة!', icon: '💧', desc: 'مية نقية وباردة 💧' },
  ],
  10: [ // فلافل حبات
    { label: 'حمص مطحون', icon: '🫘', desc: 'حمص مع بقدونس وثوم' },
    { label: 'حلّق الكرة', icon: '🤲', desc: 'حجم البندورة الصغيرة' },
    { label: 'في الزيت', icon: '🔥', desc: 'زيت ساخن 170 درجة' },
    { label: 'ذهبية!', icon: '🧆', desc: 'فلافل ذهبية جاهزة 🧆' },
  ],
  11: [ // سندويش فلافل
    { label: 'خبز عربي', icon: '🫓', desc: 'خبز عربي طازج' },
    { label: 'فلافل', icon: '🧆', desc: 'حبات فلافل مقرمشة' },
    { label: 'طحينية', icon: '🫙', desc: 'طحينية كتير!' },
    { label: 'خضار', icon: '🥗', desc: 'خس وبندورة ومخلل' },
    { label: 'الحين!', icon: '🫓', desc: 'سندويش فلافل جاهزة 🎉' },
  ],
};

const MOOD_ANIM = {
  spin: 'anim-spin',
  bounce: 'anim-bounce',
  shake: 'anim-shake',
  roll: 'anim-roll',
  fly: 'anim-fly',
  bubble: 'anim-bubble',
  smoke: 'anim-smoke',
  drip: 'anim-drip',
  sweat: 'anim-sweat',
  fill: 'anim-fill',
  sway: 'anim-sway',
};

const EMOJIS = { 1:'🌯', 2:'🌯', 3:'🍗', 4:'🥗', 5:'🥗', 6:'🍢', 7:'🍟', 8:'🥤', 9:'💧', 10:'🧆', 11:'🫓' };

export default function DishDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dish = menuData.find(d => d.id === Number(id));
  const steps = DISH_STEPS[Number(id)] || [];
  const [completed, setCompleted] = useState([]);
  const [animating, setAnimating] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setCompleted([]);
    setDone(false);
  }, [id]);

  if (!dish) return (
    <div style={{ padding: '5rem', textAlign: 'center', color: '#8b6530', paddingTop: '100px' }}>
      <h2>الصنف مش موجود 😅</h2>
      <button onClick={() => navigate('/menu')} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: '#8b4513', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        ارجع للقائمة
      </button>
    </div>
  );

  const handleStep = (idx) => {
    if (completed.includes(idx) || animating !== null) return;
    setAnimating(idx);
    setTimeout(() => {
      setCompleted(prev => {
        const next = [...prev, idx];
        if (next.length === steps.length) setDone(true);
        return next;
      });
      setAnimating(null);
    }, 600);
  };

  const reset = () => { setCompleted([]); setDone(false); };

  const emoji = EMOJIS[dish.id] || '🍽️';

  return (
    <div className="dish-page">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate('/menu')}>
        ← القائمة
      </button>

      {/* Dish hero */}
      <div className="dish-hero">
        <div className={`dish-hero-emoji ${MOOD_ANIM[dish.moodAnimation] || ''}`}>
          {emoji}
        </div>
        <div className="dish-hero-info">
          <h1 className="dish-title">{dish.name}</h1>
          <p className="dish-mood">"{dish.mood}"</p>
          <div className="dish-tags">
            <span className="dtag">{dish.category}</span>
            <span className="dtag">{dish.type}</span>
          </div>
          <div className="dish-price">{dish.price.toFixed(2)} دينار</div>
          {dish.description && <p className="dish-desc">{dish.description}</p>}
        </div>
      </div>

      {/* Making of section */}
      <div className="making-section">
        <div className="making-header">
          <h2>🍳 طريقة التحضير</h2>
          <p>اضغط على كل خطوة بالترتيب</p>
        </div>

        {/* Progress pita visualization */}
        <div className="pita-area">
          <div className="pita-bread">
            <span className="pita-emoji">🫓</span>
            <div className="pita-ingredients">
              {steps.map((step, i) => (
                completed.includes(i) && (
                  <span
                    key={i}
                    className="dropped-ingredient"
                    style={{ animationDelay: '0s', left: `${10 + (i % 5) * 15}%` }}
                  >
                    {step.icon}
                  </span>
                )
              ))}
            </div>
            {done && <div className="done-flash">جاهز! {emoji}</div>}
          </div>

          {/* Progress bar */}
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(completed.length / steps.length) * 100}%` }}
            />
            <span className="progress-text">{completed.length} / {steps.length}</span>
          </div>
        </div>

        {/* Step buttons */}
        <div className="steps-grid">
          {steps.map((step, i) => {
            const isComp = completed.includes(i);
            const isAnim = animating === i;
            const isNext = i === completed.length;
            return (
              <button
                key={i}
                className={`step-btn ${isComp ? 'done' : ''} ${isAnim ? 'animating' : ''} ${isNext ? 'next' : ''}`}
                onClick={() => handleStep(i)}
                disabled={isComp || (!isNext)}
              >
                <span className="step-num">{i + 1}</span>
                <span className={`step-icon ${isAnim ? 'dropping' : ''}`}>{step.icon}</span>
                <span className="step-label">{step.label}</span>
                {isComp && <span className="step-check">✓</span>}
                {isNext && !isComp && <span className="step-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Step description */}
        {completed.length > 0 && !done && (
          <div className="step-desc-box">
            {steps[completed.length - 1]?.desc}
          </div>
        )}

        {/* Done state */}
        {done && (
          <div className="done-banner">
            <div className="done-emoji">{emoji}</div>
            <div className="done-text">{steps[steps.length - 1].desc}</div>
            <button className="reset-btn" onClick={reset}>اعمل واحدة ثانية 🔄</button>
          </div>
        )}

        {/* Ingredients list */}
        {dish.ingredients && (
          <div className="ingredients-section">
            <h3>المكونات</h3>
            <div className="ingredients-list">
              {dish.ingredients.map((ing, i) => (
                <span key={i} className="ingredient-tag">{ing}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
