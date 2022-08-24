import FillableIcon from './FillableIcon';

export default function NavIcon({ emptyPath, filledPath, isActive }) {
  return (
    <FillableIcon
      className={`w-9 h-9 p-1 rounded-full ${
        isActive ? 'bg-recipe-red-dark' : 'bg-recipe-gray-lighter'
      }`}
      isFilled={isActive}
      emptyPath={emptyPath}
      filledPath={filledPath}
    />
  );
}
