import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { NewDepartmentDto } from './dtos/department.dto';

@Injectable()
export class NewDepartmentsPipe implements PipeTransform {
  transform(value: NewDepartmentDto, metadata: ArgumentMetadata) {
    console.log('NewDepartmentsPipe: ', metadata.type); // Es de tipo "body"

    if (!value.key) {
      throw new BadRequestException('The key is required!');
    }
    if (!value.name) {
      throw new BadRequestException('The name is required!');
    }
    // if (!value.description) {
    //   throw new BadRequestException('The description is not required');
    // }

    return value;
  }
}

@Injectable()
export class UpdateDepartmentsPipe implements PipeTransform {
  transform(value: NewDepartmentDto | number, metadata: ArgumentMetadata) {
    console.log('UpdateDepartmentsPipe: ', metadata.type); // Puede ser de tipo "body" o "param"

    if (metadata.type === 'body') {
      const valueBody = value as NewDepartmentDto;

      if (!valueBody.key) {
        throw new BadRequestException('The key is required!');
      }
      if (!valueBody.name) {
        throw new BadRequestException('The name is required!');
      }
      // if (!valueBody.description) {
      //   throw new BadRequestException('The description is not required');
      // }
    } else if (metadata.type === 'param') {
      const valueParam = value as number;

      // "valueParam" es el "id"
      if (!valueParam) {
        throw new BadRequestException('The id is required!');
      }
    }

    return value;
  }
}

@Injectable()
export class DeleteDepartmentsPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    console.log('DeleteDepartmentsPipe: ', metadata.type); // Es de tipo "param"

    // "value" es el "id"
    if (!value) {
      throw new BadRequestException('The id is required!');
    }

    return value;
  }
}
