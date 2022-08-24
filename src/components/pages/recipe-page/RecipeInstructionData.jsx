export default function RecipeInstructionData({ instruction, stepNumber }) {
  return (
    <li className="flex items-center gap-6">
      <div className="flex justify-center items-center text-3xl min-w-[48px] h-12 rounded-full bg-recipe-red ">
        {stepNumber}
      </div>

      <p className="text-xl">{instruction}</p>
    </li>
  );
}
