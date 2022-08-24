import RecipeInstructionData from './RecipeInstructionData';

export default function RecipeInstructionInfo({ instructions }) {
  return (
    <div className="text-white">
      <div className="text-4xl mb-6">Instructions</div>

      <ul className="flex flex-col gap-6">
        {instructions.map((instruction, i) => (
          <RecipeInstructionData
            key={i}
            stepNumber={i + 1}
            instruction={instruction}
          />
        ))}
      </ul>
    </div>
  );
}
