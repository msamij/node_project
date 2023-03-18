import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { Product } from './entities/product.entity';
import { ProductPurchase } from './entities/product.purchase.entity';
import { ProductService } from './services/product.servive';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductPurchase])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
