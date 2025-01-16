import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { AppResponseModel } from './app-response.model';

/*
 * Para genericos -> T
 * Version -> Function
 */

// 200 - Ok Response
export function AppOkResponse<DataDto extends Type<unknown>>({
  type,
  description,
}: {
  type: DataDto;
  description: string;
}) {
  return applyDecorators(
    ApiExtraModels(AppResponseModel, type),
    ApiOkResponse({
      description: description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(AppResponseModel) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(type),
              },
            },
          },
        ],
      },
    }),
  );
}

export function AppOkDataArrayResponse<DataDto extends Type<unknown>>({
  type,
  description,
}: {
  type: DataDto;
  description: string;
}) {
  return applyDecorators(
    ApiExtraModels(AppResponseModel, type),
    ApiOkResponse({
      description: description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(AppResponseModel) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(type) },
              },
            },
          },
        ],
      },
    }),
  );
}

// 500 - Internal Server Error Response
export function AppInternalServerErrorResponse<DataDto extends Type<unknown>>({
  type,
  description,
}: {
  type: DataDto;
  description: string;
}) {
  return applyDecorators(
    ApiExtraModels(AppResponseModel, type),
    ApiInternalServerErrorResponse({
      description: description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(AppResponseModel) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(type),
              },
            },
          },
        ],
      },
    }),
  );
}

// 400 - Bad Request Response
export function AppBadRequestResponse<DataDto extends Type<unknown>>({
  type,
  description,
}: {
  type: DataDto;
  description: string;
}) {
  return applyDecorators(
    ApiExtraModels(AppResponseModel, type),
    ApiBadRequestResponse({
      description: description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(AppResponseModel) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(type),
              },
            },
          },
        ],
      },
    }),
  );
}

// ------------------------------------------------------------------------

// Para genericos -> T
// Version -> Anonymous Function
// export const AppOkResponse = <DataDto extends Type<unknown>>(
//   type: DataDto,
//   description: string,
// ) => {
//   return applyDecorators(
//     ApiExtraModels(AppResponseModel, type),
//     ApiOkResponse({
//       description: description,
//       schema: {
//         allOf: [
//           { $ref: getSchemaPath(AppResponseModel) },
//           {
//             properties: {
//               data: {
//                 $ref: getSchemaPath(type),
//               },
//             },
//           },
//         ],
//       },
//     }),
//   );
// };

// Para genericos con arrays -> [T]
// export const AppDataTableResponseDecorator = <DataDto extends Type<unknown>>(
//   type: DataDto,
// ) =>
//   applyDecorators(
//     ApiExtraModels(AppResponseModel, type),
//     ApiOkResponse({
//       schema: {
//         allOf: [
//           { $ref: getSchemaPath(AppResponseModel) },
//           {
//             properties: {
//               data: {
//                 type: 'array',
//                 items: { $ref: getSchemaPath(type) },
//               },
//             },
//           },
//         ],
//       },
//     }),
//   );
