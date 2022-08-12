import FilterChip from './FilterChip';

export default function CantHaveChip({ onRemove, children }) {
  return (
    <FilterChip colorClass="bg-red-300" onRemove={onRemove}>
      {children}
    </FilterChip>
  );
}
