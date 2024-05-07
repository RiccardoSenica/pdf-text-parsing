interface ContentProps {
  loading: boolean;
  error?: string;
  text: string;
}

export function Content({ loading, error, text }: ContentProps) {
  return (
    <div className='content'>
      {loading ? 'Parsing file...' : <>{error ? <p>{error}</p> : text}</>}
    </div>
  );
}
