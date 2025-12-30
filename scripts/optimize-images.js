import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_ROOT = path.join(__dirname, '../src/assets');

async function convertToWebp(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      await convertToWebp(filePath);
    } else if (/\.(png|jpe?g)$/i.test(file)) {
      const outputName = file.replace(/\.(png|jpe?g)$/i, '.webp');
      const outputPath = path.join(dir, outputName);
      
      console.log(`Converting: ${file} -> ${outputName}`);
      
      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        // Optional: Remove original to save space
        // fs.unlinkSync(filePath);
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err);
      }
    }
  }
}

console.log('Starting WebP conversion...');
convertToWebp(ASSETS_ROOT).then(() => {
  console.log('Optimization complete! You can now remove the old PNG/JPG files.');
}).catch(err => {
  console.error('Conversion failed:', err);
});
