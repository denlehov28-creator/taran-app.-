import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient.js';

export default function Profile({ session }) {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [photoBefore, setPhotoBefore] = useState(null);
  const [photoAfter, setPhotoAfter] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data);
    };
    getUser();
  }, [session]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.id) {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', userData.id)
          .order('date_time', { ascending: true });
        if (!error) setBookings(data);
      }
    };
    fetchBookings();
  }, [session]);

  const handleUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === 'before') setPhotoBefore(url);
    else setPhotoAfter(url);
  };

  return (
    <div>
      <h1 className="text-3xl font-impact mb-4 text-accent">Профиль</h1>
      {user ? (
        <div>
          <p className="mb-1"><span className="text-gray-400">Email:</span> {user.email}</p>
          {/* Additional user fields can be shown here */}
          <p className="mb-4"><span className="text-gray-400">ID пользователя:</span> {user.id}</p>
        </div>
      ) : (
        <p className="mb-4">Войдите или зарегистрируйтесь, чтобы увидеть профиль.</p>
      )}
      <section className="glass p-4 rounded-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">Ваши бронирования</h2>
        {bookings.length === 0 ? (
          <p>У вас нет активных бронирований.</p>
        ) : (
          <ul className="list-disc ml-5 space-y-1 text-sm">
            {bookings.map((b, idx) => (
              <li key={idx}>{b.date_time} – {b.class_type}</li>
            ))}
          </ul>
        )}
      </section>
      <section className="glass p-4 rounded-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">Фото‑прогресс</h2>
        <p className="text-sm text-gray-400 mb-2">Загрузите фотографии "До" и "После". Сетка поможет сравнить форму.</p>
        <div className="flex space-x-4 mb-4">
          <div className="flex flex-col items-center">
            <label className="mb-1">До:</label>
            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'before')} className="text-sm" />
            {photoBefore && <ProgressImage src={photoBefore} />}
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1">После:</label>
            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'after')} className="text-sm" />
            {photoAfter && <ProgressImage src={photoAfter} />}
          </div>
        </div>
      </section>
      <section className="glass p-4 rounded-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">Профиль тренера</h2>
        <p><strong>Алексей Денисов</strong> – мастер спорта по боксу, опыт 15+ лет. Подготовит вас от новичка до профессионала.</p>
      </section>
    </div>
  );
}

function ProgressImage({ src }) {
  return (
    <div className="relative w-32 h-40 mt-2">
      <img src={src} alt="progress" className="w-full h-full object-cover rounded-md" />
      {/* Overlay grid */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 125"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.5"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={(i + 1) * 12.5} x2="100" y2={(i + 1) * 12.5} />
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <line key={`v-${i}`} x1={(i + 1) * 25} y1="0" x2={(i + 1) * 25} y2="125" />
        ))}
      </svg>
    </div>
  );
}