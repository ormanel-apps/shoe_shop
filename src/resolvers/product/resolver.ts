import { Args, Query, Resolver } from "type-graphql";
import { ProductService } from "./service";
import { Product, ProductQueryArgs } from "./types";

@Resolver()
export class ProductResolver {
  private productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }

  @Query(() => [Product])
  getAll(@Args() q: ProductQueryArgs) {
    return this.productService.getAll(q);
  }

  @Query(() => [String])
  brands() {
    return this.productService.getBrands();
  }
}
