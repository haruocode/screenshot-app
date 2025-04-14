const screenshotDesktop = require('screenshot-desktop') as any;
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import regions from './regions.json';

const outputDir = path.join(__dirname, 'captures');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// function getNextFilename(): string {
//   const files = fs.readdirSync(outputDir)
//     .filter(f => f.endsWith('.jpg'))
//     .sort();

//   const last = files.length ? parseInt(files[files.length - 1].replace('.jpg', '')) : 0;
//   return String(last + 1).padStart(3, '0') + '.jpg';
// }

function getNextFilename(): string {
  const files = fs.readdirSync(outputDir)
    .filter(f => f.endsWith('.jpg'))
    .map(f => parseInt(f.replace('.jpg', '')))
    .filter(n => !isNaN(n))
    .sort((a, b) => a - b);

  const last = files.length ? files[files.length - 1] : 0;
  return String(last + 1).padStart(3, '0') + '.jpg';
}

function cropImage(imagePath: string, region: { left: number, top: number, width: number, height: number }, outputPath: string) {
  sharp(imagePath)
    .extract(region)
    .toFile(outputPath)
    .then(() => console.log('Saved:', outputPath))
    .catch(console.error);
}

export function captureRegion(side: 'main') {
  screenshotDesktop({ format: 'jpg' }).then((img: Buffer) => {
    const tmpPath = path.join(outputDir, 'tmp.jpg');
    fs.writeFileSync(tmpPath, img);

    const region = regions[side];
    const filename = getNextFilename();
    const outputPath = path.join(outputDir, filename);
    cropImage(tmpPath, region, outputPath);
  });
}
