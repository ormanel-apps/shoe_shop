import * as fs from "node:fs";
import { PrismaClient } from "@prisma/client";
import { take, shuffle, chunk } from "lodash";

const client = new PrismaClient();

export const populateDb = async () => {
  fs.readFile(
    "/home/abel/Desktop/_dev/personal/shoe_store/api/src/_dev/dataset.json",
    "utf8",
    async (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      const dataset = JSON.parse(data);
      const _all = take(shuffle(dataset), 500).map((item) => ({
        name: item["Product Name"],
        description: item["Description"],
        price: item["Sale Price"],
        images: JSON.stringify(item["Images"]),
        brand: item["Brand"],
        discount: item["Discount"],
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
