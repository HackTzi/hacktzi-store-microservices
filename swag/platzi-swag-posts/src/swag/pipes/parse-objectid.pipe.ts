import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ObjectID } from 'bson';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, ObjectID> {
  transform(id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException(
        'Incorrect id format, it should be an ObjectID',
      );
    }
    return new ObjectID(id);
  }
}
