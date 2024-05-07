import { responseSchema } from '@/utils/data';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Button } from './Button';
import { Content } from './Content';

export default function Dashboard() {
  const [clearing, setClearing] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [parsedText, setParsedText] = useState<string>('');

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      } else {
        setFile(undefined);
      }
    },
    []
  );

  const handleClear = useCallback(() => {
    setClearing(false);
    setFile(undefined);
    setParsedText('');
  }, []);

  const validateFile = useCallback((file: File) => {
    if (file.type !== 'application/pdf') {
      setError(
        "The file you've selected is not a PDF file. Please select a PDF file."
      );
      setLoading(false);

      return false;
    }

    // This limit is caused by the project being deployed on Vercel using a free tier, with limited resources
    if (file.size > 1024 * 1024) {
      setError('The file must be smaller than 1MB.');
      setLoading(false);

      return false;
    }

    return true;
  }, []);

  const uploadFile = useCallback(async () => {
    if (!file) return;

    if (!validateFile(file)) return;

    const formData = new FormData();

    formData.append('File', file);

    try {
      const response = await axios.post('/api/parse', formData);
      const validatedData = responseSchema.safeParse(response.data);

      if (!validatedData.success) {
        setError('There was an error parsing the file. Please try again.');
        return;
      }

      setParsedText(validatedData.data.text);
      setClearing(true);
    } catch {
      setError('Internal server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [file, validateFile]);

  const handleUpload = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setParsedText('');

    uploadFile();
  }, [uploadFile]);

  function renderForm() {
    if (clearing) {
      return (
        <>
          <p>File: {file?.name}</p>
          <Button label='Use a different file' onClick={handleClear} />
        </>
      );
    }

    return (
      <>
        <input type='file' accept='.pdf' onChange={handleFileChange} />
        <Button
          label='Upload and parse'
          onClick={handleUpload}
          disabled={!file}
        />
      </>
    );
  }

  return (
    <div className='dashboard'>
      <p>This is a tool to extract the text from a PDF file</p>
      <div className='form'> {renderForm()}</div>
      <Content loading={loading} error={error} text={parsedText} />
    </div>
  );
}
