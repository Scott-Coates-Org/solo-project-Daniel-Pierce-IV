import ClockIcon from './ClockIcon';

export default function RecipeTimeData({ time, label }) {
  return (
    <div className="flex flex-col items-center px-4 border-l-2 border-[rgba(255,255,255,0.5)] first:border-none">
      <div className="flex">
        <p>{time}</p>

        <div className="flex flex-col">
          <p className="text-lg">mins</p>

          <ClockIcon />
        </div>
      </div>

      <p className="text-lg">{label}</p>
    </div>
  );
}
