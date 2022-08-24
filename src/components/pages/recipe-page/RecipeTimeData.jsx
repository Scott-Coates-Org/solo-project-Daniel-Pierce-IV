import ClockIcon from './ClockIcon';

export default function RecipeTimeData({ time, label }) {
  return (
    <div className="text-center">
      <div className="flex">
        <p className="text-5xl">{time}</p>

        <div className="flex flex-col items-center">
          <p className="text-sm">mins</p>

          <ClockIcon />
        </div>
      </div>

      <p className="text-sm">{label}</p>
    </div>
  );
}
