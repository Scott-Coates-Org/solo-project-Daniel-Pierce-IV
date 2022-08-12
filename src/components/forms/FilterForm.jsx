import IngredientChip from '../IngredientChip';
import IngredientSearch from '../IngredientSearch';

export default function FilterForm({ ingredients, selections, onSelect }) {
  return (
    <form action="" className="flex items-start">
      <IngredientSearch ingredients={ingredients} onSelect={onSelect} />

      <ul className="selections flex flex-wrap items-start gap-2">
        {selections.map((selection) => (
          <IngredientChip key={selection.id}>{selection.name}</IngredientChip>
        ))}
      </ul>
    </form>
  );
}
