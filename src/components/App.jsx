import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Ingredients } from '../firebase/models/ingredients';
import ButtonDialog from './ButtonDialog';
import IngredientSearch from './IngredientSearch';
import AdminPage from './pages/AdminPage';
import Homepage from './pages/HomePage';

export default function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    Ingredients.allThen(setIngredients);
  }, []);

  return (
    <BrowserRouter>
      <ButtonDialog className="px-2 text-xl bg-yellow-300" content="Filters">
        <IngredientSearch ingredients={ingredients} />
      </ButtonDialog>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
