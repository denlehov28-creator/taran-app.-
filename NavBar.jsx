import React from 'react';
import { NavLink } from 'react-router-dom';

// Icon components receive an 'active' prop to change color
function HomeIcon({ active }) {
  const stroke = active ? 'var(--accent)' : 'currentColor';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 9l9-7 9 7" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

function CalendarIcon({ active }) {
  const stroke = active ? 'var(--accent)' : 'currentColor';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function FoodIcon({ active }) {
  const stroke = active ? 'var(--accent)' : 'currentColor';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 16h8" />
      <path d="M8 12h8" />
      <path d="M12 8h0" />
    </svg>
  );
}

function TrophyIcon({ active }) {
  const stroke = active ? 'var(--accent)' : 'currentColor';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M5 4v2a2 2 0 0 0 2 2" />
      <path d="M19 4v2a2 2 0 0 1-2 2" />
    </svg>
  );
}

function UserIcon({ active }) {
  const stroke = active ? 'var(--accent)' : 'currentColor';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const navItems = [
  { path: '/', label: 'Лента', Icon: HomeIcon },
  { path: '/schedule', label: 'Расписание', Icon: CalendarIcon },
  { path: '/nutrition', label: 'Питание', Icon: FoodIcon },
  { path: '/ratings', label: 'Рейтинги', Icon: TrophyIcon },
  { path: '/profile', label: 'Профиль', Icon: UserIcon }
];

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-gray-700 backdrop-blur-lg z-10">
      <ul className="flex justify-around items-center py-2">
        {navItems.map(({ path, label, Icon }) => (
          <li key={path} className="flex-1">
            <NavLink
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center text-xs font-medium',
                  isActive ? 'text-accent' : 'text-gray-400'
                ].join(' ')
              }
            >
              {({ isActive }) => <Icon active={isActive} />}
              <span className="mt-1">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}