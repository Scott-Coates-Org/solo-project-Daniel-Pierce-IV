import { useEffect } from 'react';
import { useState } from 'react';
import { Ingredients } from '../firebase/models/ingredients';

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
    <div className="flex flex-col w-60">
      <input type="text" onChange={updateSearch} value={searchText} />
      <div className="flex flex-col">
        {searchIngredients()?.map((ingredient, i) => (
          <div key={ingredient.id}>{ingredient.name}</div>
        ))}
      </div>
    </div>
  );
}
