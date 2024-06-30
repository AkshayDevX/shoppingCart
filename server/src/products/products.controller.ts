import {
  Controller,
  Get,
  Param,
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

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const decodedId = Buffer.from(id, 'base64').toString('utf-8');
    return this.productsService.findOne(decodedId);
  }

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
    console.log(files);
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
}
