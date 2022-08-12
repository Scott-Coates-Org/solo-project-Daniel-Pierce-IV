import FilterChip from './FilterChip';

export default function CanHaveChip({ onRemove, children }) {
  return (
    <FilterChip colorClass="bg-gray-300" onRemove={onRemove}>
      {children}
    </FilterChip>
  );
}
