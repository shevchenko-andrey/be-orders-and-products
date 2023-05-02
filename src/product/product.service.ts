import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { removeUndefinedFields } from 'src/common/helpers';
import { Repository } from 'typeorm';
import { AddPriceDto } from './dto/add-price.dto';
import { AddProductDto } from './dto/add-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Price, Product } from './entities';

interface IFilterOptions {
  type: string;
  specification: string;
}

interface IFindOptions {
  filters: IFilterOptions;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Price) private priceRepository: Repository<Price>,
  ) {}

  async getAllProducts(pageNumber, pageSize = 10, options: IFindOptions) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const filters = removeUndefinedFields(options.filters);

    const [products, count] = await this.productsRepository.findAndCount({
      where: { ...filters },
      relations: ['prices'],
      skip,
      take,
    });

    return {
      products,
      count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: pageNumber,
    };
  }

  async addProduct({ prices, ...product }: AddProductDto) {
    try {
      const newProduct = await this.productsRepository.save(product);

      await this.savePrices(prices, newProduct.id);

      return newProduct;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('SerialNumber mast be unique');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async savePrices(prices: AddPriceDto[], product: number): Promise<Price[]> {
    const productPrices = prices.map((price) => ({ ...price, product }));
    return await this.priceRepository.save(productPrices);
  }

  async deleteProductById(id: number) {
    await this.productsRepository.delete(id);
  }

  async updateProductById(id: number, product: Partial<UpdateProductDto>) {
    await this.productsRepository.update(id, product);
  }
}
