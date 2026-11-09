import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const filePath = path.join(process.cwd(), 'public', 'downloads', 'rodnya.apk');

  // If a native APK exists, stream it directly as rodnya.apk
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': 'attachment; filename="rodnya.apk"',
        'Content-Length': stat.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  // If no APK placed yet, redirect or notify
  return NextResponse.redirect(new URL('/download', request.url));
}
