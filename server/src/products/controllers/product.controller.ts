import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';
import { ProductService } from '../services/product.servive';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  saveProduct(@Body() createProductDto: ProductDto) {
    Logger.log(createProductDto);
    this.productService.createProduct(createProductDto);
    return HttpCode(201);
  }

  @Get()
  getAllProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getSingleProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductBasedOnId(id);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: ProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }
}
