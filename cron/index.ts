import { CronJob } from 'cron';
import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import zlib from 'node:zlib';
import { ProductRepository } from '../src/repositories/product.repository';

let gzFiles: string[] = [];

const baseUrl = 'https://challenges.coode.sh/food/data/json/';

const filesPath = path.join(
  __dirname,
  '..',
  'docs',
  'food',
  'data',
  'json',
  'index.txt',
);
const productRepository = new ProductRepository();

export let lastCronExecution: Date = new Date();

export const job = new CronJob('0 0 23 * * *', async () => {
  console.log('Starting cron job');
  lastCronExecution = new Date();
  await downloadFilesList();
  await deleteAllFiles();

  fs.readFileSync(filesPath, 'utf-8')
    .trim()
    .split(/\r?\n/)
    .forEach((line) => {
      gzFiles.push(line);
    });

  await downloadAllFiles(gzFiles);
  await updateDatabase();

  gzFiles = [];
  console.log('Cron job finished');
});

async function downloadAllFiles(gzFiles: string[]) {
  console.log('Files to download: ' + gzFiles.length);
  const promises: Promise<void>[] = gzFiles.map(async (fileName) => {
    console.log('Downloading file: ' + fileName);
    const filePath = path.join(__dirname, '..', 'data', fileName);
    const unzippedFile = fs.createWriteStream(filePath.replace('.gz', ''));

    try {
      const response = await axios({
        url: baseUrl + fileName,
        method: 'GET',
        responseType: 'stream',
      });

      await new Promise((resolve, reject) => {
        const gUnzip = zlib.createGunzip();
        response.data.pipe(gUnzip).pipe(unzippedFile);
        unzippedFile
          .on('finish', () => {
            unzippedFile.close();
            console.log('File downloaded and unzipped: ' + fileName);
            resolve(fileName);
          })
          .on('error', (error: Error) => {
            reject(error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  });

  await Promise.all(promises);
  console.log('All files downloaded');
}

async function downloadFilesList() {
  console.log('Downloading file list');
  try {
    const response = await axios.get(baseUrl + 'index.txt');
    fs.writeFileSync(filesPath, response.data);
  } catch (error) {
    console.log(error);
  }
  console.log('File list downloaded');
}

async function deleteAllFiles() {
  console.log('Deleting all files');
  const files = fs.readdirSync(path.join(__dirname, '..', 'data'));
  files.forEach((file) => {
    fs.unlinkSync(path.join(__dirname, '..', 'data', file));
  });
  console.log('All files deleted');
}

async function updateDatabase() {
  const responses = gzFiles.map(async (fileName) => {
    const filePath = path.join(
      __dirname,
      '..',
      'data',
      fileName.replace('.gz', ''),
    );
    await productRepository.updateDbFromJson(filePath);
  });

  await Promise.all(responses);
}
