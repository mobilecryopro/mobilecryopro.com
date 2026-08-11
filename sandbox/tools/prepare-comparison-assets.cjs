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
    output: "homepage-neck-skin-tightening-before-original-chin-centered.webp",
    quad: {
      topLeft: { x: 94, y: 79 },
      topRight: { x: 792, y: 38 },
      bottomRight: { x: 702, y: 1110 },
      bottomLeft: { x: 154, y: 1128 },
    },
    crop: { left: 0, top: 100, width: 800, height: 1000 },
    shiftLeft: 120,
  },
  {
    source: "neck-skin-tightening-source.jpg",
    output: "homepage-neck-skin-tightening-after-original-chin-centered.webp",
    quad: {
      topLeft: { x: 948, y: 406 },
      topRight: { x: 1560, y: 517 },
      bottomRight: { x: 1380, y: 1555 },
      bottomLeft: { x: 776, y: 1441 },
    },
    crop: { left: 0, top: 100, width: 800, height: 1000 },
    shiftLeft: 200,
  },
];

const homepageAbdomenPanels = [
  {
    source: "body-contouring-three-sessions-source.jpg",
    output: "homepage-abdominal-contouring-before-portrait.webp",
    region: { left: 261, top: 15, width: 718, height: 470 },
    crop: { left: 340, top: 0, width: 640, height: 800 },
  },
  {
    source: "body-contouring-three-sessions-source.jpg",
    output: "homepage-abdominal-contouring-after-portrait.webp",
    region: { left: 261, top: 990, width: 718, height: 470 },
    crop: { left: 280, top: 0, width: 640, height: 800 },
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
  const source = await sharp(path.join(originals, panel.source))
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rectifiedWidth = 800;
  const rectifiedHeight = 1200;
  const rectified = Buffer.alloc(rectifiedWidth * rectifiedHeight * 3);
  const { topLeft, topRight, bottomRight, bottomLeft } = panel.quad;

  for (let y = 0; y < rectifiedHeight; y += 1) {
    const v = y / (rectifiedHeight - 1);
    for (let x = 0; x < rectifiedWidth; x += 1) {
      const u = x / (rectifiedWidth - 1);
      const sourceX =
        (1 - u) * (1 - v) * topLeft.x +
        u * (1 - v) * topRight.x +
        u * v * bottomRight.x +
        (1 - u) * v * bottomLeft.x;
      const sourceY =
        (1 - u) * (1 - v) * topLeft.y +
        u * (1 - v) * topRight.y +
        u * v * bottomRight.y +
        (1 - u) * v * bottomLeft.y;
      const x0 = Math.max(0, Math.min(source.info.width - 2, Math.floor(sourceX)));
      const y0 = Math.max(0, Math.min(source.info.height - 2, Math.floor(sourceY)));
      const xWeight = sourceX - x0;
      const yWeight = sourceY - y0;
      const outputOffset = (y * rectifiedWidth + x) * 3;

      for (let channel = 0; channel < 3; channel += 1) {
        const topLeftOffset = (y0 * source.info.width + x0) * 3 + channel;
        const topRightOffset = topLeftOffset + 3;
        const bottomLeftOffset = topLeftOffset + source.info.width * 3;
        const bottomRightOffset = bottomLeftOffset + 3;
        const top =
          source.data[topLeftOffset] * (1 - xWeight) + source.data[topRightOffset] * xWeight;
        const bottom =
          source.data[bottomLeftOffset] * (1 - xWeight) +
          source.data[bottomRightOffset] * xWeight;
        rectified[outputOffset + channel] = Math.round(top * (1 - yWeight) + bottom * yWeight);
      }
    }
  }

  const photo = await sharp(rectified, {
    raw: { width: rectifiedWidth, height: rectifiedHeight, channels: 3 },
  })
    .extract(panel.crop)
    .resize({ width: 1000, height: 1250, fit: "fill" })
    .png()
    .toBuffer();
  const shiftedPhoto = await sharp(photo)
    .extract({ left: panel.shiftLeft, top: 0, width: 1000 - panel.shiftLeft, height: 1250 })
    .png()
    .toBuffer();
  const result = await sharp({
    create: {
      width: 1000,
      height: 1250,
      channels: 3,
      background: "#ffffff",
    },
  })
    .composite([{ input: shiftedPhoto, left: 0, top: 0 }])
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
    .resize({ width: 1000, height: 1250, fit: "fill" })
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
