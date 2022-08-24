import { useState } from 'react';
import SearchIcon from './SearchIcon';

export default function IngredientSearch({
  ingredients,
  onUpdateSearchIngredients,
  setSearchbarEmpty,
}) {
  const [searchText, setSearchText] = useState('');

  function updateSearch(e) {
    setSearchText(e.target.value);

    // No text = no results. Dont filter unnecessarily
    if (e.target.value) {
      updateSearchIngredients(e.target.value);
      setSearchbarEmpty(false);
    } else {
      onUpdateSearchIngredients([]);
      setSearchbarEmpty(true);
    }
  }

  function updateSearchIngredients(text) {
    onUpdateSearchIngredients(
      ingredients?.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  }

  return (
    <div className="relative">
      <label
        htmlFor="ingredient-search"
        className="flex bg-recipe-red rounded-full items-center gap-2 pr-10 text-white"
      >
        <SearchIcon />

        <div className="relative grow">
          <input
            id="ingredient-search"
            type="text"
            className="peer w-full bg-transparent placeholder:text-transparent focus:placeholder:text-gray-800 placeholder-shown:select-none"
            onChange={updateSearch}
            value={searchText}
            placeholder="Chicken, rice, etc."
            autoComplete="off"
          />

          <span
            className={`absolute select-none cursor-text left-0 transition-transform peer-focus:-translate-y-[120%] ${
              searchText ? '-translate-y-[120%]' : ''
            }`}
          >
            Ingredient Search
          </span>
        </div>
      </label>

      {/* Clear the input and search results */}
      <button
        type="button"
        className=" absolute right-2 top-1/2 -translate-y-1/2 bg-recipe-gray-light text-white rounded-full"
        onClick={(e) => {
          const fakeEvent = { target: { value: '' } };
          updateSearch(fakeEvent);
        }}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </button>
    </div>
  );
}
