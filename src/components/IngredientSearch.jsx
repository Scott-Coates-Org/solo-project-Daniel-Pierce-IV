import { useEffect } from 'react';
import { useState } from 'react';
import { Ingredients } from '../firebase/models/ingredients';
import IngredientSearchResult from './IngredientSearchResult';

export default function IngredientSearch({}) {
  const [ingredients, setIngredients] = useState();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    Ingredients.all().then((data) => setIngredients(data));
  }, []);

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
      />
      <div className="flex flex-col grow gap-1 bg-orange-300">
        {searchIngredients()?.map((ingredient, i) => (
          <IngredientSearchResult key={ingredient.id} name={ingredient.name} />
        ))}
      </div>
    </div>
  );
}
