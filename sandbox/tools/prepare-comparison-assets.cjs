const path = require("path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..", "..");
const originals = path.join(root, "assets", "marketing", "trucryo", "originals");
const output = path.join(root, "sandbox", "assets", "gallery");

const landscapePanels = [
  {
    source: "body-contouring-three-sessions-source.jpg",
    output: "body-contouring-three-sessions-full-1.webp",
    region: { left: 261, top: 15, width: 718, height: 470 },
  },
  {
    source: "body-contouring-three-sessions-source.jpg",
    output: "body-contouring-three-sessions-full-2.webp",
    region: { left: 261, top: 496, width: 718, height: 470 },
  },
  {
    source: "body-contouring-three-sessions-source.jpg",
    output: "body-contouring-three-sessions-full-3.webp",
    region: { left: 261, top: 980, width: 718, height: 470 },
  },
  {
    source: "upper-arm-three-sessions-source.jpg",
    output: "upper-arm-three-sessions-aligned-1.webp",
    region: { left: 202, top: 18, width: 459, height: 306 },
  },
  {
    source: "upper-arm-three-sessions-source.jpg",
    output: "upper-arm-three-sessions-aligned-2.webp",
    region: { left: 202, top: 550, width: 459, height: 306 },
  },
  {
    source: "upper-arm-three-sessions-source.jpg",
    output: "upper-arm-three-sessions-aligned-3.webp",
    region: { left: 202, top: 920, width: 459, height: 306 },
  },
];

const neckPanels = [
  {
    source: "neck-skin-tightening-source.jpg",
    output: "neck-skin-tightening-before-clean.webp",
    region: { left: 100, top: 70, width: 660, height: 1080 },
    angle: 3.5,
    crop: { left: 160, top: 320, width: 500, height: 625 },
  },
  {
    source: "neck-skin-tightening-source.jpg",
    output: "neck-skin-tightening-after-clean.webp",
    region: { left: 830, top: 500, width: 710, height: 1240 },
    angle: -3,
    crop: { left: 190, top: 380, width: 500, height: 625 },
  },
];

const homepageNeckPanels = [
  {
    source: "neck-skin-tightening-source.jpg",
    output: "homepage-neck-skin-tightening-before-wide.webp",
    region: { left: 50, top: 0, width: 800, height: 1180 },
    angle: 3.5,
    crop: { left: 115, top: 170, width: 640, height: 850 },
  },
  {
    source: "neck-skin-tightening-source.jpg",
    output: "homepage-neck-skin-tightening-after-wide.webp",
    region: { left: 650, top: 350, width: 950, height: 1250 },
    angle: -7.5,
    crop: { left: 300, top: 220, width: 650, height: 1000 },
    foregroundLeft: 70,
  },
];

const homepageAbdomenPanels = [
  {
    source: "body-contouring-three-sessions-source.jpg",
    output: "homepage-abdominal-contouring-before.webp",
    region: { left: 261, top: 15, width: 718, height: 470 },
    crop: { left: 180, top: 0, width: 800, height: 800 },
  },
  {
    source: "body-contouring-three-sessions-source.jpg",
    output: "homepage-abdominal-contouring-after.webp",
    region: { left: 261, top: 990, width: 718, height: 470 },
    crop: { left: 180, top: 0, width: 800, height: 800 },
  },
];

async function prepareLandscapePanel(panel) {
  const result = await sharp(path.join(originals, panel.source))
    .extract(panel.region)
    .resize({ width: 1200, height: 800, fit: "cover", position: "centre" })
    .webp({ quality: 90, effort: 6, smartSubsample: true })
    .toFile(path.join(output, panel.output));

  return `${panel.output} ${result.width}x${result.height}`;
}

async function prepareNeckPanel(panel) {
  const rotated = await sharp(path.join(originals, panel.source))
    .extract(panel.region)
    .rotate(panel.angle, { background: "#ffffff" })
    .png()
    .toBuffer({ resolveWithObject: true });
  const result = await sharp(rotated.data)
    .extract(panel.crop)
    .resize({ width: 800, height: 1000, fit: "fill" })
    .webp({ quality: 90, effort: 6, smartSubsample: true })
    .toFile(path.join(output, panel.output));

  return `${panel.output} ${result.width}x${result.height}`;
}

async function prepareHomepageNeckPanel(panel) {
  const rotated = await sharp(path.join(originals, panel.source))
    .extract(panel.region)
    .rotate(panel.angle, { background: "#ffffff" })
    .png()
    .toBuffer({ resolveWithObject: true });
  const portrait = await sharp(rotated.data)
    .extract(panel.crop)
    .resize({ height: 1000 })
    .png()
    .toBuffer({ resolveWithObject: true });
  const background = await sharp(portrait.data)
    .resize({ width: 1000, height: 1000, fit: "cover" })
    .blur(28)
    .modulate({ brightness: 0.82, saturation: 0.9 })
    .png()
    .toBuffer();
  const result = await sharp(background)
    .composite([
      {
        input: portrait.data,
        left: panel.foregroundLeft ?? Math.round((1000 - portrait.info.width) / 2),
        top: 0,
      },
    ])
    .webp({ quality: 90, effort: 6, smartSubsample: true })
    .toFile(path.join(output, panel.output));

  return `${panel.output} ${result.width}x${result.height}`;
}

async function prepareHomepageAbdomenPanel(panel) {
  const landscape = await sharp(path.join(originals, panel.source))
    .extract(panel.region)
    .resize({ width: 1200, height: 800, fit: "cover", position: "centre" })
    .png()
    .toBuffer();
  const result = await sharp(landscape)
    .extract(panel.crop)
    .resize({ width: 1000, height: 1000, fit: "fill" })
    .webp({ quality: 90, effort: 6, smartSubsample: true })
    .toFile(path.join(output, panel.output));

  return `${panel.output} ${result.width}x${result.height}`;
}

const fixedTasks = [
  ...neckPanels.map(prepareNeckPanel),
  ...homepageNeckPanels.map(prepareHomepageNeckPanel),
  ...homepageAbdomenPanels.map(prepareHomepageAbdomenPanel),
];
const tasks = process.argv.includes("--fixed-only")
  ? fixedTasks
  : [...landscapePanels.map(prepareLandscapePanel), ...fixedTasks];

Promise.all(tasks).then((results) => results.forEach((result) => console.log(result)));
