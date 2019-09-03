import { Controller, Logger, Post, UsePipes, ValidationPipe, Body, Get, Param, ParseIntPipe, Delete, Patch, Query } from '@nestjs/common';
import { StudentCategoryService } from './student-category.service';
import { AddStudentCategoryDto } from './dto/student-category.dto';
import { StudentCategory } from './student-category.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { getEnabledCategories } from 'trace_events';

@ApiUseTags('StudentCategory')
@Controller('student-category')
export class StudentCategoryController {
    private logger = new Logger('StudentCategoryController');
    constructor(private studentCategoryService: StudentCategoryService) {}

    @Post()
    @UsePipes(ValidationPipe)
    addCategory(
        @Body() addStudentCategoryDto: AddStudentCategoryDto,
    ): Promise<StudentCategory> {
        return this.studentCategoryService.addCategory(addStudentCategoryDto);
    }

    @Get(':id')
    getCategoryById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<StudentCategory> {
        return this.studentCategoryService.getCategoryById(id);
    }

    @Get()
    getCategories(): Promise<Partial<StudentCategory[]>> {
        return this.studentCategoryService.getAllCategories();
    }

    @Delete(':id')
    deleteCategoryById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        return this.studentCategoryService.deleteCategoryById(id);
    }

    @Patch(':id')
    updateCategories(
        @Param('id', ParseIntPipe) id: number,
        @Body() addStudentCategoryDto: AddStudentCategoryDto,
    ) {
        return this.studentCategoryService.updateCategory(id, addStudentCategoryDto);
    }
}
