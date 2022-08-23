import CanHaveButtonIcon from './ingredient-search/CanHaveButtonIcon';
import CantHaveButtonIcon from './ingredient-search/CantHaveButtonIcon';
import MustHaveButtonIcon from './ingredient-search/MustHaveButtonIcon';

export default function IngredientFilter({
  name,
  isMustHave = false,
  isCanHave = false,
  isCantHave = false,
  onMustHaveSelect,
  onMustHaveRemove,
  onCanHaveSelect,
  onCanHaveRemove,
  onCantHaveSelect,
  onCantHaveRemove,
}) {
  function removeIfSelectedThen(callback) {
    if (isMustHave) onMustHaveRemove();
    if (isCanHave) onCanHaveRemove();
    if (isCantHave) onCantHaveRemove();

    callback();
  }

  return (
    <div className="flex justify-between items-center">
      <span>{name}</span>

      <div className="flex gap-3">
        <button
          type="button"
          className={`rounded-full p-0.5 ${
            isMustHave ? 'bg-yellow-300 text-recipe-gray' : ''
          }`}
          onClick={
            isMustHave
              ? onMustHaveRemove
              : removeIfSelectedThen.bind(null, onMustHaveSelect)
          }
        >
          <MustHaveButtonIcon />
        </button>

        <button
          type="button"
          className={`rounded-full p-0.5 ${
            isCanHave ? 'bg-recipe-green text-recipe-gray' : ''
          }`}
          onClick={
            isCanHave
              ? onCanHaveRemove
              : removeIfSelectedThen.bind(null, onCanHaveSelect)
          }
        >
          <CanHaveButtonIcon />
        </button>

        <button
          type="button"
          className={`rounded-full p-0.5 ${
            isCantHave ? 'bg-recipe-red text-recipe-gray' : ''
          }`}
          onClick={
            isCantHave
              ? onCantHaveRemove
              : removeIfSelectedThen.bind(null, onCantHaveSelect)
          }
        >
          <CantHaveButtonIcon />
        </button>
      </div>
    </div>
  );
}
