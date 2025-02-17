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
  // UsePipes,
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
import { EmployeeService } from './employee.service';
import {
  EmployeeDepartmentDto,
  EmployeeRoleDto,
  GetEmployeeDto,
  NewEmployeeDto,
} from './dtos/employee.dto';

@ApiTags('Employee')
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
@Controller('employee')
export class EmployeeController {
  constructor(private readonly _employeeService: EmployeeService) {}

  @Get('getAllEmployees')
  @ApiOperation({ summary: 'Return all the active employees' })
  @AppOkDataArrayResponse({
    description: 'An array with all the currect employees',
    type: GetEmployeeDto,
  })
  async getAllEmployees(): Promise<GetEmployeeDto[]> {
    const res = await this._employeeService.getAllEmployees();

    return res;
  }

  @Get('getEmployeeById/:id')
  @ApiOperation({ summary: 'Return an employee by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the employee',
    required: true,
    example: 1,
  })
  @AppOkResponse({
    description: 'An active employee',
    type: GetEmployeeDto,
  })
  async getEmployeeById(@Param('id') id: number): Promise<GetEmployeeDto> {
    const res = await this._employeeService.getEmployeeById(id);

    return res;
  }

  @Post('createEmployee')
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiBody({
    type: NewEmployeeDto,
    description: 'The values for the new employee',
    required: true,
    examples: {
      employeeExample: {
        value: {
          key: 'E0001',
          name: 'Irving',
          lastName: 'Salazar',
          maternalLastName: 'Rivas',
          rfc: 'VECJ880326XXX',
          curp: 'RACW050729MMCSHNA2',
          entryDate: new Date(),
          contractType: 'POR PROYECTO',
          salaryType: 'POR HORA',
          workingDay: 'MATUTINO',
          department: {
            id: 1,
            key: 'A0001',
            name: 'Pharmacy',
          } as EmployeeDepartmentDto,
          roles: [
            {
              id: 1,
              key: 'R0001',
              name: 'Chief Technology Officer',
            } as EmployeeRoleDto,
          ],
        } as NewEmployeeDto,
      },
    },
  })
  @AppOkResponse({
    description: 'The new employee',
    type: GetEmployeeDto,
  })
  // @UsePipes(NewEmployeePipe) // No se hara uso de "Pipes" ya que se agregaron validaciones del lado del DTO con "class-validator" y "class-transformer"
  async createEmployee(
    @Body() newEmployeeDto: NewEmployeeDto,
  ): Promise<GetEmployeeDto> {
    const res = await this._employeeService.createEmployee(newEmployeeDto);

    return res;
  }

  @Put('updateEmployeeById/:id')
  @ApiOperation({ summary: 'Update an employee by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the employee',
    required: true,
    example: 1,
  })
  @ApiBody({
    type: NewEmployeeDto,
    description: 'The values to update for the employee',
    required: true,
    examples: {
      employeeExample: {
        value: {
          key: 'E0001',
          name: 'Irving',
          lastName: 'Salazar',
          maternalLastName: 'Rivas',
          rfc: 'VECJ880326XXX',
          curp: 'RACW050729MMCSHNA2',
          entryDate: new Date(),
          contractType: 'POR PROYECTO',
          salaryType: 'POR HORA',
          workingDay: 'MATUTINO',
          department: {
            id: 1,
            key: 'A0001',
            name: 'Pharmacy',
          } as EmployeeDepartmentDto,
          roles: [
            {
              id: 1,
              key: 'R0001',
              name: 'Chief Technology Officer',
            } as EmployeeRoleDto,
          ],
        } as NewEmployeeDto,
      },
    },
  })
  @AppOkResponse({
    description: 'The employee with the new values',
    type: GetEmployeeDto,
  })
  async updateEmployeeById(
    @Param('id') id: number,
    @Body() updateEmployeeValuesDto: NewEmployeeDto,
  ): Promise<GetEmployeeDto> {
    const res = await this._employeeService.updateEmployeeById(
      id,
      updateEmployeeValuesDto,
    );

    return res;
  }

  @Delete('deleteEmployeeById/:id')
  @ApiOperation({ summary: 'Disable an employee by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the employee',
    required: true,
    example: 1,
  })
  @AppOkResponse({
    description: 'The deleted employee',
    type: GetEmployeeDto,
  })
  async deleteEmployeeById(@Param('id') id: number): Promise<GetEmployeeDto> {
    const res = await this._employeeService.deleteEmployeeById(id);

    return res;
  }
}
