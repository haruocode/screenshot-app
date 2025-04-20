const screenshotDesktop = require('screenshot-desktop');
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import regions from './regions.json';

const outputDir = path.join(__dirname, 'captures');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

function getNextFilename(): string {
  const files = fs.readdirSync(outputDir)
    .filter(f => f.endsWith('.jpg'))
    .map(f => parseInt(f.replace('.jpg', '')))
    .filter(n => !isNaN(n))
    .sort((a, b) => a - b);

  const last = files.length ? files[files.length - 1] : 0;
  return String(last + 1).padStart(3, '0') + '.jpg';
}

async function cropImage(imagePath: string, region: { left: number, top: number, width: number, height: number }, outputPath: string) {
  try {
    await sharp(imagePath)
      .extract(region)
      .toFile(outputPath);
    console.log('Saved:', outputPath);
  } catch (error) {
    console.error(error);
  } finally {
    fs.unlink(imagePath, (err) => {
      if (err) console.error('Failed to delete temp file:', err);
    });
  }
}

export async function captureRegion(side: 'main') {
  try {
    const img = await screenshotDesktop();
    const tmpPath = path.join(outputDir, 'tmp.jpg');
    fs.writeFileSync(tmpPath, img);

    const region = regions[side];
    if (!region) {
      throw new Error(`指定された領域 "${side}" が見つかりません`);
    }

    const filename = getNextFilename();
    const outputPath = path.join(outputDir, filename);
    await cropImage(tmpPath, region, outputPath);
  } catch (error) {
    console.error('スクリーンショットの撮影中にエラーが発生しました:', error);
    throw error;
  }
}
