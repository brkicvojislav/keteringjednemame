import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const assetsDir = path.join(
  process.env.USERPROFILE ?? "",
  ".cursor",
  "projects",
  "d-Portfolio-sajtovi-Ketering",
  "assets"
);
const galleryDir = path.join(rootDir, "public", "images", "gallery");
const heroPath = path.join(rootDir, "public", "images", "hero.webp");

/** @type {{ id: string; suffix: string; alt: string; featured: boolean; cropTop?: number; cropBottom?: number }} */
const manifest = [
  {
    id: "g01",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.55-9598a5dc-eeab-40a9-acae-0f8a7e711039",
    alt: "Raznovrsno domaće pecivo na drvenoj dasci za ketering",
    featured: true,
  },
  {
    id: "g02",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.54__1_-c83a2969-1cb3-4809-9beb-fc7226c1ef01",
    alt: "Zalogaji u obliku cigare sa dip sosom na drvenoj dasci",
    featured: true,
  },
  {
    id: "g03",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.55__2_-472b0ffe-6331-4f71-a50e-b8ef7aaa431f",
    alt: "Mini pice pripremljene za pečenje",
    featured: true,
  },
  {
    id: "g04",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.54__4_-3786d9c4-613b-4c87-84a8-713f681a4786",
    alt: "Kiflice sa makom, susamom i sirom u kutiji za dostavu",
    featured: true,
  },
  {
    id: "g05",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.52__2_-bdf28647-d6ad-4d6c-9180-85205ec96200",
    alt: "Slani rolati sa spanaćem i paprikom na tanjiru",
    featured: true,
  },
  {
    id: "g06",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.52__1_-d49373b1-05e3-4ea1-97c2-fa910faaedaa",
    alt: "Slatka ponuda sa kroasanima i krem pufnicama",
    featured: true,
  },
  {
    id: "g07",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.53__1_-fb5112a7-31b6-438d-9c1e-b35e34b18054",
    alt: "Lisnati štapići sa susamom i slanim prelivom",
    featured: true,
  },
  {
    id: "g08",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.54__2_-484e2b6c-507b-4fc1-939e-7c05e01e30c8",
    alt: "Pita spiral u tepsiji, pečena do zlatne boje",
    featured: true,
  },
  {
    id: "g09",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.54__5_-2ff7213d-9aa0-423e-9506-dcd95d337478",
    alt: "Slani rolati spremni za serviranje u kutijama",
    featured: false,
  },
  {
    id: "g10",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.52-7806ffff-e8b6-4020-90de-9a3f9229a4eb",
    alt: "Kiflice, pite i peciva u kutijama za ketering",
    featured: true,
  },
  {
    id: "g11",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.54__3_-2ba4713a-ac0f-4f0a-8137-a649adc58ab2",
    alt: "Bavarske kiflice sa šunkom i salatom",
    featured: false,
  },
  {
    id: "g12",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.53__2_-3f778595-77d4-4f19-94b0-b10585cb7e3c",
    alt: "Miks bavarskih, slanih i posnih sendvičića",
    featured: false,
    cropTop: 0.07,
  },
  {
    id: "g13",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.53-bea32a7a-770f-4d22-aac7-8f88f7125d93",
    alt: "Mini sendvičići sa maslinama za proslavu",
    featured: false,
  },
  {
    id: "g14",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.55__1_-4568db42-7fea-4d7d-99b5-963faf248eff",
    alt: "Ukrasno slatko pecivo u kutiji",
    featured: false,
  },
  {
    id: "g15",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.54-fcf92d8e-2c76-43f3-b5fb-ef0168f2b9d0",
    alt: "Kiflica sa sirom i viršlom, presek",
    featured: false,
  },
  {
    id: "g16",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.55__3_-13117e1a-9120-4b2f-9b96-fc4362f52b78",
    alt: "Kiflica sa domaćim džemom, presek",
    featured: false,
  },
  {
    id: "g17",
    suffix: "WhatsApp_Image_2026-06-11_at_11.43.52__3_-ebe626b7-8978-491b-b1ee-c5d2bfbc2b84",
    alt: "Sveže pečena lepinja na roštilju",
    featured: false,
  },
];

async function findAssetPath(suffix) {
  const files = await fs.readdir(assetsDir);
  const match = files.find((file) => file.includes(suffix));
  if (!match) {
    throw new Error(`Nije pronađena slika za sufiks: ${suffix}`);
  }
  return path.join(assetsDir, match);
}

async function enhancePipeline(input, { cropTop = 0, cropBottom = 0 } = {}) {
  let image = sharp(input).rotate().modulate({
    brightness: 1.04,
    saturation: 1.1,
  });

  if (cropTop > 0 || cropBottom > 0) {
    const meta = await image.metadata();
    const top = Math.round((meta.height ?? 0) * cropTop);
    const bottom = Math.round((meta.height ?? 0) * cropBottom);
    const height = (meta.height ?? 0) - top - bottom;
    image = image.extract({
      left: 0,
      top,
      width: meta.width ?? 0,
      height: Math.max(1, height),
    });
  }

  return image.sharpen({ sigma: 0.7 });
}

async function writeGalleryImage(item, sourcePath) {
  const fullOut = path.join(galleryDir, `${item.id}.webp`);
  const thumbOut = path.join(galleryDir, `${item.id}-thumb.webp`);

  const enhanced = await enhancePipeline(sourcePath, {
    cropTop: item.cropTop,
    cropBottom: item.cropBottom,
  });

  await enhanced
    .clone()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(fullOut);

  await enhanced
    .clone()
    .resize(900, 900, { fit: "cover", position: "centre" })
    .webp({ quality: 80 })
    .toFile(thumbOut);

  return { fullOut, thumbOut };
}

async function writeHeroImage(sourcePath) {
  const image = sharp(sourcePath).rotate();
  const meta = await image.metadata();
  const width = meta.width ?? 1920;
  const height = meta.height ?? 1080;
  const focusHeight = Math.round(height * 0.5);
  const top = Math.max(0, height - focusHeight);

  await image
    .extract({
      left: 0,
      top,
      width,
      height: Math.min(focusHeight, height - top),
    })
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 96, effort: 2, smartSubsample: false })
    .toFile(heroPath);
}

async function main() {
  await fs.mkdir(galleryDir, { recursive: true });
  await fs.mkdir(path.dirname(heroPath), { recursive: true });

  const heroSource = await findAssetPath(manifest[0].suffix);

  for (const item of manifest) {
    const sourcePath = await findAssetPath(item.suffix);
    await writeGalleryImage(item, sourcePath);
    console.log(`Processed ${item.id}`);
  }

  await writeHeroImage(heroSource);
  console.log("Processed hero.webp from g01");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
