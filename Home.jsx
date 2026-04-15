import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient.js';
import Post from '../components/Post.jsx';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from Supabase (public view) sorted by created_at desc
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
    // Fetch premium access status from Supabase (optional)
    // Example: check subscription
    const checkSubscription = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user?.id) {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('status')
          .eq('user_id', user.id)
          .single();
        if (!error && data?.status === 'active') {
          setHasPremiumAccess(true);
        }
      }
    };
    checkSubscription();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-impact mb-4 text-accent">TARAN • Лента</h1>
      {loading && <p>Загрузка постов...</p>}
      {error && <p className="text-red-500">Ошибка: {error}</p>}
      {!loading && posts.length === 0 && <p>Пока нет публикаций.</p>}
      {posts.map((post) => (
        <Post key={post.id} post={post} hasPremiumAccess={hasPremiumAccess} />
      ))}
    </div>
  );
}