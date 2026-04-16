import { useState } from 'react';

export default function App() {
  const [tab, setTab] = useState('home');

  const schedule = [
    'Пн / Ср / Пт — 07:00 · Утренняя',
    'Пн / Ср / Пт — 17:00 · Детская',
    'Пн / Ср / Пт — 18:00 · Новички',
    'Пн / Ср / Пт — 19:00 · Профи',
    'Вт / Чт — 20:00 · Взрослая',
    'Сб — 14:00 · Взрослая'
  ];

  const prices = [
    'Разовое занятие — 800 ₽',
    '2 раза в неделю — 4500 ₽',
    '2 раза в неделю (МЭИ) — 3500 ₽',
    '3 раза в неделю — 6000 ₽',
    '3 раза в неделю (МЭИ) — 5000 ₽',
    'Персональное занятие — 3000 ₽'
  ];

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

  const badgeStyle = {
    fontSize: 12,
    color: '#CCFF00',
    fontWeight: 800,
    letterSpacing: 1,
    marginBottom: 8
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
          <button
            onClick={() => setTab('schedule')}
            style={{
              background: '#CCFF00',
              color: '#101010',
              padding: '14px 12px',
              borderRadius: 16,
              fontWeight: 800,
              border: 'none',
              fontSize: 16
            }}
          >
            Смотреть расписание
          </button>

          <button
            onClick={() => setTab('profile')}
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              padding: '14px 12px',
              borderRadius: 16,
              fontWeight: 700,
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: 16
            }}
          >
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
        <div style={badgeStyle}>БЛИЖАЙШИЕ ГРУППЫ</div>
        <h2 style={{ margin: '0 0 16px', fontSize: 28 }}>Расписание</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {schedule.slice(0, 3).map((item) => (
            <div
              key={item}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                padding: '14px'
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </>
  );

  const renderSchedule = () => (
    <section style={cardStyle}>
      <div style={badgeStyle}>РАСПИСАНИЕ</div>
      <h2 style={{ margin: '0 0 16px', fontSize: 32 }}>Все тренировки</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {schedule.map((item) => (
          <div
            key={item}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 18,
              padding: '16px'
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
        {prices.map((item) => (
          <div
            key={item}
            style={{
              background: 'rgba(204,255,0,0.06)',
              border: '1px solid rgba(204,255,0,0.12)',
              borderRadius: 16,
              padding: '14px'
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );

  const renderNutrition = () => (
    <section style={cardStyle}>
      <div style={badgeStyle}>ПИТАНИЕ</div>
      <h2 style={{ margin: '0 0 16px', fontSize: 32 }}>AI-нутрициолог</h2>

      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 20,
          padding: 18,
          marginBottom: 14
        }}
      >
        <p style={{ margin: 0, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)' }}>
          Персональный план питания, расчёт калорий, трекер воды и подбор
          приёмов пищи.
        </p>
      </div>

      <div
        style={{
          background: 'rgba(204,255,0,0.08)',
          border: '1px solid rgba(204,255,0,0.12)',
          borderRadius: 20,
          padding: 20
        }}
      >
        <div style={{ fontSize: 14, color: '#CCFF00', marginBottom: 10 }}>
          ПРЕМИУМ ДОСТУП
        </div>
        <div style={{ fontSize: 34, fontWeight: 900, marginBottom: 8 }}>299 ₽ / мес</div>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
          3 дня бесплатно. Дальше — полноценный доступ к питанию и рецептам.
        </p>
      </div>
    </section>
  );

  const renderRatings = () => (
    <section style={cardStyle}>
      <div style={badgeStyle}>РЕЙТИНГ</div>
      <h2 style={{ margin: '0 0 16px', fontSize: 32 }}>ОФП и прогресс</h2>

      {[
        'Отжимания — 48',
        'Подтягивания — 12',
        'Приседания за 1 минуту — 62',
        'Скорость ударов — 138 уд/мин'
      ].map((item) => (
        <div
          key={item}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 18,
            padding: '14px',
            marginBottom: 10
          }}
        >
          {item}
        </div>
      ))}

      <div
        style={{
          marginTop: 10,
          background: 'rgba(204,255,0,0.08)',
          border: '1px solid rgba(204,255,0,0.12)',
          borderRadius: 18,
          padding: 16
        }}
      >
        Ваш текущий статус: <strong style={{ color: '#CCFF00' }}>ТОП-12 клуба</strong>
      </div>
    </section>
  );

  const renderProfile = () => (
    <section style={cardStyle}>
      <div style={badgeStyle}>ПРОФИЛЬ</div>
      <h2 style={{ margin: '0 0 16px', fontSize: 32 }}>Личный кабинет</h2>

      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 20,
          padding: 18,
          marginBottom: 12
        }}
      >
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
          Статус
        </div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Активный участник клуба</div>
      </div>

      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 20,
          padding: 18,
          marginBottom: 12
        }}
      >
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
          Абонемент
        </div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>3 раза в неделю</div>
      </div>

      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 20,
          padding: 18
        }}
      >
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
          Следующий шаг
        </div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>
          Подключим вход, Supabase и реальный профиль
        </div>
      </div>
    </section>
  );

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