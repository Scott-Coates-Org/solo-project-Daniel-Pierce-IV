import ChipRemover from './ChipRemover';

export default function FilterChip({ colorClass = 'bg-gray-100', children }) {
  return (
    <li
      className={`ingredient-chip rounded-full flex gap-4 px-2 py-0.5 ${colorClass}`}
    >
      <span className="text-black text-xl">{children}</span>

      <button className="text-gray-600" type="button">
        <ChipRemover />
      </button>
    </li>
  );
}
