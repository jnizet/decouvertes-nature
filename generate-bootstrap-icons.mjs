import path from 'path';
import fs from 'fs';

const options = {
  input: 'node_modules/bootstrap-icons/icons', // Required. Folder with SVG files
  esm: 'src/app/bootstrap-icons/bootstrap-icons.js', // ES module for bundlers exposing `export const iconName = '<svg...'`
  dts: 'src/app/bootstrap-icons/bootstrap-icons.d.ts' // Exposes typescript definitions with `export declare const``
};

svgToJS(options);

export default function svgToJS(config) {
  const files = fs.readdirSync(config.input);
  const icons = [];

  for (const file of files) {
    if (file.slice(-4) !== '.svg') continue;
    const code = fs.readFileSync(path.join(config.input, file), 'utf-8');
    let name = file.slice(0, -4);
    let firstLetter = name.slice(0, 1);
    if (firstLetter >= '0' && firstLetter <= '9') {
      name = `_${name}`;
    }
    name = name.replace(/-+./g, m => m.slice(-1).toUpperCase());

    icons.push({
      name,
      svg: code
    });
  }

  const esm = icons.map(({ name, svg }) => `export const ${name} = \`${svg}\`;`).join('\n') + '\n';
  const dts = icons.map(({ name }) => `export declare const ${name}: string;`).join('\n') + '\n'

  fs.writeFileSync(config.esm, esm);
  fs.writeFileSync(config.dts, dts);
}
