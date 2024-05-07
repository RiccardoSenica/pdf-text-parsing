import PdfParse from 'pdf-parse';

export async function parser(file: File) {
  const chunks = [];
  for await (const chunk of file.stream() as any) {
    chunks.push(chunk);
  }

  const parsedContent = await PdfParse(Buffer.concat(chunks));

  return parsedContent.text;
}
