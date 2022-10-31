import { Product } from '../interfaces';
import products from '../models/Product';
import fs from 'node:fs';
import ndjson from 'ndjson';

export class ProductRepository {
  public async findAll(page: number, limit: number): Promise<Product[]> {
    return await products
      .find({ status: 'published' })
      .skip(page * limit)
      .limit(limit);
  }

  public async findOne(code: number): Promise<Product | null> {
    return await products.findOne({ where: { code } });
  }

  public async update(code: number, product: Product): Promise<Product | null> {
    return await products.findOneAndUpdate({ code }, product, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
  }

  public async delete(code: number): Promise<Product | null> {
    return await products.findOneAndUpdate({ code }, { status: 'trash' });
  }

  public async updateDbFromJson(filePath: string) {
    console.log('updating db from json file: ', filePath);
    const existCodes = (await products.distinct('code')).map((code: number) =>
      Math.floor(code),
    );

    const insertList = await this.convertFileToList(filePath, existCodes);
    await products.insertMany(insertList);

    console.log(
      'inserted ',
      insertList.length,
      ' products from file: ',
      filePath,
    );
  }

  async convertFileToList(
    filePath: string,
    existCodes: number[],
  ): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      let insertList: Product[] = [];
      let line = 0;

      const jsonFileStream = fs
        .createReadStream(filePath, 'utf-8')
        .pipe(ndjson.parse())
        .on('data', (data: any) => {
          if (line >= 100) {
            jsonFileStream.destroy();
          } else {
            if (
              !existCodes.includes(
                Math.floor(Number(data.code.replace(/[^0-9]/g, ''))),
              )
            ) {
              insertList.push({
                code: Number(data.code.replace(/[^0-9]/g, '')),
                status: 'published',
                imported_t: new Date(),
                url: data.url,
                creator: data.creator,
                created_t: data.created_t,
                last_modified_t: data.last_modified_t,
                product_name: data.product_name,
                quantity: data.quantity,
                brands: data.brands,
                categories: data.categories,
                labels: data.labels,
                cities: data.cities,
                purchase_places: data.purchase_places,
                stores: data.stores,
                ingredients_text: data.ingredients_text,
                traces: data.traces,
                serving_size: data.serving_size,

                serving_quantity: data.serving_quantity,
                nutriscore_score: data.nutriscore_score,
                nutriscore_grade: data.nutriscore_grade,
                main_category: data.main_category,
                image_url: data.image_url,
              });
              line++;
            }
          }
        })
        .on('error', (err) => {
          console.log(err);
          reject(err);
        })
        .on('end', () => {
          console.log('end of file: ', filePath);
          resolve(insertList);
        })
        .on('close', () => {
          console.log('close file: ', filePath);
          resolve(insertList);
        });
    });
  }
}
