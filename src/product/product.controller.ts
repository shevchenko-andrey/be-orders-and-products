import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { AddProductDto } from './dto/add-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get()
  async getAllProducts(
    @Query('page') pageNumber = 1,
    @Query('limit') pageSize = 10,
    @Query('type') type?: string,
    @Query('specification') specification?: string,
  ) {
    return this.productService.getAllProducts(pageNumber, pageSize, {
      filters: { type, specification },
    });
  }

  @Post()
  addProduct(@Body() product: AddProductDto) {
    return this.productService.addProduct(product);
  }

  @Patch(':id')
  updateProductById(
    @Param('id') id: number,
    @Body() product: Partial<UpdateProductDto>,
  ) {
    return this.productService.updateProductById(id, product);
  }

  @Delete(':id')
  deleteProductById(@Param('id') id: number) {
    return this.productService.deleteProductById(id);
  }
}
