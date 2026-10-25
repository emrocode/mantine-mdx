import { Checkbox, Image } from '@mantine/core';

function MdxCheckboxIcon({
  indeterminate,
  className,
}: {
  indeterminate?: boolean;
  className: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      aria-hidden="true"
      style={{
        height: '60%',
        inset: 0,
        margin: 'auto',
        position: 'absolute',
        transform: 'none',
        width: '60%',
      }}
    >
      <path
        d={indeterminate ? 'M2 5h6' : 'M2 5.25 4.25 7.5 8 2.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MdxInput(props: Record<string, unknown>) {
  if (props.type !== 'checkbox') {
    return <input {...props} />;
  }

  const { type: _type, ...rest } = props;
  return <Checkbox readOnly icon={MdxCheckboxIcon} {...rest} />;
}

export function MdxImg(props: Record<string, unknown>) {
  return <Image {...props} />;
}
