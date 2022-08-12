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
    Ingredients.allThen(setIngredients);
  }, []);

  function addToMustHaveFilters(ingredientName) {
    setMustHaveFilters([...mustHaveFilters, ingredientName]);
  }

  function addToCanHaveFilters(ingredientName) {
    setCanHaveFilters([...canHaveFilters, ingredientName]);
  }

  function addToCantHaveFilters(ingredientName) {
    setCantHaveFilters([...cantHaveFilters, ingredientName]);
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
          onCanHaveSelect={addToCanHaveFilters}
          onCantHaveSelect={addToCantHaveFilters}
        />
      </ButtonDialog>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
