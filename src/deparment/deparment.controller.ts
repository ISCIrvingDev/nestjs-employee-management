import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DepartmentService } from './department.service';
import {
  GetDeletedDepartmentDto,
  GetDepartmentDto,
  NewDepartmentDto,
} from './dtos/department.dto';
import {
  DeleteDepartmentsPipe,
  NewDepartmentsPipe,
  UpdateDepartmentsPipe,
} from './department.pipe';

@ApiTags('Department')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('department')
export class DepartmentController {
  constructor(private readonly _departmentService: DepartmentService) {}

  @Get('getAllDepartments')
  @ApiOperation({ summary: 'Return all the active deparmets' })
  @ApiOkResponse({
    description: 'An array with all the currect departments',
    type: [GetDepartmentDto],
  })
  @ApiBadRequestResponse({ description: 'Invalid request!' })
  async getAllDepartments(): Promise<GetDepartmentDto[]> {
    try {
      const res = await this._departmentService.getAllDepartments();

      return res;
    } catch (error) {
      return error;
    }
  }

  @Get('getDepartmentById/:id')
  @ApiOperation({ summary: 'Return a department by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the department',
    required: true,
    example: 1,
  })
  @ApiOkResponse({
    description: 'An active department',
    type: GetDepartmentDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request!' })
  async getDepartmentById(@Param('id') id: number): Promise<GetDepartmentDto> {
    try {
      const res = await this._departmentService.getDepartmentById(id);

      return res;
    } catch (error) {
      return error;
    }
  }

  @Post('createDepartment')
  @ApiOperation({ summary: 'Create a new department' })
  @ApiBody({
    type: NewDepartmentDto,
    description: 'The values for the new department',
    required: true,
    examples: {
      pharmacyExample: {
        key: 'A0001',
        name: 'Pharmacy',
        description:
          'Area of ​​pharmacists, pharmacy technicians and customer service personnel',
      } as NewDepartmentDto,
    },
  })
  @ApiOkResponse({
    description: 'The new department',
    type: GetDepartmentDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request!' })
  @UsePipes(NewDepartmentsPipe)
  async createDepartment(
    @Body() newDepartmentDto: NewDepartmentDto,
  ): Promise<GetDepartmentDto> {
    try {
      const res =
        await this._departmentService.createDepartment(newDepartmentDto);

      return res;
    } catch (error) {
      return error;
    }
  }

  @Put('updateDepartmentById/:id')
  @ApiOperation({ summary: 'Update a department by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the department',
    required: true,
    example: 1,
  })
  @ApiBody({
    type: NewDepartmentDto,
    description: 'The values to update for the department',
    required: true,
    examples: {
      a: {
        key: 'A0001',
        name: 'Pharmacy',
        description:
          'Area of ​​pharmacists, pharmacy technicians and customer service personnel',
      } as NewDepartmentDto,
    },
  })
  @ApiOkResponse({
    description: 'The department with the new values',
    type: GetDepartmentDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request!' })
  @UsePipes(UpdateDepartmentsPipe)
  async updateDepartmentById(
    @Param('id') id: number,
    @Body() updateDepartmentValuesDto: NewDepartmentDto,
  ): Promise<GetDepartmentDto> {
    try {
      const res = await this._departmentService.updateDepartmentById(
        id,
        updateDepartmentValuesDto,
      );

      return res;
    } catch (error) {
      return error;
    }
  }

  @Delete('deleteDepartmentById/:id')
  @ApiOperation({ summary: 'Disable a department by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the department',
    required: true,
    example: 1,
  })
  @ApiOkResponse({
    description: 'The new department',
    type: GetDeletedDepartmentDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request!' })
  @UsePipes(DeleteDepartmentsPipe)
  async deleteDepartmentById(
    @Param('id') id: number,
  ): Promise<GetDeletedDepartmentDto> {
    try {
      const res = await this._departmentService.deleteDepartmentById(id);

      return res;
    } catch (error) {
      return error;
    }
  }
}
