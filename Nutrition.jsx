import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient.js';

/**
 * Компонент «Питание» предоставляет платный раздел с персонализированным рационом.
 * Пользователь должен оформить подписку (299 ₽/мес). Платформа поддерживает
 * 3‑дневный пробный период. После оформления подписки открываются функции:
 *  - Анкетирование (рост, вес, возраст, обхваты)
 *  - Автоматический расчёт суточной калорийности (Миффлин – Сан Жеор)
 *  - Выбор количества приёмов пищи (3–5)
 *  - Генерация меню с адаптивной граммовкой
 *  - Трекер воды и учёт рациона
 */
export default function Nutrition({ session }) {
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Questionnaire state
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activity, setActivity] = useState('1.55');
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [calories, setCalories] = useState(null);
  const [dailyPlan, setDailyPlan] = useState(null);
  const [water, setWater] = useState(0);

  useEffect(() => {
    // Check subscription status for nutrition
    const checkSub = async () => {
      setLoading(true);
      try {
        const { data: user } = await supabase.auth.getUser();
        if (!user?.id) {
          setHasSubscription(false);
          return;
        }
        const { data, error } = await supabase
          .from('subscriptions')
          .select('status, product')
          .eq('user_id', user.id)
          .eq('product', 'nutrition')
          .single();
        if (!error && data?.status === 'active') {
          setHasSubscription(true);
        } else {
          setHasSubscription(false);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    checkSub();
  }, [session]);

  const calculateCalories = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (isNaN(w) || isNaN(h) || isNaN(a)) {
      alert('Заполните все поля.');
      return;
    }
    // Mifflin-St Jeor formula
    const base = 10 * w + 6.25 * h - 5 * a + (gender === 'male' ? 5 : -161);
    const activityFactor = parseFloat(activity);
    const totalCalories = Math.round(base * activityFactor);
    setCalories(totalCalories);
    generateMealPlan(totalCalories);
  };

  const generateMealPlan = (totalCalories) => {
    // Distribute calories according to breakfast 25%, lunch 35%, dinner 25%, snack 15%
    const meals = [];
    const mealCount = parseInt(mealsPerDay);
    const distribution = mealCount === 3
      ? [0.3, 0.4, 0.3] // breakfast 30%, lunch 40%, dinner 30%
      : mealCount === 4
        ? [0.25, 0.35, 0.25, 0.15]
        : [0.25, 0.35, 0.25, 0.1, 0.05];
    const mealNames = mealCount === 3
      ? ['Завтрак', 'Обед', 'Ужин']
      : mealCount === 4
        ? ['Завтрак', 'Обед', 'Ужин', 'Перекус']
        : ['Завтрак', 'Перекус', 'Обед', 'Перекус 2', 'Ужин'];
    for (let i = 0; i < mealCount; i++) {
      const caloriesForMeal = Math.round(totalCalories * distribution[i]);
      // Generate simple recipe suggestions (static examples)
      const recipes = getSampleRecipes(i + 1);
      meals.push({ name: mealNames[i], calories: caloriesForMeal, recipes });
    }
    setDailyPlan(meals);
  };

  function getSampleRecipes(index) {
    // Minimal static options; in production this would fetch from DB
    const options = [
      [
        { name: 'Овсяная каша с фруктами', ingredients: ['овсяные хлопья', 'молоко', 'яблоко'] },
        { name: 'Яичница с овощами', ingredients: ['яйца', 'помидоры', 'перец'] },
        { name: 'Творожная запеканка', ingredients: ['творог', 'яйца', 'ваниль'] }
      ],
      [
        { name: 'Куриная грудка с рисом', ingredients: ['куриная грудка', 'рис', 'овощи'] },
        { name: 'Паста с индейкой', ingredients: ['паста', 'филе индейки', 'соус'] },
        { name: 'Салат с тунцом', ingredients: ['зелень', 'тунец', 'яйцо'] }
      ],
      [
        { name: 'Гречка с овощами', ingredients: ['гречка', 'морковь', 'лук'] },
        { name: 'Рыба на пару с картофелем', ingredients: ['рыба', 'картофель', 'специи'] },
        { name: 'Овощное рагу', ingredients: ['баклажан', 'кабачок', 'перец'] }
      ],
      [
        { name: 'Йогурт с ягодами', ingredients: ['йогурт', 'ягоды', 'мёд'] },
        { name: 'Орехи и сухофрукты', ingredients: ['микс орехов', 'курага', 'изюм'] },
        { name: 'Смузи с бананом', ingredients: ['банан', 'кефир', 'овсянка'] }
      ],
      [
        { name: 'Легкий омлет', ingredients: ['яйца', 'шпинат', 'сыр'] },
        { name: 'Крем‑суп из тыквы', ingredients: ['тыква', 'сливки', 'лук'] },
        { name: 'Бурый рис с овощами', ingredients: ['бурый рис', 'грибы', 'болгарский перец'] }
      ]
    ];
    return options[index % options.length];
  }

  const increaseWater = () => setWater((w) => w + 250);
  const resetWater = () => setWater(0);

  if (loading) {
    return <p>Загрузка...</p>;
  }
  if (!hasSubscription) {
    return (
      <div>
        <h1 className="text-3xl font-impact mb-4 text-accent">Питание</h1>
        <p className="mb-4">Доступ к разделу «Питание» платный (299 ₽/мес). Три дня бесплатно.</p>
        <button className="px-4 py-2 bg-accent text-black rounded-md mb-2">Оформить подписку</button>
        <p className="text-sm text-gray-400">После оформления вы получите персональные рекомендации по рациону.</p>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-impact mb-4 text-accent">Питание</h1>
      <section className="glass p-4 rounded-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">Анкетирование</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Вес (кг)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="p-2 rounded-md bg-gray-800 text-white" />
          </div>
          <div className="flex flex-col">
            <label>Рост (см)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="p-2 rounded-md bg-gray-800 text-white" />
          </div>
          <div className="flex flex-col">
            <label>Возраст</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="p-2 rounded-md bg-gray-800 text-white" />
          </div>
          <div className="flex flex-col">
            <label>Пол</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="p-2 rounded-md bg-gray-800 text-white">
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Активность</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)} className="p-2 rounded-md bg-gray-800 text-white">
              <option value="1.55">Умеренная (1.55)</option>
              <option value="1.725">Интенсивный бокс (1.725)</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Приёмов пищи</label>
            <select value={mealsPerDay} onChange={(e) => setMealsPerDay(e.target.value)} className="p-2 rounded-md bg-gray-800 text-white">
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>
        <button onClick={calculateCalories} className="mt-4 px-3 py-2 bg-accent text-black rounded-md font-semibold hover:bg-lime-300 transition-colors">Рассчитать</button>
        {calories && (
          <p className="mt-2 text-sm text-gray-300">Суточная потребность: {calories} ккал</p>
        )}
      </section>
      {dailyPlan && (
        <section className="glass p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-2">Ваш рацион</h2>
          <div className="space-y-4">
            {dailyPlan.map((meal, idx) => (
              <div key={idx} className="p-3 bg-gray-900/50 rounded-lg">
                <h3 className="font-semibold text-accent">{meal.name} – {meal.calories} ккал</h3>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  {meal.recipes.map((r, i) => (
                    <li key={i}>{r.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="glass p-4 rounded-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">Трекер воды</h2>
        <p className="mb-2">Выпито сегодня: {water} мл</p>
        <div className="flex space-x-2">
          <button onClick={increaseWater} className="px-3 py-2 bg-accent text-black rounded-md">+250 мл</button>
          <button onClick={resetWater} className="px-3 py-2 bg-gray-700 rounded-md">Сброс</button>
        </div>
      </section>
      <section className="glass p-4 rounded-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">ИИ‑сканер еды</h2>
        <FoodScanner />
      </section>
    </div>
  );
}

function FoodScanner() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const handleScan = () => {
    if (!input.trim()) return;
    // Simulate AI scan: parse quantity and product; in real app call AI API
    setResult(`Вы съели: ${input}. (Функция в разработке)`);
    setInput('');
  };
  return (
    <div>
      <div className="flex items-center space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Например: съел 2 яйца"
          className="flex-1 p-2 rounded-md bg-gray-800 text-white"
        />
        <button onClick={handleScan} className="px-3 py-2 bg-accent text-black rounded-md">Добавить</button>
      </div>
      {result && <p className="mt-2 text-sm text-gray-300">{result}</p>}
    </div>
  );
}