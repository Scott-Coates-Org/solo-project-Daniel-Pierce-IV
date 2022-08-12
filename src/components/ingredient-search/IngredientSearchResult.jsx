import CanHaveButtonIcon from './CanHaveButtonIcon';
import CantHaveButtonIcon from './CantHaveButtonIcon';
import MustHaveButtonIcon from './MustHaveButtonIcon';

export default function IngredientSearchResult({
  name,
  onMustHaveSelect,
  onCanHaveSelect,
  onCantHaveSelect,
}) {
  return (
    <div className="p-2 bg-blue-200 flex justify-between">
      <span>{name}</span>

      <div className="flex gap-2">
        <button type="button" onClick={onMustHaveSelect}>
          <MustHaveButtonIcon />
        </button>

        <button type="button" onClick={onCanHaveSelect}>
          <CanHaveButtonIcon />
        </button>

        <button type="button" onClick={onCantHaveSelect}>
          <CantHaveButtonIcon />
        </button>
      </div>
    </div>
  );
}
