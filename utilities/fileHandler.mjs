// fileHandler.mjs
import fs from 'fs';
import path from 'path';
import { writeFile, readFile } from 'fs/promises';

const writeFileAsync = async (folderName, fileName, data) => {
  const filePath = path.join(global.__appdir, folderName, fileName);
  await writeFile(filePath, data);
};

const readFileAsync = async (folderName, fileName) => {
  const filePath = path.join(global.__appdir, folderName, fileName);
  return await readFile(filePath, 'utf8');
};

export { writeFileAsync, readFileAsync };
