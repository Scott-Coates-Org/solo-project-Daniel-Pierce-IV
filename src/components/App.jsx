import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { auth } from '../firebase/client';
import Ingredient from '../firebase/models/Ingredient';
import RecipeIngredients from '../firebase/models/RecipeIngredients';
import filterRecipes from '../recipe-filter';
import AdminPage from './pages/AdminPage';
import Homepage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import { useAuthState } from 'react-firebase-hooks/auth';
import Favorite from '../firebase/models/Favorite';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './nav/Navbar';
import Sidebar from './Sidebar';

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipesToShow, setRecipesToShow] = useState([]);
  const [mustHaveFilters, setMustHaveFilters] = useState([]);
  const [canHaveFilters, setCanHaveFilters] = useState([]);
  const [cantHaveFilters, setCantHaveFilters] = useState([]);
  const [user] = useAuthState(auth);
  const [favorite, setFavorite] = useState();

  useEffect(() => {
    Ingredient.getAll().then(setIngredients);
    RecipeIngredients.getAll().then(setRecipeIngredients);
  }, []);

  useEffect(() => {
    if (user) {
      Favorite.getByCurrentUser().then(setFavorite);
    } else {
      setFavorite(null);
    }
  }, [user]);

  // Filter the recipes (as ids) to be shown to the user
  useEffect(() => {
    setRecipesToShow(
      filterRecipes(recipeIngredients, {
        mustHave: mustHaveFilters,
        cantHave: cantHaveFilters,
        canHave: canHaveFilters,
      })
    );
  }, [mustHaveFilters, cantHaveFilters, canHaveFilters]);

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

  function addToFavoriteRecipes({ id, name, description, imageURL }) {
    updateFavorite({
      ...favorite,
      recipes: [...favorite.recipes, { id, name, description, imageURL }],
    });
  }

  function removeFromFavoriteRecipes({ id }) {
    updateFavorite({
      ...favorite,
      recipes: favorite.recipes.filter((recipe) => recipe.id !== id),
    });
  }

  function updateFavorite(newFavorite) {
    Favorite.set(newFavorite);
    setFavorite(newFavorite);
  }

  return (
    <div className="grid grid-cols-[400px,1fr] grid-rows-[100px,1fr] bg-recipe-gray h-full">
      <div
        id="logo"
        className="text-6xl font-bold place-self-center text-white"
      >
        Bespork
      </div>

      <Navbar />

      <Sidebar
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

      <div className="size-container relative bg-recipe-gray-dark rounded-tl-[60px]">
        <main className="main-scrollbar absolute inset-0 left-28 overflow-y-auto">
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

            <Route path="recipes">
              <Route
                path=":id"
                element={
                  <RecipePage
                    favoriteRecipeIds={
                      favorite?.recipes.map((recipe) => recipe.id) ?? []
                    }
                    onFavorite={addToFavoriteRecipes}
                    onUnfavorite={removeFromFavoriteRecipes}
                  />
                }
              />
            </Route>

            <Route
              path="favorites"
              element={<FavoritesPage recipes={favorite?.recipes} />}
            />

            <Route
              path="/admin"
              element={<AdminPage ingredients={ingredients} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
