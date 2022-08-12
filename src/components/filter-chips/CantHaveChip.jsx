import FilterChip from './FilterChip';

export default function CantHaveChip({ children }) {
  return <FilterChip colorClass="bg-red-300">{children}</FilterChip>;
}
