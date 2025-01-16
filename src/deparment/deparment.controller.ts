import {
  Body,
  Controller,
  Delete,
  Get,
  // HttpException,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  // ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  // ApiOkResponse,
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
import { ResponseInterceptor } from 'src/application/interceptos/response.interceptor';
import { ResponseFilter } from 'src/application/filters/response.filter';
import {
  AppBadRequestResponse,
  AppInternalServerErrorResponse,
  AppOkDataArrayResponse,
  AppOkResponse,
} from 'src/application/models/app-response.decorator';
import { AppErrorResponseModel } from 'src/application/models/app-response.model';

@ApiTags('Department') // Se define el nombre del controlador en la documentacion de Swagger
@ApiBearerAuth() // El controlador requiere de Bearer Authentication
@UseGuards(JwtAuthGuard) // El controlador usara el Guard -> "JwtAuthGuard"
@UseInterceptors(ResponseInterceptor) // Se estandarizan las respuestas correctas en el controlador
@UseFilters(ResponseFilter) // Se estandarizan las respuestas fallidas en el controlador
// Se define el tipo de respuesta en caso de error 500 en el controlador en la documentacion de Swagger
@AppInternalServerErrorResponse({
  description: 'If something went wrong in the server',
  type: AppErrorResponseModel,
})
// Se define el tipo de respuesta en caso de error 400 en el controlador en la documentacion de Swagger
@AppBadRequestResponse({
  description: 'If the request was invalid',
  type: AppErrorResponseModel,
})
@Controller('department') // Se define el nombre del controlador
export class DepartmentController {
  constructor(private readonly _departmentService: DepartmentService) {}

  @Get('getAllDepartments')
  @ApiOperation({ summary: 'Return all the active deparmets' })
  // @ApiOkResponse({
  //   description: 'An array with all the currect departments',
  //   type: [GetDepartmentDto],
  // })
  @AppOkDataArrayResponse({
    description: 'An array with all the currect departments',
    type: GetDepartmentDto,
  })
  async getAllDepartments(): Promise<GetDepartmentDto[]> {
    // Prueba de funcionalidad del "Filter" "ResponseFilter"
    // throw new HttpException('Forbidden resource', 555);

    // No hay necesidad de poner un bloque try/catch, el "Filter" "ResponseFilter" se encarga de manera los errores que puedan ocurrir dentro de la ejecucion del codigo del "controller" y el "service"
    // try {
    const res = await this._departmentService.getAllDepartments();

    return res;
    // } catch (error) {
    //   return error;
    // }
  }

  @Get('getDepartmentById/:id')
  @ApiOperation({ summary: 'Return a department by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the department',
    required: true,
    example: 1,
  })
  // @ApiOkResponse({
  //   description: 'An active department',
  //   type: GetDepartmentDto,
  // })
  @AppOkResponse({
    description: 'An active department',
    type: GetDepartmentDto,
  })
  async getDepartmentById(@Param('id') id: number): Promise<GetDepartmentDto> {
    // No hay necesidad de poner un bloque try/catch, el "Filter" "ResponseFilter" se encarga de manera los errores que puedan ocurrir dentro de la ejecucion del codigo del "controller" y el "service"
    const res = await this._departmentService.getDepartmentById(id);

    return res;
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
  // @ApiOkResponse({
  //   description: 'The new department',
  //   type: GetDepartmentDto,
  // })
  @AppOkResponse({
    description: 'The new department',
    type: GetDepartmentDto,
  })
  @UsePipes(NewDepartmentsPipe)
  async createDepartment(
    @Body() newDepartmentDto: NewDepartmentDto,
  ): Promise<GetDepartmentDto> {
    // No hay necesidad de poner un bloque try/catch, el "Filter" "ResponseFilter" se encarga de manera los errores que puedan ocurrir dentro de la ejecucion del codigo del "controller" y el "service"
    const res =
      await this._departmentService.createDepartment(newDepartmentDto);

    return res;
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
  // @ApiOkResponse({
  //   description: 'The department with the new values',
  //   type: GetDepartmentDto,
  // })
  @AppOkResponse({
    description: 'The department with the new values',
    type: GetDepartmentDto,
  })
  @UsePipes(UpdateDepartmentsPipe)
  async updateDepartmentById(
    @Param('id') id: number,
    @Body() updateDepartmentValuesDto: NewDepartmentDto,
  ): Promise<GetDepartmentDto> {
    // No hay necesidad de poner un bloque try/catch, el "Filter" "ResponseFilter" se encarga de manera los errores que puedan ocurrir dentro de la ejecucion del codigo del "controller" y el "service"
    const res = await this._departmentService.updateDepartmentById(
      id,
      updateDepartmentValuesDto,
    );

    return res;
  }

  @Delete('deleteDepartmentById/:id')
  @ApiOperation({ summary: 'Disable a department by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the department',
    required: true,
    example: 1,
  })
  // @ApiOkResponse({
  //   description: 'The deleted department',
  //   type: GetDeletedDepartmentDto,
  // })
  @AppOkResponse({
    description: 'The deleted department',
    type: GetDeletedDepartmentDto,
  })
  @UsePipes(DeleteDepartmentsPipe)
  async deleteDepartmentById(
    @Param('id') id: number,
  ): Promise<GetDeletedDepartmentDto> {
    // No hay necesidad de poner un bloque try/catch, el "Filter" "ResponseFilter" se encarga de manera los errores que puedan ocurrir dentro de la ejecucion del codigo del "controller" y el "service"
    const res = await this._departmentService.deleteDepartmentById(id);

    return res;
  }
}
