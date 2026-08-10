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
    output: "neck-skin-tightening-before.webp",
    region: { left: 100, top: 70, width: 660, height: 1080 },
    angle: 3.5,
    crop: { left: 65, top: 144, width: 620, height: 775 },
  },
  {
    source: "neck-skin-tightening-source.jpg",
    output: "neck-skin-tightening-after.webp",
    region: { left: 830, top: 500, width: 710, height: 1240 },
    angle: -3,
    crop: { left: 90, top: 195, width: 600, height: 750 },
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

Promise.all([
  ...landscapePanels.map(prepareLandscapePanel),
  ...neckPanels.map(prepareNeckPanel),
]).then((results) => results.forEach((result) => console.log(result)));
