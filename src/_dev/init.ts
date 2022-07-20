import * as fs from "node:fs";
import { PrismaClient } from "@prisma/client";
import { take, shuffle, chunk } from "lodash";

const client = new PrismaClient();

export const populateDb = async () => {
  fs.readFile(
    "/home/abel/Downloads/amazon_uk_shoes_dataset.json",
    "utf8",
    async (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      const dataset: [] = JSON.parse(data);
      const _all = take(
        shuffle(dataset.filter((e) => e["price"] != null)),
        500
      ).map((item) => ({
        name: item["title"],
        details: item["product_details"],
        price: item["price"],
        images: JSON.stringify(item["images_list"]),
        brand: item["brand"],
        features: JSON.stringify(item["features"]),
      }));
      for (let i = 0; i < _all.length; i++) {
        await client.products.create({
          data: _all[i],
        });
        console.log(`${i}/${_all.length}`);
      }
    }
  );
};

populateDb();
