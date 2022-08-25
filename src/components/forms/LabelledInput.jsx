export default function LabelledInput({
  label,
  id,
  value,
  type = 'text',
  minLength,
  onChange,
  required,
}) {
  const fontSizeClass = 'text-xl';

  return (
    <div className="w-full relative border border-recipe-gray-lighter">
      <input
        className={`peer w-full p-2 bg-transparent ${fontSizeClass}`}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
      />

      <div
        className={`absolute left-2 px-1 -translate-y-1/2 origin-left transition-all ${
          value ? 'top-0 scale-[85%]' : 'top-1/2'
        } ${fontSizeClass} peer-focus:top-0 peer-focus:scale-[85%] `}
      >
        {/* Background to hide border line */}
        <div className="absolute w-full h-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"></div>

        <label className="relative" htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
}
