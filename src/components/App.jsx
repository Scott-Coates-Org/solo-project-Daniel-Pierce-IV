import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Ingredients } from '../firebase/models/ingredients';
import ButtonDialog from './ButtonDialog';
import FilterForm from './forms/FilterForm';
import AdminPage from './pages/AdminPage';
import Homepage from './pages/HomePage';

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [selections, setSelections] = useState([]);

  useEffect(() => {
    Ingredients.allThen(setIngredients);
  }, []);

  function addToSelections(ingredientName) {
    setSelections([...selections, ingredientName]);
  }

  return (
    <BrowserRouter>
      <ButtonDialog className="px-2 text-xl bg-yellow-300" content="Filters">
        <FilterForm
          ingredients={ingredients}
          selections={selections}
          onSelect={addToSelections}
        />
      </ButtonDialog>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
