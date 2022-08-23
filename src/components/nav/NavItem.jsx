import { NavLink } from 'react-router-dom';

export default function NavItem({ url, icon: Icon, text }) {
  return (
    <li>
      <NavLink to={url}>
        {({ isActive }) => (
          <div
            className={`flex items-center gap-3 pr-3 rounded-full ${
              isActive ? 'bg-recipe-red' : 'hover:bg-recipe-gray-light'
            }`}
          >
            <Icon isActive={isActive} />
            <span>{text}</span>
          </div>
        )}
      </NavLink>
    </li>
  );
}
