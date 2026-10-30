import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const source = path.resolve("../../amaresa-assets.json");
const data = JSON.parse(await readFile(source, "utf8"));
for (const media of Object.values(data)) {
  for (const [kind, images] of [["interior", media.interiorImages], ["plan", media.floorPlans]]) {
    for (const asset of images) {
      const oldPath = path.resolve("public", "." + asset.src);
      const response = await fetch(asset.sourceUrl, { headers: { Accept: "image/jpeg,image/png" }, signal: AbortSignal.timeout(60000) });
      if (!response.ok) throw new Error(`Source unavailable: ${asset.sourceUrl}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      const metadata = await sharp(bytes).metadata();
      if (!["jpeg", "png"].includes(metadata.format)) throw new Error(`Unexpected source file format: ${metadata.format}`);
      // Keep the initial CDN download intact. The official JPEG/PNG is a new file.
      const preserved = path.resolve("../../cdn-reference-downloads", path.basename(path.dirname(oldPath)), path.basename(oldPath));
      await mkdir(path.dirname(preserved), { recursive: true });
      await copyFile(oldPath, preserved);
      const extension = metadata.format === "jpeg" ? ".jpg" : ".png";
      const filename = path.basename(oldPath, path.extname(oldPath)) + "-source" + extension;
      const originalPath = path.join(path.dirname(oldPath), filename);
      await writeFile(originalPath, bytes);
      asset.src = asset.src.slice(0, asset.src.lastIndexOf("/") + 1) + filename;
      asset.width = metadata.width;
      asset.height = metadata.height;
      asset.sha256 = createHash("sha256").update(bytes).digest("hex");
      asset.contentType = response.headers.get("content-type");
      asset.fetchAccept = "image/jpeg,image/png";
      if (kind === "interior") {
        const displayFilename = filename.replace(/\.(jpg|png)$/, "-display.webp");
        await sharp(bytes).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 86 }).toFile(path.join(path.dirname(oldPath), displayFilename));
        asset.displaySrc = asset.src.slice(0, asset.src.lastIndexOf("/") + 1) + displayFilename;
      }
    }
  }
  console.log(media.modelId, media.interiorImages.length, media.floorPlans.map((image) => `${image.width}x${image.height}`).join(", "));
}
await writeFile(source, JSON.stringify(data, null, 2));
await writeFile("app/amaresa-media-data.json", JSON.stringify(data, null, 2));
