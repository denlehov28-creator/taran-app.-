import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient.js';

// Simple list of exercise tests (OФП / СФП)
const exercises = [
  { id: 1, name: 'Отжимания за 1 мин' },
  { id: 2, name: 'Подтягивания (кол-во)' },
  { id: 3, name: 'Приседания за 1 мин' },
  { id: 4, name: 'Жим лежа (кг)' },
  { id: 5, name: 'Скорость ударов (уд/мин)' }
];

export default function Ratings() {
  const [results, setResults] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch leaderboard from Supabase (aggregated results)
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('performance_scores')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);
      if (!error && data) {
        setLeaderboard(data);
      }
    };
    fetchLeaderboard();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.id) {
        alert('Необходимо войти для отправки результатов');
        return;
      }
      const entries = Object.entries(results).map(([exerciseId, value]) => ({
        user_id: user.id,
        exercise_id: parseInt(exerciseId),
        value: parseFloat(value)
      }));
      const { error } = await supabase.from('exercise_results').upsert(entries);
      if (error) throw error;
      alert('Результаты сохранены!');
    } catch (err) {
      alert('Ошибка: ' + err.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-impact mb-4 text-accent">Рейтинги ОФП</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {exercises.map((ex) => (
          <div key={ex.id} className="flex flex-col">
            <label className="mb-1">{ex.name}</label>
            <input
              type="number"
              value={results[ex.id] || ''}
              onChange={(e) => setResults({ ...results, [ex.id]: e.target.value })}
              className="p-2 rounded-md bg-gray-800 text-white"
            />
          </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-accent text-black rounded-md font-semibold hover:bg-lime-300 transition-colors">Сохранить результаты</button>
      </form>
      <section className="glass p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Топ 10</h2>
        {leaderboard.length === 0 ? (
          <p>Нет данных для рейтинга.</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="p-2">#</th>
                <th className="p-2">Участник</th>
                <th className="p-2">Сумма очков</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((row, index) => (
                <tr key={row.user_id} className="border-b border-gray-700">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{row.user_name || row.user_id}</td>
                  <td className="p-2">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}