import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }

  async getAll(): Promise<Product[] | null> {
    const productsAll = await this.productModel.find().exec();
    if (productsAll.length) {
      return productsAll;
    }
    return null;
  }

  async getById(id: string): Promise<Product | null> {
    const productById = await this.productModel.findById(id);
    if (productById) {
      return productById;
    }
    return null;
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(productDto);
    return await newProduct.save();
  }

  async remove(id: string): Promise<Product | null> {
    const productRemoved = await this.productModel.findByIdAndRemove(id);
    if (productRemoved) {
      return productRemoved;
    }
    return null;
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product | null> {
    const productUpdated = await this.productModel.findByIdAndUpdate(id, productDto, {
      new: true,
    });
    if (productUpdated) {
      return productUpdated;
    }
    return null;
  }
}
