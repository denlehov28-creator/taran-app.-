export default function App() {
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

  const sectionStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '22px',
    padding: '20px',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, rgba(204,255,0,0.08), transparent 30%), #101010',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        padding: '20px 16px 40px'
      }}
    >
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <section
          style={{
            ...sectionStyle,
            padding: '28px 20px',
            textAlign: 'center',
            marginBottom: 16
          }}
        >
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
              fontWeight: 900,
              letterSpacing: 1
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
            <a
              href="#schedule"
              style={{
                textDecoration: 'none',
                background: '#CCFF00',
                color: '#101010',
                padding: '14px 12px',
                borderRadius: 16,
                fontWeight: 800,
                textAlign: 'center'
              }}
            >
              Смотреть расписание
            </a>

            <a
              href="#prices"
              style={{
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                padding: '14px 12px',
                borderRadius: 16,
                fontWeight: 700,
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              Цены
            </a>
          </div>
        </section>

        <section style={{ ...sectionStyle, marginBottom: 16 }}>
          <div
            style={{
              fontSize: 12,
              color: '#CCFF00',
              fontWeight: 800,
              letterSpacing: 1,
              marginBottom: 8
            }}
          >
            ТРЕНЕР
          </div>

          <h2 style={{ margin: '0 0 8px', fontSize: 28 }}>
            Алексей Денисов
          </h2>

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

        <section id="schedule" style={{ ...sectionStyle, marginBottom: 16 }}>
          <div
            style={{
              fontSize: 12,
              color: '#CCFF00',
              fontWeight: 800,
              letterSpacing: 1,
              marginBottom: 8
            }}
          >
            РАСПИСАНИЕ
          </div>

          <h2 style={{ margin: '0 0 16px', fontSize: 28 }}>
            Ближайшие группы
          </h2>

          <div style={{ display: 'grid', gap: 10 }}>
            {schedule.map((item) => (
              <div
                key={item}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  padding: '14px 14px',
                  fontSize: 15,
                  lineHeight: 1.4
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="prices" style={{ ...sectionStyle, marginBottom: 16 }}>
          <div
            style={{
              fontSize: 12,
              color: '#CCFF00',
              fontWeight: 800,
              letterSpacing: 1,
              marginBottom: 8
            }}
          >
            ЦЕНЫ
          </div>

          <h2 style={{ margin: '0 0 16px', fontSize: 28 }}>
            Тарифы клуба
          </h2>

          <div style={{ display: 'grid', gap: 10 }}>
            {prices.map((item) => (
              <div
                key={item}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  padding: '14px 14px',
                  fontSize: 15
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            ...sectionStyle,
            textAlign: 'center'
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: '#CCFF00',
              fontWeight: 800,
              letterSpacing: 1,
              marginBottom: 8
            }}
          >
            СКОРО
          </div>

          <h2 style={{ margin: '0 0 10px', fontSize: 28 }}>
            Следующий этап
          </h2>

          <p
            style={{
              margin: 0,
              color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.6,
              fontSize: 16
            }}
          >
            Подключим личный кабинет, ленту клуба, профиль спортсмена и запись
            на тренировки.
          </p>
        </section>
      </div>
    </main>
  );
}