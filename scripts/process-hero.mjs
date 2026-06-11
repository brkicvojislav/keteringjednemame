import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public/images/hero-source.png");
const OUT = path.join(ROOT, "public/images/hero.webp");

async function main() {
  await mkdir(path.dirname(OUT), { recursive: true });

  const { width, height } = await sharp(SRC).metadata();

  const badgeTopRight = {
    left: Math.round(width * 0.78),
    top: Math.round(height * 0.015),
    width: Math.round(width * 0.2),
    height: Math.round(height * 0.09),
  };
  const badgeTopRightPatch = {
    left: Math.round(width * 0.52),
    top: Math.round(height * 0.03),
    width: badgeTopRight.width,
    height: badgeTopRight.height,
  };

  const muteIcon = {
    left: Math.round(width * 0.84),
    top: Math.round(height * 0.905),
    width: Math.round(width * 0.14),
    height: Math.round(height * 0.09),
  };
  const muteIconPatch = {
    left: Math.round(width * 0.62),
    top: Math.round(height * 0.905),
    width: muteIcon.width,
    height: muteIcon.height,
  };

  const cleaned = await sharp(SRC)
    .composite([
      {
        input: await sharp(SRC).extract(badgeTopRightPatch).blur(8).toBuffer(),
        left: badgeTopRight.left,
        top: badgeTopRight.top,
      },
      {
        input: await sharp(SRC).extract(muteIconPatch).blur(5).toBuffer(),
        left: muteIcon.left,
        top: muteIcon.top,
      },
    ])
    .toBuffer();

  const cropHeight = Math.round((width * 9) / 16);
  const cropTop = Math.round(height * 0.34);

  const info = await sharp(cleaned)
    .extract({
      left: 0,
      top: cropTop,
      width,
      height: Math.min(cropHeight, height - cropTop),
    })
    .resize(1920, 1080, { fit: "cover", position: "centre" })
    .modulate({ brightness: 1.03, saturation: 1.05 })
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 82, effort: 6 })
    .toFile(OUT);

  console.log(`Saved ${OUT}`);
  console.log(`Output: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
