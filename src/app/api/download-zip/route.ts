import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const zipPath = path.join(process.cwd(), "wedding-invitation.zip");

  if (!fs.existsSync(zipPath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(zipPath);
  const fileName = "wedding-invitation.zip";

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length": fileBuffer.length.toString(),
    },
  });
}