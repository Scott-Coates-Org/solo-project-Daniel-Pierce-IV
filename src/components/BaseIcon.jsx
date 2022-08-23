export default function BaseIcon({ className, children: pathElement }) {
  const baseClasses = 'w-5 h-5';

  return (
    <svg
      className={`${className ? className : baseClasses}`}
      viewBox="0 0 24 24"
    >
      {pathElement}
    </svg>
  );
}
