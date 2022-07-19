import { Prisma, PrismaClient, Products } from "@prisma/client";
import { defaultClient } from "../../client";
import { ProductQueryArgs } from "./types";

export class ProductService {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = defaultClient;
  }

  async getAll(args: ProductQueryArgs): Promise<Products[]> {
    const { page, limit } = args;
    let opt: Prisma.ProductsFindManyArgs = {};
    // if (orderBy) {
    //   opt = {
    //     ...opt,
    //     orderBy: {
    //       [orderBy.field]: orderBy.direction,
    //     },
    //     where: {
    //       price: {},
    //     },
    //   };
    // }
    const products = await this.prisma.products.findMany({
      ...opt,
      take: limit ?? 50,
      skip: page ? (page - 1) * (limit ?? 50) : 0,
    });
    return products.map(this.parseProduct);
  }

  async getBrands(): Promise<string[]> {
    const brands = await this.prisma.products.findMany({
      select: { brand: true },
      distinct: ["brand"],
    });
    return brands.map((brand) => brand.brand);
  }

  async getOne(id: string): Promise<Products | null> {
    const product = await this.prisma.products.findFirst({ where: { id } });
    return product;
  }

  private parseProduct(product: Products): Products {
    const { images } = product;
    product.images = JSON.parse(images);
    return product;
  }
}
