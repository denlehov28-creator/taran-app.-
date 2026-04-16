import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'taran_super_app_v1';

const WORKOUTS = [
  { id: 1, day: 'Пн / Ср / Пт', time: '07:00', type: 'Утренняя' },
  { id: 2, day: 'Пн / Ср / Пт', time: '17:00', type: 'Детская' },
  { id: 3, day: 'Пн / Ср / Пт', time: '18:00', type: 'Новички' },
  { id: 4, day: 'Пн / Ср / Пт', time: '19:00', type: 'Профи' },
  { id: 5, day: 'Вт / Чт', time: '20:00', type: 'Взрослая' },
  { id: 6, day: 'Сб', time: '14:00', type: 'Взрослая' }
];

const PLANS = [
  { id: 'single', title: 'Разовое занятие', price: '800 ₽' },
  { id: 'week2', title: '2 раза в неделю', price: '4500 ₽' },
  { id: 'week2_mei', title: '2 раза в неделю (МЭИ)', price: '3500 ₽' },
  { id: 'week3', title: '3 раза в неделю', price: '6000 ₽' },
  { id: 'week3_mei', title: '3 раза в неделю (МЭИ)', price: '5000 ₽' },
  { id: 'personal', title: 'Персональная тренировка', price: '3000 ₽' },
  { id: 'block5', title: 'Блок 5 персоналок', price: '13 999 ₽' },
  { id: 'block10', title: 'Блок 10 персоналок', price: '26 799 ₽' }
];

const FEED_POSTS = [
  {
    id: 1,
    title: 'Набор в группы открыт',
    body:
      'Открыта запись в группы для новичков, взрослых и детских тренировок. Выбирайте удобное время и бронируйте место прямо внутри приложения.',
    premium: false
  },
  {
    id: 2,
    title: 'Питание для бойца',
    body:
      'Разобрали, как собирать рацион под бокс: белок, углеводы, вода, восстановление и распределение калорий по дням нагрузки.',
    premium: true
  },
  {
    id: 3,
    title: 'Скорость и выносливость',
    body:
      'В этом цикле работаем над ногами, дыханием и плотностью ударной работы. Цель — больше объёма без потери техники.',
    premium: false
  }
];

const EXERCISES = [
  { id: 'pushups', name: 'Отжимания' },
  { id: 'pullups', name: 'Подтягивания' },
  { id: 'squats', name: 'Приседания за 1 минуту' },
  { id: 'speed', name: 'Удары в минуту' }
];

export default function App() {
  const [tab, setTab] = useState('home');

  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    age: '',
    mei: false
  });

  const [likedPostIds, setLikedPostIds] = useState([]);
  const [bookedIds, setBookedIds] = useState([]);
  const [personalBooked, setPersonalBooked] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentNote, setPaymentNote] = useState('');

  const [nutritionUnlocked, setNutritionUnlocked] = useState(false);
  const [nutritionMode, setNutritionMode] = useState('locked');
  const [nutritionForm, setNutritionForm] = useState({
    sex: 'male',
    weight: '',
    height: '',
    age: '',
    activity: '1.55',
    meals: '4'
  });
  const [waterMl, setWaterMl] = useState(0);
  const [foodInput, setFoodInput] = useState('');
  const [foodEntries, setFoodEntries] = useState([]);

  const [results, setResults] = useState({
    pushups: '',
    pullups: '',
    squats: '',
    speed: ''
  });

  const [beforePhoto, setBeforePhoto] = useState('');
  const [afterPhoto, setAfterPhoto] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved) return;

      if (saved.profile) setProfile(saved.profile);
      if (saved.likedPostIds) setLikedPostIds(saved.likedPostIds);
      if (saved.bookedIds) setBookedIds(saved.bookedIds);
      if (typeof saved.personalBooked === 'boolean') setPersonalBooked(saved.personalBooked);
      if (saved.selectedPlan) setSelectedPlan(saved.selectedPlan);
      if (saved.paymentNote) setPaymentNote(saved.paymentNote);
      if (typeof saved.nutritionUnlocked === 'boolean') setNutritionUnlocked(saved.nutritionUnlocked);
      if (saved.nutritionMode) setNutritionMode(saved.nutritionMode);
      if (saved.nutritionForm) setNutritionForm(saved.nutritionForm);
      if (typeof saved.waterMl === 'number') setWaterMl(saved.waterMl);
      if (saved.foodEntries) setFoodEntries(saved.foodEntries);
      if (saved.results) setResults(saved.results);
    } catch (e) {
      console.error('Ошибка чтения localStorage', e);
    }
  }, []);

  useEffect(() => {
    const payload = {
      profile,
      likedPostIds,
      bookedIds,
      personalBooked,
      selectedPlan,
      paymentNote,
      nutritionUnlocked,
      nutritionMode,
      nutritionForm,
      waterMl,
      foodEntries,
      results
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [
    profile,
    likedPostIds,
    bookedIds,
    personalBooked,
    selectedPlan,
    paymentNote,
    nutritionUnlocked,
    nutritionMode,
    nutritionForm,
    waterMl,
    foodEntries,
    results
  ]);

  const bookedWorkouts = useMemo(
    () => WORKOUTS.filter((item) => bookedIds.includes(item.id)),
    [bookedIds]
  );

  const totalScore = useMemo(() => {
    return EXERCISES.reduce((sum, item) => {
      const value = Number(results[item.id] || 0);
      return sum + value;
    }, 0);
  }, [results]);

  const calories = useMemo(() => {
    const weight = Number(nutritionForm.weight);
    const height = Number(nutritionForm.height);
    const age = Number(nutritionForm.age);
    const activity = Number(nutritionForm.activity);

    if (!weight || !height || !age || !activity) return 0;

    const bmr =
      nutritionForm.sex === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    return Math.round(bmr * activity);
  }, [nutritionForm]);

  const mealPlan = useMemo(() => {
    if (!calories) return [];

    const mealsCount = Number(nutritionForm.meals);
    const distributions =
      mealsCount === 3
        ? [
            ['Завтрак', 0.30],
            ['Обед', 0.40],
            ['Ужин', 0.30]
          ]
        : mealsCount === 4
        ? [
            ['Завтрак', 0.25],
            ['Обед', 0.35],
            ['Ужин', 0.25],
            ['Перекус', 0.15]
          ]
        : [
            ['Завтрак', 0.25],
            ['Перекус 1', 0.10],
            ['Обед', 0.35],
            ['Перекус 2', 0.10],
            ['Ужин', 0.20]
          ];

    const suggestions = {
      Завтрак: ['Овсянка + яйца', 'Творог + ягоды', 'Омлет + овощи'],
      Обед: ['Курица + рис', 'Индейка + гречка', 'Говядина + картофель'],
      Ужин: ['Рыба + овощи', 'Омлет + салат', 'Творог + орехи'],
      Перекус: ['Йогурт', 'Банан + орехи', 'Протеиновый перекус'],
      'Перекус 1': ['Йогурт', 'Фрукты', 'Орехи'],
      'Перекус 2': ['Кефир', 'Творог', 'Батончик без сахара']
    };

    return distributions.map(([name, ratio]) => ({
      name,
      kcal: Math.round(calories * ratio),
      ideas: suggestions[name] || ['Блюдо по плану']
    }));
  }, [calories, nutritionForm.meals]);

  const achievement = useMemo(() => {
    if (totalScore >= 250) return 'Легенда клуба';
    if (totalScore >= 180) return 'Сильный уровень';
    if (totalScore >= 100) return 'Хороший прогресс';
    if (totalScore > 0) return 'Старт положен';
    return 'Результаты ещё не введены';
  }, [totalScore]);

  const leaderboard = useMemo(() => {
    const base = [
      { name: 'Артём', score: 220 },
      { name: 'Илья', score: 205 },
      { name: 'Максим', score: 190 }
    ];

    if (profile.name.trim() && totalScore > 0) {
      return [...base, { name: profile.name.trim(), score: totalScore }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    }

    return base;
  }, [profile.name, totalScore]);

  const toggleLike = (postId) => {
    setLikedPostIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const toggleBooking = (id) => {
    setBookedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const choosePlan = (plan) => {
    setSelectedPlan(plan.title);
    setPaymentNote(`Демо-оплата оформлена: ${plan.title} · ${plan.price}`);
  };

  const activateNutrition = (mode) => {
    setNutritionUnlocked(true);
    setNutritionMode(mode);
    setPaymentNote(
      mode === 'trial'
        ? 'Активирован пробный доступ к питанию на 3 дня'
        : 'Демо-оплата питания активирована: 299 ₽ / мес'
    );
  };

  const addWater = (amount) => {
    setWaterMl((prev) => prev + amount);
  };

  const addFoodEntry = () => {
    if (!foodInput.trim()) return;
    setFoodEntries((prev) => [foodInput.trim(), ...prev].slice(0, 10));
    setFoodInput('');
  };

  const updateResult = (key, value) => {
    setResults((prev) => ({ ...prev, [key]: value }));
  };

  const onPhotoChange = (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'before') setBeforePhoto(reader.result?.toString() || '');
      if (type === 'after') setAfterPhoto(reader.result?.toString() || '');
    };
    reader.readAsDataURL(file);
  };

  const appStyle = {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top, rgba(204,255,0,0.08), transparent 30%), #101010',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    padding: '18px 14px 110px'
  };

  const wrapperStyle = {
    maxWidth: 520,
    margin: '0 auto'
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 20,
    backdropFilter: 'blur(12px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
    marginBottom: 16
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 14px',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)',
    color: '#fff',
    fontSize: 16,
    boxSizing: 'border-box'
  };

  const badgeStyle = {
    fontSize: 12,
    color: '#CCFF00',
    fontWeight: 800,
    letterSpacing: 1,
    marginBottom: 8
  };

  const buttonPrimary = {
    background: '#CCFF00',
    color: '#101010',
    padding: '14px 12px',
    borderRadius: 16,
    fontWeight: 800,
    border: 'none',
    fontSize: 16
  };

  const buttonGhost = {
    background: 'rgba(255,255,255,0.06)',
    color: '#fff',
    padding: '14px 12px',
    borderRadius: 16,
    fontWeight: 700,
    border: '1px solid rgba(255,255,255,0.08)',
    fontSize: 16
  };

  const tabButton = (id, label) => {
    const active = tab === id;

    return (
      <button
        onClick={() => setTab(id)}
        style={{
          flex: 1,
          border: 'none',
          background: active ? 'rgba(204,255,0,0.18)' : 'transparent',
          color: active ? '#CCFF00' : 'rgba(255,255,255,0.72)',
          padding: '10px 6px',
          borderRadius: 14,
          fontSize: 12,
          fontWeight: 800
        }}
      >
        {label}
      </button>
    );
  };

  const renderHome = () => (
    <>
      <section style={{ ...cardStyle, textAlign: 'center', padding: '28px 20px' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            borderRadius: 999,
            background: 'rgba(204,255,0,0.12)',
            color: '#CCFF00',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1,
            marginBottom: 18
          }}
        >
          BOXING CLUB
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 46,
            lineHeight: 1,
            color: '#CCFF00',
            fontWeight: 900
          }}
        >
          TARAN
        </h1>

        <p
          style={{
            marginTop: 16,
            marginBottom: 0,
            color: 'rgba(255,255,255,0.85)',
            fontSize: 17,
            lineHeight: 1.5
          }}
        >
          Боксерский клуб с жёсткой дисциплиной, сильной школой и подготовкой
          от новичка до профи.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginTop: 22
          }}
        >
          <button onClick={() => setTab('schedule')} style={buttonPrimary}>
            Смотреть расписание
          </button>

          <button onClick={() => setTab('profile')} style={buttonGhost}>
            Профиль
          </button>
        </div>
      </section>

      <section style={cardStyle}>
        <div style={badgeStyle}>ТРЕНЕР</div>
        <h2 style={{ margin: '0 0 8px', fontSize: 28 }}>Алексей Денисов</h2>
        <p
          style={{
            margin: 0,
            color: 'rgba(255,255,255,0.82)',
            lineHeight: 1.6,
            fontSize: 16
          }}
        >
          Мастер спорта. Опыт 15+ лет. Подготовка от первых шагов в боксе до
          серьёзного соревновательного уровня.
        </p>
      </section>

      <section style={cardStyle}>
        <div style={badgeStyle}>НОВОСТИ КЛУБА</div>
        <h2 style={{ margin: '0 0 16px', fontSize: 28 }}>Лента</h2>

        <div style={{ display: 'grid', gap: 12 }}>
          {FEED_POSTS.map((post) => {
            const liked = likedPostIds.includes(post.id);
            const locked = post.premium && !nutritionUnlocked;

            return (
              <div
                key={post.id}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 18,
                  padding: 16,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>
                  {post.title}
                </div>

                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.82)',
                    filter: locked ? 'blur(4px)' : 'none'
                  }}
                >
                  {post.body}
                </p>

                {locked && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(16,16,16,0.55)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#CCFF00',
                      fontWeight: 800,
                      textAlign: 'center',
                      padding: 20
                    }}
                  >
                    Премиум-пост
                    <br />
                    Откройте вкладку «Питание»
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                  <button
                    onClick={() => toggleLike(post.id)}
                    style={{
                      ...buttonGhost,
                      padding: '10px 12px',
                      fontSize: 14,
                      flex: 1
                    }}
                  >
                    {liked ? '💚 Лайк' : '🤍 Лайк'}
                  </button>

                  <button
                    onClick={() => setTab(post.premium ? 'nutrition' : 'schedule')}
                    style={{
                      ...buttonGhost,
                      padding: '10px 12px',
                      fontSize: 14,
                      flex: 1
                    }}
                  >
                    {post.premium ? 'Открыть доступ' : 'Подробнее'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );

  const renderSchedule = () => (
    <>
      <section style={cardStyle}>
        <div style={badgeStyle}>РАСПИСАНИЕ</div>
        <h2 style={{ margin: '0 0 16px', fontSize: 32 }}>Запись в группы</h2>

        <div style={{ display: 'grid', gap: 12 }}>
          {WORKOUTS.map((item) => {
            const booked = bookedIds.includes(item.id);

            return (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: booked
                    ? '1px solid rgba(204,255,0,0.35)'
                    : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 18,
                  padding: 16
                }}
              >
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
                  {item.day}
                </div>

                <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>
                  {item.time}
                </div>

                <div style={{ marginBottom: 14, color: 'rgba(255,255,255,0.86)' }}>
                  {item.type}
                </div>

                <button
                  onClick={() => toggleBooking(item.id)}
                  style={{
                    width: '100%',
                    border: 'none',
                    borderRadius: 14,
                    padding: '12px 14px',
                    fontWeight: 800,
                    fontSize: 15,
                    background: booked ? 'rgba(255,255,255,0.08)' : '#CCFF00',
                    color: booked ? '#fff' : '#101010'
                  }}
                >
                  {booked ? 'Вы записаны' : 'Записаться'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section style={cardStyle}>
        <div style={badgeStyle}>ПЕРСОНАЛЬНО</div>
        <h2 style={{ margin: '0 0 16px', fontSize: 32 }}>Тренировка с тренером</h2>

        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 18,
            padding: 18
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>
            Алексей Денисов · 3000 ₽
          </div>

          <p style={{ margin: '0 0 14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
            Индивидуальная работа: техника, скорость, работа ног, физика и подготовка к бою.
          </p>

          <button
            onClick={() => setPersonalBooked((prev) => !prev)}
            style={{
              width: '100%',
              border: 'none',
              borderRadius: 14,
              padding: '12px 14px',
              fontWeight: 800,
              fontSize: 15,
              background: personalBooked ? 'rgba(255,255,255,0.08)' : '#CCFF00',
              color: personalBooked ? '#fff' : '#101010'
            }}
          >
            {personalBooked ? 'Персоналка выбрана' : 'Записаться на персональную'}
          </button>
        </div>
      </section>

      <section style={cardStyle}>
        <div style={badgeStyle}>ТАРИФЫ И ОПЛАТА</div>
        <h2 style={{ margin: '0 0 16px', fontSize: 32 }}>Абонементы</h2>

        <div style={{ display: 'grid', gap: 10 }}>
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              style={{
                background:
                  selectedPlan === plan.title
                    ? 'rgba(204,255,0,0.08)'
                    : 'rgba(255,255,255,0.04)',
                border:
                  selectedPlan === plan.title
                    ? '1px solid rgba(204,255,0,0.24)'
                    : '1px solid rgba(255,255,255,0.06)',
                borderRadius: 18,
                padding: 16
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{plan.title}</div>
              <div style={{ color: '#CCFF00', fontWeight: 800, marginBottom: 12 }}>
                {plan.price}
              </div>

              <button
                onClick={() => choosePlan(plan)}
                style={{
                  width: '100%',
                  ...buttonGhost,
                  padding: '12px 14px'
                }}
              >
                Оформить демо-оплату
              </button>
            </div>
          ))}
        </div>

        {paymentNote && (
          <div
            style={{
              marginTop: 14,
              background: 'rgba(204,255,0,0.08)',
              border: '1px solid rgba(204,255,0,0.12)',
              borderRadius: 18,
              padding: 16,
              color: 'rgba(255,255,255,0.92)'
            }}
          >
            {paymentNote}
          </div>
        )}
      </section>

      <section style={cardStyle}>
        <div style={badgeStyle}>ПРАВИЛО КЛУБА</div>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6 }}>
          При отмене менее чем за 3 часа занятие считается использованным.
        </p>
      </section>
    </>
  );

  const renderNutrition = () => (
    <>
      <section style={cardStyle}>
        <div style={badgeStyle}>ПИТАНИЕ</div>
        <h2 style={{ margin: '0 0 16px', fontSize: 32 }}>AI-нутрициолог</h2>

        {!nutritionUnlocked ? (
          <>
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 18,
                padding: 18,
                marginBottom: 14
              }}
            >
              <p style={{ margin: 0, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)' }}>
                Персональный план питания, калории по формуле Миффлина–Сан Жеора,
                конструктор меню, вода и дневник питания.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(204,255,0,0.08)',
                border: '1px solid rgba(204,255,0,0.12)',
                borderRadius: 20,
                padding: 20,
                marginBottom: 14
              }}
            >
              <div style={{ fontSize: 14, color: '#CCFF00', marginBottom: 10 }}>
                ПРЕМИУМ ДОСТУП
              </div>
              <div style={{ fontSize: 34, fontWeight: 900, marginBottom: 8 }}>299 ₽ / мес</div>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                3 дня бесплатно. Затем — полный доступ к питанию.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <button onClick={() => activateNutrition('trial')} style={buttonPrimary}>
                3 дня бесплатно
              </button>
              <button onClick={() => activateNutrition('paid')} style={buttonGhost}>
                Купить демо
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                background: 'rgba(204,255,0,0.08)',
                border: '1px solid rgba(204,255,0,0.12)',
                borderRadius: 18,
                padding: 16,
                marginBottom: 14
              }}
            >
              {nutritionMode === 'trial'
                ? 'Пробный доступ к питанию активен'
                : 'Премиум-доступ к питанию активен'}
            </div>

            <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
              <input
                style={inputStyle}
                placeholder="Вес, кг"
                value={nutritionForm.weight}
                onChange={(e) =>
                  setNutritionForm((prev) => ({ ...prev, weight: e.target.value }))
                }
              />
              <input
                style={inputStyle}
                placeholder="Рост, см"
                value={nutritionForm.height}
                onChange={(e) =>
                  setNutritionForm((prev) => ({ ...prev, height: e.target.value }))
                }
              />
              <input
                style={inputStyle}
                placeholder="Возраст"
                value={nutritionForm.age}
                onChange={(e) =>
                  setNutritionForm((prev) => ({ ...prev, age: e.target.value }))
                }
              />

              <select
                style={inputStyle}
                value={nutritionForm.sex}
                onChange={(e) =>
                  setNutritionForm((prev) => ({ ...prev, sex: e.target.value }))
                }
              >
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </select>

              <select
                style={inputStyle}
                value={nutritionForm.activity}
                onChange={(e) =>
                  setNutritionForm((prev) => ({ ...prev, activity: e.target.value }))
                }
              >
                <option value="1.55">Базовая активность 1.55</option>
                <option value="1.725">Интенсивный бокс 1.725</option>
              </select>

              <select
                style={inputStyle}
                value={nutritionForm.meals}
                onChange={(e) =>
                  setNutritionForm((prev) => ({ ...prev, meals: e.target.value }))
                }
              >
                <option value="3">3 приёма пищи</option>
                <option value="4">4 приёма пищи</option>
                <option value="5">5 приёмов пищи</option>
              </select>
            </div>

            <div style={cardStyle}>
              <div style={badgeStyle}>КАЛОРИИ</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#CCFF00' }}>
                {calories || '—'} ккал
              </div>
              <p style={{ marginBottom: 0, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6 }}>
                Расчёт по формуле Миффлина–Сан Жеора.
              </p>
            </div>

            <section style={cardStyle}>
              <div style={badgeStyle}>ПЛАН ПИТАНИЯ</div>
              <h3 style={{ marginTop: 0, fontSize: 26 }}>Распределение по приёмам пищи</h3>

              <div style={{ display: 'grid', gap: 10 }}>
                {mealPlan.map((meal) => (
                  <div
                    key={meal.name}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 18,
                      padding: 16
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
                      {meal.name}
                    </div>
                    <div style={{ color: '#CCFF00', fontWeight: 800, marginBottom: 10 }}>
                      {meal.kcal} ккал
                    </div>
                    <div style={{ display: 'grid', gap: 6 }}>
                      {meal.ideas.map((idea) => (
                        <div key={idea} style={{ color: 'rgba(255,255,255,0.82)' }}>
                          • {idea}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section style={cardStyle}>
              <div style={badgeStyle}>ВОДА</div>
              <h3 style={{ marginTop: 0, fontSize: 26 }}>Трекер воды</h3>

              <div style={{ fontSize: 34, fontWeight: 900, color: '#CCFF00', marginBottom: 14 }}>
                {waterMl} мл
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                <button onClick={() => addWater(250)} style={buttonGhost}>+250 мл</button>
                <button onClick={() => addWater(500)} style={buttonGhost}>+500 мл</button>
                <button onClick={() => setWaterMl(0)} style={buttonGhost}>Сброс</button>
              </div>
            </section>

            <section style={cardStyle}>
              <div style={badgeStyle}>ДНЕВНИК ЕДЫ</div>
              <h3 style={{ marginTop: 0, fontSize: 26 }}>Что вы съели</h3>

              <div style={{ display: 'grid', gap: 12 }}>
                <input
                  style={inputStyle}
                  placeholder='Например: "съел 2 яйца и банан"'
                  value={foodInput}
                  onChange={(e) => setFoodInput(e.target.value)}
                />
                <button onClick={addFoodEntry} style={buttonPrimary}>
                  Добавить запись
                </button>
              </div>

              <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
                {foodEntries.length === 0 ? (
                  <div style={{ color: 'rgba(255,255,255,0.65)' }}>Пока нет записей.</div>
                ) : (
                  foodEntries.map((entry, index) => (
                    <div
                      key={`${entry}-${index}`}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 16,
                        padding: 14
                      }}
                    >
                      {entry}
                    </div>
                  ))
                )}
              </div>
            </section>
          </>
        )}
      </section>
    </>
  );

  const renderRatings = () => (
    <>
      <section style={cardStyle}>
        <div style={badgeStyle}>РЕЙТИНГ ОФП</div>
        <h2 style={{ margin: '0 0 16px', fontSize: 32 }}>Ваши результаты</h2>

        <div style={{ display: 'grid', gap: 12 }}>
          {EXERCISES.map((item) => (
            <div key={item.id}>
              <div style={{ marginBottom: 8, fontWeight: 700 }}>{item.name}</div>
              <input
                style={inputStyle}
                placeholder="Введите результат"
                value={results[item.id]}
                onChange={(e) => updateResult(item.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <div style={badgeStyle}>ИТОГ</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: '#CCFF00', marginBottom: 6 }}>
          {totalScore}
        </div>
        <p style={{ marginTop: 0, color: 'rgba(255,255,255,0.82)' }}>{achievement}</p>
      </section>

      <section style={cardStyle}>
        <div style={badgeStyle}>ТОП КЛУБА</div>
        <h3 style={{ marginTop: 0, fontSize: 26 }}>Лидеры</h3>

        <div style={{ display: 'grid', gap: 10 }}>
          {leaderboard.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 18,
                padding: 14,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{index + 1}. {item.name}</span>
              <strong style={{ color: '#CCFF00' }}>{item.score}</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  const renderProfile = () => (
    <>
      <section style={cardStyle}>
        <div style={badgeStyle}>ПРОФИЛЬ</div>
        <h2 style={{ margin: '0 0 16px', fontSize: 32 }}>Личный кабинет</h2>

        <div style={{ display: 'grid', gap: 12 }}>
          <input
            style={inputStyle}
            placeholder="Имя"
            value={profile.name}
            onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
          />
          <input
            style={inputStyle}
            placeholder="Телефон"
            value={profile.phone}
            onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
          />
          <input
            style={inputStyle}
            placeholder="Возраст"
            value={profile.age}
            onChange={(e) => setProfile((prev) => ({ ...prev, age: e.target.value }))}
          />

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: 14
            }}
          >
            <input
              type="checkbox"
              checked={profile.mei}
              onChange={(e) => setProfile((prev) => ({ ...prev, mei: e.target.checked }))}
            />
            Я студент МЭИ
          </label>
        </div>
      </section>

      <section style={cardStyle}>
        <div style={badgeStyle}>СТАТУС</div>

        <div style={{ display: 'grid', gap: 10 }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 18,
              padding: 16
            }}
          >
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
              Активный тариф
            </div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              {selectedPlan || 'Пока не выбран'}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 18,
              padding: 16
            }}
          >
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
              Записей в группы
            </div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{bookedWorkouts.length}</div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 18,
              padding: 16
            }}
          >
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
              Персональная тренировка
            </div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              {personalBooked ? 'Выбрана' : 'Не выбрана'}
            </div>
          </div>
        </div>
      </section>

      <section style={cardStyle}>
        <div style={badgeStyle}>МОИ ЗАПИСИ</div>
        <h3 style={{ marginTop: 0, fontSize: 26 }}>Бронирования</h3>

        {bookedWorkouts.length === 0 ? (
          <div style={{ color: 'rgba(255,255,255,0.65)' }}>Пока нет записей.</div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {bookedWorkouts.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  padding: 14
                }}
              >
                {item.day} — {item.time} · {item.type}
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={cardStyle}>
        <div style={badgeStyle}>ФОТО-ПРОГРЕСС</div>
        <h3 style={{ marginTop: 0, fontSize: 26 }}>До / После</h3>

        <div style={{ display: 'grid', gap: 12 }}>
          <div>
            <div style={{ marginBottom: 8, color: 'rgba(255,255,255,0.8)' }}>Фото “До”</div>
            <input type="file" accept="image/*" onChange={(e) => onPhotoChange(e, 'before')} />
          </div>

          {beforePhoto && (
            <img
              src={beforePhoto}
              alt="before"
              style={{
                width: '100%',
                borderRadius: 18,
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            />
          )}

          <div>
            <div style={{ marginBottom: 8, color: 'rgba(255,255,255,0.8)' }}>Фото “После”</div>
            <input type="file" accept="image/*" onChange={(e) => onPhotoChange(e, 'after')} />
          </div>

          {afterPhoto && (
            <img
              src={afterPhoto}
              alt="after"
              style={{
                width: '100%',
                borderRadius: 18,
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            />
          )}
        </div>
      </section>
    </>
  );

  return (
    <main style={appStyle}>
      <div style={wrapperStyle}>
        {tab === 'home' && renderHome()}
        {tab === 'schedule' && renderSchedule()}
        {tab === 'nutrition' && renderNutrition()}
        {tab === 'ratings' && renderRatings()}
        {tab === 'profile' && renderProfile()}
      </div>

      <nav
        style={{
          position: 'fixed',
          left: 12,
          right: 12,
          bottom: 12,
          maxWidth: 520,
          margin: '0 auto',
          background: 'rgba(20,20,20,0.96)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 22,
          padding: 10,
          display: 'flex',
          gap: 6,
          backdropFilter: 'blur(12px)'
        }}
      >
        {tabButton('home', 'Главная')}
        {tabButton('schedule', 'Расписание')}
        {tabButton('nutrition', 'Питание')}
        {tabButton('ratings', 'Рейтинг')}
        {tabButton('profile', 'Профиль')}
      </nav>
    </main>
  );
}