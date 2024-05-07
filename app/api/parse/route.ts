import { Response } from '@/utils/data';
import { parser } from '@/utils/parser';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (!req.headers.get('content-type')?.startsWith('multipart/form-data')) {
    return new NextResponse('This API only accepts FormData.', {
      status: 415
    });
  }

  const data = await req.formData();

  const file = data.get('File');

  if (!file || !(file instanceof File)) {
    return new NextResponse('No file provided', {
      status: 400
    });
  }

  try {
    const parsedText = await parser(file);

    const response: Response = {
      text: parsedText
    };

    return new NextResponse(JSON.stringify(response), {
      status: 200
    });
  } catch (err) {
    return new NextResponse('Failed to parse PDF', {
      status: 500
    });
  }
}
