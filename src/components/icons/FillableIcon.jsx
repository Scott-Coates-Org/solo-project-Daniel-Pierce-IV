import BaseIcon from './BaseIcon';

export default function FillableIcon({
  className,
  emptyPath,
  filledPath,
  isFilled,
}) {
  return (
    <BaseIcon className={className}>
      {isFilled ? filledPath : emptyPath}
    </BaseIcon>
  );
}
