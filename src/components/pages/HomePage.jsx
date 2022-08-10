import { collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/client';
import RecipeCard from '../RecipeCard';

export default function Homepage({}) {
  const [recipes] = useCollectionData(collection(db, 'recipes'));

  return (
    recipes &&
    recipes.map((recipe, index) => <RecipeCard recipe={recipe} key={index} />)
  );
}
