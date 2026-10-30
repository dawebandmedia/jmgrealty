import { NextResponse, type NextRequest } from "next/server";
import externalAssetPaths from "./app/external-asset-paths.json";

// Immutable, original website assets from the first complete GitHub upload.
// GitHub serves their original bytes; no resizing or re-encoding takes place.
const originalAssetBase =
  "https://raw.githubusercontent.com/dawebandmedia/jmgrealty/5c318097fa9aa55a50ce0c374b99c64d55a77ec2/public";
const knownAssets = new Set(externalAssetPaths);

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  if (["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) {
    return NextResponse.next();
  }
  let pathname: string;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return NextResponse.next();
  }
  if (!knownAssets.has(pathname)) return NextResponse.next();
  const encodedPath = pathname.split("/").map(encodeURIComponent).join("/");
  const response = NextResponse.redirect(originalAssetBase + encodedPath, 307);
  response.headers.set("Cache-Control", "public, max-age=3600");
  return response;
}

export const config = { matcher: ["/images/:path*", "/documents/:path*"] };
