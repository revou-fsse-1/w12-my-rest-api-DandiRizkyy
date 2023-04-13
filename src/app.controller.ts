import { Controller, 
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException, 
} from '@nestjs/common';

import { ProductInput } from './dto/app.dto';

export type Product = {
  id: number;
  title: string;
  body: string;
  image: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};


@Controller('products')
export class AppController {
  products: Product[];

  constructor() {
    this.products = [
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        body: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday.",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        userId: 10,
        createdAt: new Date('2023-04-01T07:10:28.165Z'),
        updatedAt: new Date('2023-04-01T07:10:28.165Z')
      },
      {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        body: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
        userId: 20,
        createdAt: new Date('2023-04-01T11:11:26.122Z'),
        updatedAt: new Date('2023-04-01T11:11:26.122Z')
      }
    ]

  }

  //GET /products 
  @Get()
  findAll(){
    return this.products
  }

  //GET products/:id
  @Get(':id')
  findOne(@Param('id') id: number){
    const product = this.products.find((product) => product.id == id)

    if(!product){
      throw new NotFoundException(`Product with id: ${id} does not exist.`)
    }

    return product;
  }

//POST /products
@Post()
create(@Body() input: ProductInput){
  const id = this.products[this.products.length - 1].id;
  const date = new Date();

  const newProduct = {
    id: id + 1,
    title: input.title,
    body: input.body,
    image: input.image,
    userId: input.userId,
    createdAt: date,
    updatedAt: date,
  };

  this.products.push(newProduct);
  return newProduct;
}

//DELETE products/:id
@Delete(':id')
remove(@Param('id') id: number){
  const items = this.products.findIndex((product) => product.id == id);

  if(items == -1){
    throw new NotFoundException(`Product with id: ${id} does not exist.`)
  }

  this.products.splice(items, 1);

  return {
    message: `Product with id: ${id} has been succesfully deleted.`
  }
}

//PUT products/:id
@Put(':id')
update(@Param('id') id: number, @Body() input: ProductInput){
 const items = this.products.findIndex((product) => product.id == id);
 if(items == -1){
  throw new NotFoundException(`Product with id: ${id} does not exist.`)
 }

 const product = this.products[items];

 this.products[items] = {
    id: product.id, 
    title: input.title,
    body: input.body,
    image: input.image,
    userId: input.userId,
    createdAt: product.createdAt,
    updatedAt: new Date(),
  };

  return this.products[items];

}

//PATCH products/:id
@Patch(':id')
patch(@Param('id') id: number, @Body() input: ProductInput){
  const items = this.products.findIndex((product) => product.id == id);

  if (items == -1){
    throw new NotFoundException(`Product with id: ${id} does not exist`);
  }

  const product = this.products[items];

  this.products[items] = {
    id: product.id, 
    title: input.title || product.title,
    body: input.body || product.body,
    image: input.image || product.image,
    userId: input.userId || product.userId,
    createdAt: product.createdAt,
    updatedAt: new Date(),
  };

  return this.products[items];

}
}

