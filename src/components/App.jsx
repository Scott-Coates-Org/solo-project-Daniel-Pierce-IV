import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Ingredients } from '../firebase/models/ingredients';
import ButtonDialog from './ButtonDialog';
import FilterForm from './forms/FilterForm';
import AdminPage from './pages/AdminPage';
import Homepage from './pages/HomePage';

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [mustHaveFilters, setMustHaveFilters] = useState([]);
  const [canHaveFilters, setCanHaveFilters] = useState([]);
  const [cantHaveFilters, setCantHaveFilters] = useState([]);

  useEffect(() => {
    Ingredients.getAllThen(setIngredients);
  }, []);

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
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
