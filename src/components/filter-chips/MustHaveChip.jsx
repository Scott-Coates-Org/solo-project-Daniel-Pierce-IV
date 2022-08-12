import FilterChip from './FilterChip';

export default function MustHaveChip({ onRemove, children }) {
  return (
    <FilterChip colorClass="bg-green-300" onRemove={onRemove}>
      {children}
    </FilterChip>
  );
}
