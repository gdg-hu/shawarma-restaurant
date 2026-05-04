import './StaticPages.css';

export default function Register() {
  return (
    <div className="static-page">
      <div className="back-door">
        <div className="door-sign">📝 تسجيل موظف جديد</div>
        <p className="door-sub">New Employee Registration</p>

        <div className="keypad-area">
          <div className="keypad-icon">👨‍🍳</div>
          <form className="login-form" onSubmit={e => e.preventDefault()}>
            <label className="form-label">الاسم الكامل</label>
            <input className="form-input" type="text" placeholder="اسمك الكامل..." />

            <label className="form-label">رقم الهوية</label>
            <input className="form-input" type="text" placeholder="رقم الهوية..." />

            <label className="form-label">البريد الإلكتروني</label>
            <input className="form-input" type="email" placeholder="ايميلك..." />

            <label className="form-label">كلمة المرور</label>
            <input className="form-input" type="password" placeholder="اختار كلمة مرور قوية..." />

            <label className="form-label">تأكيد كلمة المرور</label>
            <input className="form-input" type="password" placeholder="كررها..." />

            <button className="form-btn" type="submit">📨 أرسل الطلب</button>
          </form>

          <p className="form-note">* placeholder — التسجيل الحقيقي قريباً 🚧</p>
        </div>
      </div>
    </div>
  );
}
