import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ButtonDialog from './ButtonDialog';
import IngredientSearch from './IngredientSearch';
import AdminPage from './pages/AdminPage';
import Homepage from './pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <ButtonDialog className="px-2 text-xl bg-yellow-300" content="Filters">
        <IngredientSearch />
      </ButtonDialog>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
