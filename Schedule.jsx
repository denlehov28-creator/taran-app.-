import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient.js';

// Predefined group schedule for the boxing club
const groupSchedule = [
  { day: 'Понедельник', times: [
    { time: '07:00', type: 'Утренняя' },
    { time: '17:00', type: 'Детская' },
    { time: '18:00', type: 'Новички' },
    { time: '19:00', type: 'Профи' }
  ] },
  { day: 'Вторник', times: [ { time: '20:00', type: 'Взрослая' } ] },
  { day: 'Среда', times: [
    { time: '07:00', type: 'Утренняя' },
    { time: '17:00', type: 'Детская' },
    { time: '18:00', type: 'Новички' },
    { time: '19:00', type: 'Профи' }
  ] },
  { day: 'Четверг', times: [ { time: '20:00', type: 'Взрослая' } ] },
  { day: 'Пятница', times: [
    { time: '07:00', type: 'Утренняя' },
    { time: '17:00', type: 'Детская' },
    { time: '18:00', type: 'Новички' },
    { time: '19:00', type: 'Профи' }
  ] },
  { day: 'Суббота', times: [ { time: '14:00', type: 'Взрослая' } ] }
];

export default function Schedule() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch existing bookings for current user (if logged in)
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const { data: user } = await supabase.auth.getUser();
        if (user?.id) {
          const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('user_id', user.id)
            .order('date_time', { ascending: true });
          if (error) throw error;
          setBookings(data || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleBook = async (day, time, type) => {
    // Book a group class for today or upcoming date
    // For simplicity, we create booking for next occurrence (not implemented schedule algorithm)
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.id) {
        alert('Для бронирования необходимо войти.');
        return;
      }
      const dateTimeString = `${day} ${time}`;
      const { error } = await supabase.from('bookings').insert({
        user_id: user.id,
        class_type: type,
        date_time: dateTimeString
      });
      if (error) throw error;
      // Refresh bookings
      setBookings((prev) => [...prev, { user_id: user.id, class_type: type, date_time: dateTimeString }]);
      alert('Бронирование успешно!');
    } catch (err) {
      alert('Ошибка бронирования: ' + err.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-impact mb-4 text-accent">Расписание</h1>
      <div className="space-y-4">
        {groupSchedule.map(({ day, times }) => (
          <div key={day}>
            <h2 className="text-xl font-semibold mb-2">{day}</h2>
            <ul className="space-y-2">
              {times.map(({ time, type }) => (
                <li key={time} className="glass p-3 flex justify-between items-center rounded-lg">
                  <div>
                    <p className="font-bold text-lg text-accent">{time}</p>
                    <p className="text-sm text-gray-300">{type}</p>
                  </div>
                  <button
                    onClick={() => handleBook(day, time, type)}
                    className="px-3 py-1 rounded-md bg-accent text-black font-semibold hover:bg-lime-300 transition-colors"
                  >
                    Записаться
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Personal training booking section */}
      <div className="mt-8">
        <h2 className="text-2xl font-impact mb-4 text-accent">Персональные тренировки</h2>
        <p className="text-gray-300 mb-2">Запишитесь на персональную тренировку с Алексеем Денисовым.</p>
        {/* In a real app, this would be a date/time picker. Here we use a simple input. */}
        <PersonalBookingForm />
      </div>
    </div>
  );
}

function PersonalBookingForm() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.id) {
        alert('Для бронирования необходимо войти.');
        return;
      }
      if (!date || !time) {
        alert('Пожалуйста, выберите дату и время.');
        return;
      }
      const dateTimeString = `${date} ${time}`;
      const { error } = await supabase.from('personal_bookings').insert({
        user_id: user.id,
        trainer: 'Алексей Денисов',
        date_time: dateTimeString
      });
      if (error) throw error;
      alert('Персональная тренировка забронирована!');
      setDate('');
      setTime('');
    } catch (err) {
      alert('Ошибка бронирования: ' + err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="glass p-4 rounded-lg space-y-4 max-w-sm">
      <div className="flex flex-col">
        <label htmlFor="date" className="mb-1">Дата:</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 rounded-md bg-gray-800 text-white"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="time" className="mb-1">Время:</label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 rounded-md bg-gray-800 text-white"
        />
      </div>
      <button type="submit" className="w-full px-3 py-2 rounded-md bg-accent text-black font-semibold hover:bg-lime-300 transition-colors">
        Забронировать
      </button>
    </form>
  );
}