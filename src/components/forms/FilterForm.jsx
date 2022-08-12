import CanHaveChip from '../filter-chips/CanHaveChip';
import CantHaveChip from '../filter-chips/CantHaveChip';
import MustHaveChip from '../filter-chips/MustHaveChip';
import IngredientSearch from '../ingredient-search/IngredientSearch';

export default function FilterForm({
  ingredients,
  mustHaveFilters,
  canHaveFilters,
  cantHaveFilters,
  onMustHaveSelect,
  onCanHaveSelect,
  onCantHaveSelect,
}) {
  return (
    <form action="" className="flex items-start">
      <IngredientSearch
        ingredients={ingredients}
        onMustHaveSelect={onMustHaveSelect}
        onCanHaveSelect={onCanHaveSelect}
        onCantHaveSelect={onCantHaveSelect}
      />

      <ul className="selections flex flex-wrap items-start gap-2">
        {mustHaveFilters.map((selection) => (
          <MustHaveChip key={selection.id}>{selection.name}</MustHaveChip>
        ))}

        {canHaveFilters.map((selection) => (
          <CanHaveChip key={selection.id}>{selection.name}</CanHaveChip>
        ))}

        {cantHaveFilters.map((selection) => (
          <CantHaveChip key={selection.id}>{selection.name}</CantHaveChip>
        ))}
      </ul>
    </form>
  );
}
