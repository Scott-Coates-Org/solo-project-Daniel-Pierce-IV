import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ingredient from '../firebase/models/Ingredient';
import RecipeIngredients from '../firebase/models/RecipeIngredients';
import ButtonDialog from './ButtonDialog';
import FilterForm from './forms/FilterForm';
import AdminPage from './pages/AdminPage';
import Homepage from './pages/HomePage';

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipesToShow, setRecipesToShow] = useState([]);
  const [mustHaveFilters, setMustHaveFilters] = useState([]);
  const [canHaveFilters, setCanHaveFilters] = useState([]);
  const [cantHaveFilters, setCantHaveFilters] = useState([]);

  useEffect(() => {
    Ingredient.getAll().then(setIngredients);
    RecipeIngredients.getAll().then(setRecipeIngredients);
  }, []);

  // Filter the recipes (as ids) to be shown to the user
  useEffect(() => {
    const filteredByMustHave = recipeIngredients.filter(applyMustHaveFilters);
    setRecipesToShow(filteredByMustHave);
  }, [mustHaveFilters]);

  // Filter out all recipes that do not include every must-have ingredient
  function applyMustHaveFilters(recipeMapping) {
    return (
      mustHaveFilters.length === 0 ||
      mustHaveFilters.every((filter) =>
        recipeMapping.ingredientIds.includes(filter.id)
      )
    );
  }

  function addToMustHaveFilters(ingredient) {
    setMustHaveFilters([...mustHaveFilters, ingredient]);
  }

  function removeFromMustHaveFilters(ingredient) {
    setMustHaveFilters(
      mustHaveFilters.filter((filter) => ingredient !== filter)
    );
  }

  function addToCanHaveFilters(ingredient) {
    setCanHaveFilters([...canHaveFilters, ingredient]);
  }

  function removeFromCanHaveFilters(ingredient) {
    setCanHaveFilters(canHaveFilters.filter((filter) => ingredient !== filter));
  }

  function addToCantHaveFilters(ingredient) {
    setCantHaveFilters([...cantHaveFilters, ingredient]);
  }

  function removeFromCantHaveFilters(ingredient) {
    setCantHaveFilters(
      cantHaveFilters.filter((filter) => ingredient !== filter)
    );
  }

  function hasActiveFilters() {
    return (
      mustHaveFilters.length > 0 ||
      canHaveFilters.length > 0 ||
      cantHaveFilters.length > 0
    );
  }

  return (
    <BrowserRouter>
      <ButtonDialog className="px-2 text-xl bg-yellow-300" content="Filters">
        <FilterForm
          ingredients={ingredients}
          mustHaveFilters={mustHaveFilters}
          canHaveFilters={canHaveFilters}
          cantHaveFilters={cantHaveFilters}
          onMustHaveSelect={addToMustHaveFilters}
          onMustHaveRemove={removeFromMustHaveFilters}
          onCanHaveSelect={addToCanHaveFilters}
          onCanHaveRemove={removeFromCanHaveFilters}
          onCantHaveSelect={addToCantHaveFilters}
          onCantHaveRemove={removeFromCantHaveFilters}
        />
      </ButtonDialog>

      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              recipesToShow={recipesToShow}
              isFiltered={hasActiveFilters()}
            />
          }
        />
        <Route
          path="/admin"
          element={<AdminPage ingredients={ingredients} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
