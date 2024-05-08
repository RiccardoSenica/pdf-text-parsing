import { useState } from 'react';
import { Content } from './Content';
import { Form } from './Form';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [parsedText, setParsedText] = useState<string>('');

  return (
    <div className='dashboard'>
      <p>This is a tool to extract the text from a PDF file</p>
      <Form
        setLoading={setLoading}
        setError={setError}
        setParsedText={setParsedText}
      />
      <Content loading={loading} error={error} text={parsedText} />
    </div>
  );
}
