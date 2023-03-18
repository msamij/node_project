import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductParams } from '../types/productParams';
import { Product } from '../entities/product.entity';
import { ProductPurchase } from '../entities/product.purchase.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductPurchase)
    private productPurchaseRepository: Repository<ProductPurchase>,
  ) {}

  async createProduct(productParams: ProductParams): Promise<void> {
    const product = new Product();
    product.name = productParams.name;
    product.quantity = productParams.quantity;
    await this.productRepository.save(product);
  }

  getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  getProductBasedOnId(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async updateProduct(id: number, updateProduct: ProductParams) {
    return this.productRepository.findOne({ where: { id } }).then((product) => {
      if (!product)
        throw new NotFoundException(`Product with ID ${id} not found!`);

      if (updateProduct.name) {
        product.name = updateProduct.name;
      }
      if (updateProduct.quantity) {
        product.quantity = updateProduct.quantity;
      }

      return this.productRepository.save(product);
    });
  }
}
