import { Prisma } from "@prisma/client";
import { ArgsType, Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Product {
  @Field((returns) => ID)
  id: string;

  @Field((returns) => String)
  name: string;

  @Field((returns) => String)
  description: string;

  @Field((returns) => Number)
  price: number;

  @Field((returns) => [String])
  images: string[];

  @Field((returns) => String)
  brand: string;

  @Field((returns) => Number)
  discount: number;
}

@ArgsType()
export class ProductQueryArgs {
  // @Field()
  // where?: {
  //   price?: IntFilter;
  // };

  // @Field()
  // orderBy?: {
  //   field: string;
  //   direction: "asc" | "desc";
  // };

  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  limit?: number;
}
