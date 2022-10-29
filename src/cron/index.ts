import { CronJob } from 'cron';
import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import zlib from 'node:zlib';

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

const job = new CronJob('0 0 5 * * *', async () => {
  fs.readFileSync(filesPath, 'utf-8')
    .split(/\r?\n/)
    .forEach((line) => {
      gzFiles.push(line);
    });

  await downloadAllFiles(gzFiles);

  gzFiles = [];
});

job.start();

setTimeout(() => {
  (async () => {
    fs.readFileSync(filesPath, 'utf-8')
      .split(/\r?\n/)
      .forEach((line) => {
        gzFiles.push(line);
      });

    await downloadAllFiles(gzFiles);

    gzFiles = [];
  })();
}, 5000);

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
            console.log('File unzipped: ' + fileName);
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
