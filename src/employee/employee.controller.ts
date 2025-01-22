import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
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
    try {
      const res = await this._employeeService.getAllEmployees();

      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
    try {
      const res = await this._employeeService.getEmployeeById(id);

      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
  // @UsePipes(NewEmployeePipe) // Aqui me quede -> Agregar el Pipe y las validaciones del lado del DTO
  async createEmployee(
    @Body() newEmployeeDto: NewEmployeeDto,
  ): Promise<GetEmployeeDto> {
    const res = await this._employeeService.createEmployee(newEmployeeDto);

    return res;
  }
}
