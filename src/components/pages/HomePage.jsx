import { collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/client';

export default function Homepage({}) {
  const [recipes] = useCollectionData(collection(db, 'recipes'));

  return (
    recipes &&
    recipes.map((recipe, index) => (
      <div className="mb-3" key={index}>
        <div>{recipe.name}</div>
        <div>{recipe.description}</div>
      </div>
    ))
  );
}
