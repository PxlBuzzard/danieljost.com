import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageRoot = path.resolve("public/static/img");
const sourceExtensions = new Set([".png", ".jpg", ".jpeg"]);
const excludedDirectories = new Set(["favicons"]);

async function getSourceImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) {
        images.push(...(await getSourceImages(entryPath)));
      }
      continue;
    }

    if (sourceExtensions.has(path.extname(entry.name).toLowerCase())) {
      images.push(entryPath);
    }
  }

  return images;
}

const sourceImages = await getSourceImages(imageRoot);

await Promise.all(
  sourceImages.flatMap((sourcePath) => {
    const basePath = sourcePath.slice(0, -path.extname(sourcePath).length);

    return [
      sharp(sourcePath)
        .avif({ quality: 55, effort: 6 })
        .toFile(`${basePath}.avif`),
      sharp(sourcePath)
        .webp({ quality: 82, effort: 6 })
        .toFile(`${basePath}.webp`),
    ];
  }),
);

console.log(`Converted ${sourceImages.length} source images to AVIF and WebP.`);
