import fs from 'fs';

export const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));