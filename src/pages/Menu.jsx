import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import menuData from '../data/menu';
import './Menu.css';

const CATEGORIES = ['الكل', 'ساندويش', 'وجبة', 'مقبلات', 'سلطات', 'مشروبات'];

// Map each item id to its counter position & style
const ITEM_POSITIONS = {
  1:  { zone: 'grill',   label: 'شاورما دجاج',   icon: '🍗', sub: 'CHICKEN' },
  2:  { zone: 'grill',   label: 'شاورما لحمة',   icon: '🥩', sub: 'MEAT' },
  3:  { zone: 'zinger',  label: 'زنجر',           icon: '🍗', sub: 'ZINGER PREP' },
  4:  { zone: 'salad',   label: 'خس وبندورة',     icon: '🥗', sub: 'SALAD PREP' },
  5:  { zone: 'salad',   label: 'ملفوف',          icon: '🥬', sub: 'SALAD PREP' },
  6:  { zone: 'kabab',   label: 'صحن كباب',       icon: '🍢', sub: 'KABAB' },
  7:  { zone: 'fryer',   label: 'بطاطا',          icon: '🍟', sub: 'FRIES FRY' },
  8:  { zone: 'drinks',  label: 'غازي',           icon: '🥤', sub: 'SOFT DRINK' },
  9:  { zone: 'drinks',  label: 'مي',             icon: '💧', sub: 'WATER' },
  10: { zone: 'falafel', label: 'فلافل حبات',     icon: '🧆', sub: 'FALAFEL FRY' },
  11: { zone: 'falafel', label: 'سندويش فلافل',  icon: '🫓', sub: 'FALAFEL PREP' },
};

export default function Menu() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('الكل');
  const [sort, setSort] = useState('default');
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let result = menuData.filter(item => {
      const matchSearch = item.name.includes(search) || item.mood.includes(search) || item.type.includes(search);
      const matchCat = category === 'الكل' || item.category === category;
      return matchSearch && matchCat;
    });

    if (sort === 'price-asc')  result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'name')       result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'ar'));

    return result;
  }, [search, category, sort]);

  const filteredIds = new Set(filtered.map(i => i.id));

  return (
    <div className="menu-page">
      {/* Menu board top */}
      <div className="menu-board">
        <div className="board-title">القائمة</div>
        <div className="board-items">
          {menuData.slice(0, 4).map(item => (
            <div key={item.id} className="board-row">
              <span>{item.name}</span>
              <span className="board-dots" />
              <span className="board-price">{item.price.toFixed(2)} د</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="controls-bar">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 ابحث عن صنف..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">الترتيب الافتراضي</option>
          <option value="price-asc">السعر: الأقل أولاً</option>
          <option value="price-desc">السعر: الأعلى أولاً</option>
          <option value="name">حسب الاسم</option>
        </select>
        <div className="cat-filters">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`cat-btn ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* ILLUSTRATED COUNTER */}
      <div className="counter-scene">
        {/* Back wall */}
        <div className="back-wall">
          <div className="wall-shelf">
            <span className="shelf-jar">🫙</span>
            <span className="shelf-jar">🫙</span>
            <span className="shelf-jar">🫙</span>
          </div>
          <div className="wall-picture">🖼️</div>
        </div>

        {/* Counter top */}
        <div className="counter-top">

          {/* BREAD STACK (left side) */}
          <div className="counter-section bread-section">
            <div className="bread-stack">
              {[0,1,2].map(i => (
                <div key={i} className="bread-round" style={{ bottom: `${i * 8}px`, zIndex: i }} />
              ))}
            </div>
            <div className="section-label">خبز</div>
          </div>

          {/* SHAWARMA GRILLS */}
          {[1, 2].map(id => {
            const item = menuData.find(d => d.id === id);
            const pos = ITEM_POSITIONS[id];
            const isActive = filteredIds.has(id);
            const isHov = hovered === id;
            return (
              <div
                key={id}
                className={`counter-section grill-section ${!isActive ? 'dimmed' : ''} ${isHov ? 'hovered' : ''}`}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => isActive && navigate(`/dish/${id}`)}
                title={item.mood}
              >
                <div className="grill-machine">
                  <div className="grill-body">
                    <div className="grill-spit" />
                    <div className={`grill-meat ${isHov ? 'meat-spinning' : ''}`}>
                      <div className="meat-cone chicken" />
                    </div>
                    <div className="grill-flames">
                      <span className="flame" style={{ animationDelay: '0s' }}>🔥</span>
                      <span className="flame" style={{ animationDelay: '0.3s' }}>🔥</span>
                    </div>
                  </div>
                </div>
                <div className="section-label">{pos.label}</div>
                <div className="section-sublabel">{pos.sub}</div>
                <div className="item-price">{item.price.toFixed(2)} د</div>
                {isHov && <div className="mood-tooltip">{item.mood} {pos.icon}</div>}
              </div>
            );
          })}

          {/* FALAFEL SECTION */}
          {[10, 11].map(id => {
            const item = menuData.find(d => d.id === id);
            const pos = ITEM_POSITIONS[id];
            const isActive = filteredIds.has(id);
            const isHov = hovered === id;
            return (
              <div
                key={id}
                className={`counter-section falafel-section ${!isActive ? 'dimmed' : ''} ${isHov ? 'hovered' : ''}`}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => isActive && navigate(`/dish/${id}`)}
              >
                <div className="falafel-display">
                  {[0,1,2,3,4,5].map(i => (
                    <div
                      key={i}
                      className={`falafel-ball ${isHov ? 'rolling' : ''}`}
                      style={{
                        left: `${(i % 3) * 22}px`,
                        top: `${Math.floor(i / 3) * 18}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="section-label">{pos.label}</div>
                <div className="section-sublabel">{pos.sub}</div>
                <div className="item-price">{item.price.toFixed(2)} د</div>
                {isHov && <div className="mood-tooltip">{item.mood} {pos.icon}</div>}
              </div>
            );
          })}

          {/* SALAD TRAYS */}
          <div className="counter-section salad-group">
            <div className="salad-trays">
              {[4, 5].map(id => {
                const item = menuData.find(d => d.id === id);
                const pos = ITEM_POSITIONS[id];
                const isActive = filteredIds.has(id);
                const isHov = hovered === id;
                return (
                  <div
                    key={id}
                    className={`salad-tray ${!isActive ? 'dimmed' : ''} ${isHov ? 'hovered' : ''}`}
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => isActive && navigate(`/dish/${id}`)}
                  >
                    <div className={`tray-content ${isHov ? 'shaking' : ''}`}>
                      <span style={{ fontSize: '1.8rem' }}>{pos.icon}</span>
                    </div>
                    <div className="tray-label">{pos.label}</div>
                    <div className="item-price">{item.price.toFixed(2)} د</div>
                    {isHov && <div className="mood-tooltip small">{item.mood}</div>}
                  </div>
                );
              })}
            </div>
            <div className="section-sublabel" style={{ textAlign: 'center' }}>SALAD PREP</div>
          </div>

          {/* HUMMUS / SAUCES */}
          <div className="counter-section sauce-section">
            <div className="sauce-bowl">
              <div className="bowl-body">
                <div className="bowl-spoon" />
              </div>
              <div className="sauce-cups">
                {[0,1,2].map(i => <div key={i} className="sauce-cup" />)}
              </div>
            </div>
            <div className="section-label">صلصات</div>
            <div className="section-sublabel">HUMMUS FILL</div>
          </div>

          {/* FRYER + ZINGER */}
          <div className="counter-section fryer-group">
            {[7, 3].map(id => {
              const item = menuData.find(d => d.id === id);
              const pos = ITEM_POSITIONS[id];
              const isActive = filteredIds.has(id);
              const isHov = hovered === id;
              return (
                <div
                  key={id}
                  className={`fryer-item ${!isActive ? 'dimmed' : ''} ${isHov ? 'hovered' : ''}`}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => isActive && navigate(`/dish/${id}`)}
                >
                  <div className={`fryer-box ${isHov ? 'frying' : ''}`}>
                    <span style={{ fontSize: '1.5rem' }}>{pos.icon}</span>
                  </div>
                  <div className="tray-label">{pos.label}</div>
                  <div className="item-price">{item.price.toFixed(2)} د</div>
                  {isHov && <div className="mood-tooltip small">{item.mood}</div>}
                </div>
              );
            })}
            <div className="section-sublabel" style={{ textAlign: 'center', marginTop: '4px' }}>FRIES & ZINGER</div>
          </div>

          {/* WATER FRIDGE */}
          <div className="counter-section fridge-section">
            {[9].map(id => {
              const item = menuData.find(d => d.id === id);
              const isActive = filteredIds.has(id);
              const isHov = hovered === id;
              return (
                <div
                  key={id}
                  className={`fridge-unit ${!isActive ? 'dimmed' : ''} ${isHov ? 'hovered' : ''}`}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => isActive && navigate(`/dish/${id}`)}
                >
                  <div className="fridge-body">
                    {[0,1,2].map(i => (
                      <div key={i} className={`bottle ${isHov ? 'sweating' : ''}`} style={{ animationDelay: `${i*0.2}s` }}>💧</div>
                    ))}
                  </div>
                  <div className="tray-label">مي</div>
                  <div className="item-price">{item.price.toFixed(2)} د</div>
                  {isHov && <div className="mood-tooltip small">{item.mood}</div>}
                </div>
              );
            })}
          </div>

          {/* DRINKS MACHINE */}
          {[8].map(id => {
            const item = menuData.find(d => d.id === id);
            const pos = ITEM_POSITIONS[id];
            const isActive = filteredIds.has(id);
            const isHov = hovered === id;
            return (
              <div
                key={id}
                className={`counter-section drinks-section ${!isActive ? 'dimmed' : ''} ${isHov ? 'hovered' : ''}`}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => isActive && navigate(`/dish/${id}`)}
              >
                <div className="drink-machine">
                  <div className="machine-body">
                    <div className="machine-label-top">SOFT DRINK</div>
                    {['🔴','🟡','🟢','🔵'].map((c, i) => (
                      <div key={i} className={`drink-tap ${isHov ? 'bubbling' : ''}`} style={{ animationDelay: `${i*0.15}s` }}>
                        <div className="tap-dot" style={{ background: ['#c0392b','#d4a843','#27ae60','#2980b9'][i] }} />
                      </div>
                    ))}
                    <div className="drink-cups">
                      {[0,1,2].map(i => <div key={i} className="cup" />)}
                    </div>
                  </div>
                </div>
                <div className="section-label">{pos.label}</div>
                <div className="item-price">{item.price.toFixed(2)} د</div>
                {isHov && <div className="mood-tooltip">{item.mood} {pos.icon}</div>}
              </div>
            );
          })}

          {/* KABAB section */}
          {[6].map(id => {
            const item = menuData.find(d => d.id === id);
            const pos = ITEM_POSITIONS[id];
            const isActive = filteredIds.has(id);
            const isHov = hovered === id;
            return (
              <div
                key={id}
                className={`counter-section kabab-section ${!isActive ? 'dimmed' : ''} ${isHov ? 'hovered' : ''}`}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => isActive && navigate(`/dish/${id}`)}
              >
                <div className="kabab-grill">
                  <div className="grill-grid">
                    {[0,1,2].map(i => (
                      <div key={i} className={`kabab-stick ${isHov ? 'smoking' : ''}`} style={{ animationDelay: `${i*0.2}s` }}>🍢</div>
                    ))}
                  </div>
                  {isHov && <div className="smoke-cloud">💨</div>}
                </div>
                <div className="section-label">{pos.label}</div>
                <div className="item-price">{item.price.toFixed(2)} د</div>
                {isHov && <div className="mood-tooltip">{item.mood} {pos.icon}</div>}
              </div>
            );
          })}

        </div>{/* end counter-top */}

        {/* Counter front face */}
        <div className="counter-front">
          <div className="counter-stripe" />
        </div>
      </div>{/* end counter-scene */}

      {/* Results grid below counter */}
      <div className="results-section">
        <div className="results-header">
          <span>{filtered.length} صنف</span>
          {search && <span className="search-badge">نتائج: "{search}"</span>}
        </div>
        <div className="results-grid">
          {filtered.length === 0 ? (
            <div className="no-results">لا يوجد شيء بهاي الفلاتر 😅</div>
          ) : (
            filtered.map(item => {
              const pos = ITEM_POSITIONS[item.id];
              return (
                <div
                  key={item.id}
                  className="result-card"
                  onClick={() => navigate(`/dish/${item.id}`)}
                >
                  <div className="card-emoji">{pos?.icon || '🍽️'}</div>
                  <div className="card-info">
                    <div className="card-name">{item.name}</div>
                    <div className="card-mood">{item.mood}</div>
                    <div className="card-meta">
                      <span className="tag">{item.category}</span>
                      <span className="tag">{item.type}</span>
                    </div>
                  </div>
                  <div className="card-price">{item.price.toFixed(2)} د</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
