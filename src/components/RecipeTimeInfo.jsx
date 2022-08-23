import RecipeTimeData from './RecipeTimeData';

export default function RecipeTimeInfo({ className }) {
  return (
    <div
      className={`flex bg-[rgba(255,255,255,0.4)] text-white text-8xl py-4 rounded-l-3xl ${className}`}
    >
      <RecipeTimeData time="30" label="Prep Time" />
      <RecipeTimeData time="15" label="Cook Time" />
      <RecipeTimeData time="45" label="Total Time" />
    </div>
  );
}
