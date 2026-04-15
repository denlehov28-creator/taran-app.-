import React from 'react';

export default function Post({ post, hasPremiumAccess }) {
  const isLocked = post.is_premium && !hasPremiumAccess;

  return (
    <div className="glass p-4 mb-4 rounded-lg relative">
      {isLocked && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center rounded-lg text-center">
          <p className="mb-2 text-lg font-semibold">Премиум‑контент</p>
          <p className="mb-4 text-sm text-gray-300">Оформите подписку на питание, чтобы увидеть этот пост.</p>
          {/* CTA could link to nutrition page */}
        </div>
      )}
      <h2 className="font-impact text-2xl text-accent mb-2">{post.title}</h2>
      {post.imageUrl && (
        <img src={post.imageUrl} alt="фото" className="w-full h-auto rounded-md mb-2" />
      )}
      {post.videoUrl && (
        <video controls className="w-full rounded-md mb-2">
          <source src={post.videoUrl} type="video/mp4" />
        </video>
      )}
      <p className="text-sm leading-relaxed whitespace-pre-line mb-4">
        {post.content}
      </p>
      {/* Like and comment actions */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 text-gray-400 hover:text-accent transition-colors" disabled={isLocked}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M20.8 4.6c-1.1-1.3-2.8-2.1-4.5-2.1-1.5 0-3 .6-4.1 1.7L12 4.4l-.2-.2C10.6 3 9.1 2.4 7.6 2.4 5.9 2.4 4.2 3.3 3.1 4.6 1.5 6.4 1.5 9.3 3.1 11l8.9 9.4 8.9-9.4c1.6-1.7 1.6-4.6 0-6.4z" />
          </svg>
          <span>{post.likes || 0}</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-400 hover:text-accent transition-colors" disabled={isLocked}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>{post.comments_count || 0}</span>
        </button>
      </div>
    </div>
  );
}