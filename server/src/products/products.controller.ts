import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // get all products
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // get one product
  @Get(':id')
  findOne(@Param('id') id: string) {
    const decodedId = Buffer.from(id, 'base64').toString('utf-8');
    return this.productsService.findOne(decodedId);
  }

  // create a new product (admin)
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
  ) {
    const { name, description, price, stock } = req.body;
    const images: { publicId: string; url: string }[] = [];
    if (files.length === 1) {
      const imageFile = await this.cloudinaryService.uploadFile(files[0]);
      images.push({
        publicId: imageFile.public_id,
        url: imageFile.secure_url,
      });
    } else {
      for (const imageFile of files) {
        const image = await this.cloudinaryService.uploadFile(imageFile);
        images.push({
          publicId: image.public_id,
          url: image.secure_url,
        });
      }
    }
    const product = {
      name,
      description,
      price,
      stock,
      images,
    };
    return this.productsService.create(product);
  }

  // delete image (admin)
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Patch(':id')
  async deleteImage(@Param('id') id: string, @Body() body: any) {
    await this.cloudinaryService.deleteFile(body.publicId);
    const decodedId = Buffer.from(id, 'base64').toString('utf-8');
    return this.productsService.deleteImage(decodedId, body.publicId);
  }

  // update product (admin)
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Patch('update/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async update(@Param('id') id: string, @Req() req: Request,  @UploadedFiles() files: Express.Multer.File[]) {
    const { name, description, price, stock } = req.body;
    const images: { publicId: string; url: string }[] = [];
    if (files && files.length === 1) {
      const imageFile = await this.cloudinaryService.uploadFile(files[0]);
      images.push({
        publicId: imageFile.public_id,
        url: imageFile.secure_url,
      });
    } else if (files && files.length > 1) {
      for (const imageFile of files) {
        const image = await this.cloudinaryService.uploadFile(imageFile);
        images.push({
          publicId: image.public_id,
          url: image.secure_url,
        });
      }
    }
    const product = {
      name,
      description,
      price,
      stock,
      images,
    };

    const decodedId = Buffer.from(id, 'base64').toString('utf-8');
    return this.productsService.update(decodedId, product);
  }

  // delete product (admin)
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const decodedId = Buffer.from(id, 'base64').toString('utf-8');
    return this.productsService.delete(decodedId);
  }
  
}
