import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const animationDirectory = path.join(process.cwd(), "animation");

const frameManifestPromise = readdir(animationDirectory).then((files) =>
  files
    .filter((file) => file.endsWith(".webp"))
    .sort((left, right) => {
      const leftMatch = left.match(/frame_(\d+)/);
      const rightMatch = right.match(/frame_(\d+)/);
      const leftIndex = leftMatch ? Number(leftMatch[1]) : Number.MAX_SAFE_INTEGER;
      const rightIndex = rightMatch ? Number(rightMatch[1]) : Number.MAX_SAFE_INTEGER;

      return leftIndex - rightIndex;
    }),
);

export async function GET(
  _request: Request,
  context: RouteContext<"/api/frames/[index]">,
) {
  const { index } = await context.params;
  const frameIndex = Number(index);

  if (!Number.isInteger(frameIndex) || frameIndex < 0) {
    return new Response("Invalid frame index", { status: 400 });
  }

  const manifest = await frameManifestPromise;
  const frameFile = manifest[frameIndex];

  if (!frameFile) {
    return new Response("Frame not found", { status: 404 });
  }

  const filePath = path.join(animationDirectory, frameFile);
  const file = await readFile(filePath);

  return new Response(file, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "image/webp",
    },
  });
}
