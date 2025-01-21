import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseFilter } from 'src/application/filters/response.filter';
import { ResponseInterceptor } from 'src/application/interceptos/response.interceptor';
import {
  AppBadRequestResponse,
  AppInternalServerErrorResponse,
  AppOkDataArrayResponse,
  AppOkResponse,
} from 'src/application/models/app-response.decorator';
import { AppErrorResponseModel } from 'src/application/models/app-response.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EmployeeRoleService } from './employee-role.service';
import {
  GetDeletedEmployeeRoleDto,
  GetEmployeeRoleDto,
  NewEmployeeRoleDto,
} from './dtos/employee-role.dto';
import {
  DeleteEmployeeRolePipe,
  NewEmployeeRolePipe,
  UpdateEmployeeRolePipe,
} from './employee-role.pipe';

@ApiTags('Employee Roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
@UseFilters(ResponseFilter)
@AppInternalServerErrorResponse({
  description: 'If something went wrong in the server',
  type: AppErrorResponseModel,
})
@AppBadRequestResponse({
  description: 'If the request was invalid',
  type: AppErrorResponseModel,
})
@Controller('employee-role')
export class EmployeeRoleController {
  constructor(private readonly _employeeRoleService: EmployeeRoleService) {}

  @Get('getAllEmployeeRoles')
  @ApiOperation({ summary: 'Return all the active employee roles' })
  @AppOkDataArrayResponse({
    description: 'An array with all the currect employee roles',
    type: GetEmployeeRoleDto,
  })
  async getAllEmployeeRoles(): Promise<GetEmployeeRoleDto[]> {
    const res = await this._employeeRoleService.getAllEmployeeRoles();

    return res;
  }

  @Get('getEmployeeRoleById/:id')
  @ApiOperation({ summary: 'Return an employee role by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the employee role',
    required: true,
    example: 1,
  })
  @AppOkResponse({
    description: 'An active employee role',
    type: GetEmployeeRoleDto,
  })
  async getEmployeeRoleById(
    @Param('id') id: number,
  ): Promise<GetEmployeeRoleDto> {
    const res = await this._employeeRoleService.getEmployeeRoleById(id);

    return res;
  }

  @Post('createEmployeeRole')
  @ApiOperation({ summary: 'Create a new employee role' })
  @ApiBody({
    type: NewEmployeeRoleDto,
    description: 'The values for the new employee role',
    required: true,
    examples: {
      pharmacyExample: {
        key: 'R0001',
        name: 'Chief Technology Officer',
        description:
          'He is responsible for leading the technical and technological department of a company',
      } as NewEmployeeRoleDto,
    },
  })
  @AppOkResponse({
    description: 'The new employee role',
    type: GetEmployeeRoleDto,
  })
  @UsePipes(NewEmployeeRolePipe)
  async createEmployeeRole(
    @Body() newEmployeeRoleDto: NewEmployeeRoleDto,
  ): Promise<GetEmployeeRoleDto> {
    const res =
      await this._employeeRoleService.createEmployeeRole(newEmployeeRoleDto);

    return res;
  }

  @Put('updateEmployeeRoleById/:id')
  @ApiOperation({ summary: 'Update an employee role by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the employee role',
    required: true,
    example: 1,
  })
  @ApiBody({
    type: NewEmployeeRoleDto,
    description: 'The values to update for the employee role',
    required: true,
    examples: {
      a: {
        key: 'R0001',
        name: 'Chief Technology Officer',
        description:
          'He is responsible for leading the technical and technological department of a company',
      } as NewEmployeeRoleDto,
    },
  })
  @AppOkResponse({
    description: 'The employee role with the new values',
    type: GetEmployeeRoleDto,
  })
  @UsePipes(UpdateEmployeeRolePipe)
  async updateEmployeeRoleById(
    @Param('id') id: number,
    @Body() updateEmployeeRoleValuesDto: NewEmployeeRoleDto,
  ): Promise<GetEmployeeRoleDto> {
    const res = await this._employeeRoleService.updateEmployeeRoleById(
      id,
      updateEmployeeRoleValuesDto,
    );

    return res;
  }

  @Delete('deleteEmployeeRoleById/:id')
  @ApiOperation({ summary: 'Disable an employee role by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the employee role',
    required: true,
    example: 1,
  })
  @AppOkResponse({
    description: 'The deleted employee role',
    type: GetDeletedEmployeeRoleDto,
  })
  @UsePipes(DeleteEmployeeRolePipe)
  async deleteEmployeeRoleById(
    @Param('id') id: number,
  ): Promise<GetDeletedEmployeeRoleDto> {
    const res = await this._employeeRoleService.deleteEmployeeRoleById(id);

    return res;
  }
}
