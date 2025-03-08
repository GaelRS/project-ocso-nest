import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.docorator';
import { ROLES } from 'src/auth/constants/role.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import {ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiOperation({ summary: 'Crear un producto', description: 'Crea un nuevo producto en el sistema.' })
  @ApiResponse({
    status: 201,
    example: {
      productId:"UUID",
      productName: "Tennis",
      price: 1000,
      countSeal: 10,
    } as Product
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiOperation({ summary: 'Mostar todos productos', description: 'Se muestran todos los productos del Ocso' })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiOperation({ summary: 'Buscar un producto', description: 'Busca un producto por su id' })
  @Get(':id')
  findOne(@Param('id',new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.findOne(id);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiOperation({ summary: 'Buscar productos por proveedor', description: 'Busca todos los productos de un proveedor' })
  @Get('provider/:id')
  findByProvider(@Param('id',new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.findByProvider(id);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiOperation({ summary: 'Buscar productos por categoria', description: 'Busca todos los productos de una categoria' })
  @Patch(':id')
  update(@Param('id',new ParseUUIDPipe({version: '4'})) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Auth(ROLES.MANAGER)
  @ApiOperation({ summary: 'Eliminar un producto', description: 'Elimina un producto del sistema' })
  @Delete(':id')
  remove(@Param('id',new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.remove(id);
  }
}
