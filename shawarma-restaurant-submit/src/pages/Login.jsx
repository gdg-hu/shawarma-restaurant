import { useState } from 'react';
import './StaticPages.css';

export default function Login() {
  const [code, setCode] = useState('');
  const [attempt, setAttempt] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempt(true);
    setTimeout(() => setAttempt(false), 2000);
  };

  return (
    <div className="static-page">
      <div className="back-door">
        <div className="door-sign">🚪 الباب الخلفي للموظفين</div>
        <p className="door-sub">Employee Entrance Only</p>

        <div className="keypad-area">
          <div className="keypad-icon">🔐</div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="form-label">اسم المستخدم</label>
            <input className="form-input" type="text" placeholder="اسمك يا شطر..." />

            <label className="form-label">كلمة المرور</label>
            <input
              className="form-input"
              type="password"
              placeholder="الكود السري..."
              value={code}
              onChange={e => setCode(e.target.value)}
            />

            <button className="form-btn" type="submit">
              {attempt ? '🔒 كلمة المرور غلط!' : '🔑 ادخل'}
            </button>
          </form>

          <p className="form-note">
            * هاي الصفحة placeholder — الـ authentication مو جاهز بعد 🛠️
          </p>
        </div>
      </div>
    </div>
  );
}
