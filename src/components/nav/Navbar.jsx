import FavoriteIcon from './FavoriteIcon';
import HomeIcon from './HomeIcon';
import NavItem from './NavItem';

export default function Navbar() {
  return (
    <nav>
      <ul className="w-full h-full flex justify-end items-center gap-6 pr-6 text-white">
        <NavItem url="/" icon={HomeIcon} text="Home" />

        <NavItem url="/favorites" icon={FavoriteIcon} text="Favorites" />
      </ul>
    </nav>
  );
}
