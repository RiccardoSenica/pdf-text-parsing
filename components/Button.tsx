interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

export function Button({ onClick, disabled = false, label }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className='button'>
      {label}
    </button>
  );
}
