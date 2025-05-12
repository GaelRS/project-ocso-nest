import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
  @InjectRepository(Product)
  private productRepository: Repository<Product>){}

  
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product;
  }

  findAll() {
    return this.productRepository.find({
      relations: {
        provider: true
      }
    });
  }

  async findOne(id: string) {
    const productFound = await this.productRepository.findOne({ where: { productId: id }, relations: { provider: true } });

    if (!productFound) throw new NotFoundException();
    return productFound;
  }

  findByProvider(id: string) {
    return this.productRepository.findBy({
      provider:{
        providerId:id,
      }
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productUpdated = await this.productRepository.preload({
      productId: id,
      ...updateProductDto
    });
    if(!productUpdated) throw new NotFoundException();
    this.productRepository.save(productUpdated);
    return productUpdated;
  }

  async remove(id: string) {
    const productFound = await this.productRepository.findOne({ where: { productId:id } });

    if (!productFound) throw new NotFoundException();

    await this.productRepository.remove(productFound);
    return {
      message: `Objeto con id ${id} eliminado`
    }
  }
}
