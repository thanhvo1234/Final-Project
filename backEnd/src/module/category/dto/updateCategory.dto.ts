import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './createCategory.dto';

export class UpdateCategoryto extends PartialType(CreateCategoryDto) {}