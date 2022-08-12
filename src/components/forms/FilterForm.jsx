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
  onMustHaveRemove,
  onCanHaveSelect,
  onCanHaveRemove,
  onCantHaveSelect,
  onCantHaveRemove,
}) {
  return (
    <form action="" className="flex items-start">
      <IngredientSearch
        ingredients={ingredients}
        selectedIngredients={[
          ...mustHaveFilters,
          ...canHaveFilters,
          ...cantHaveFilters,
        ]}
        onMustHaveSelect={onMustHaveSelect}
        onCanHaveSelect={onCanHaveSelect}
        onCantHaveSelect={onCantHaveSelect}
      />

      <ul className="selections flex flex-wrap items-start gap-2">
        {mustHaveFilters.map((selection) => (
          <MustHaveChip
            key={selection.id}
            onRemove={onMustHaveRemove.bind(null, selection)}
          >
            {selection.name}
          </MustHaveChip>
        ))}

        {canHaveFilters.map((selection) => (
          <CanHaveChip
            key={selection.id}
            onRemove={onCanHaveRemove.bind(null, selection)}
          >
            {selection.name}
          </CanHaveChip>
        ))}

        {cantHaveFilters.map((selection) => (
          <CantHaveChip
            key={selection.id}
            onRemove={onCantHaveRemove.bind(null, selection)}
          >
            {selection.name}
          </CantHaveChip>
        ))}
      </ul>
    </form>
  );
}
