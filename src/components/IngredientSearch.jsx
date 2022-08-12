import { useState } from 'react';
import IngredientSearchResult from './IngredientSearchResult';

export default function IngredientSearch({ ingredients, onSelect }) {
  const [searchText, setSearchText] = useState('');

  function updateSearch(e) {
    setSearchText(e.target.value);
  }

  function searchIngredients() {
    if (searchText) {
      return ingredients?.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchText.toLowerCase())
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
            onSelect={onSelect.bind(null, ingredient)}
          />
        ))}
      </div>
    </div>
  );
}
