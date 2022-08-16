import { useState } from 'react';
import IngredientSearchResult from './IngredientSearchResult';

export default function IngredientSearch({
  ingredients,
  selectedIngredients,
  onMustHaveSelect,
  onCanHaveSelect,
  onCantHaveSelect,
}) {
  const [searchText, setSearchText] = useState('');

  function updateSearch(e) {
    setSearchText(e.target.value);
  }

  function searchIngredients() {
    if (searchText) {
      const ids = selectedIngredients.map((ingredient) => ingredient.id);

      return ingredients?.filter(
        (ingredient) =>
          ingredient.name.toLowerCase().includes(searchText.toLowerCase()) &&
          !ids.includes(ingredient.id)
      );
    }
  }

  return (
    <div className="flex flex-col w-60 h-[50vh]">
      <input
        type="text"
        className="border border-black"
        onChange={updateSearch}
        value={searchText}
        autoFocus
      />
      <div className="flex flex-col grow gap-1 bg-orange-300">
        {searchIngredients()?.map((ingredient) => (
          <IngredientSearchResult
            key={ingredient.id}
            name={ingredient.name}
            onMustHaveSelect={onMustHaveSelect.bind(null, ingredient)}
            onCanHaveSelect={onCanHaveSelect.bind(null, ingredient)}
            onCantHaveSelect={onCantHaveSelect.bind(null, ingredient)}
          />
        ))}
      </div>
    </div>
  );
}
