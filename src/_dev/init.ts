import * as fs from "node:fs";
import { PrismaClient } from "@prisma/client";
import { take, shuffle, replace, chunk, union, unionWith } from "lodash";

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

      const parseDetails = (det: string) => {
        return chunk(
          det
            .replaceAll(/\\(u){1}[1-9]00([a-z]){1}/g, "")
            .split("\n\n")
            .filter((e) => e)
            .map((e) => e.replaceAll("\n", "")),
          2
        ).reduce((prev, cur, _, acc) => {
          Object.assign(prev, { [cur[0].replace(":", "")]: cur[1] });
          return prev;
        }, {});
      };
      const dataset: [] = JSON.parse(data);
      const _all = shuffle(dataset.filter((e) => e["price"] != null)).map(
        (item) => ({
          name: item["title"],
          details: parseDetails(item["product_details"] as string),
          // .replaceAll("\n", "")

          price: item["price"],
          images: item["images_list"],
          brand: item["brand"],
          features: item["features"],
        })
      );

      // console.log(parseDetails(_all[0].details));

      var _chunk = chunk(_all, 100);
      for (let i = 0; i < _chunk.length; i++) {
        // await client.products.create({
        //   data: _chunk[i] as any,
        // });
        await client.products.createMany({ data: _chunk[i] });
        console.log(`${i}/${_chunk.length}`);
      }
    }
  );
};

populateDb();
