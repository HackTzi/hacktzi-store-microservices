import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { SortBy } from '../enums/sort-by.enum';

const allowedValues = Object.values(SortBy);
const errorMessage = `Incorrect value for sortBy, should be one of ${allowedValues.join(
  ', ',
)}`;

@Injectable()
export class ParseSortPipe implements PipeTransform<string, SortBy> {
  transform(value: any) {
    if (!value) {
      return undefined;
    }

    if (!allowedValues.includes(value)) {
      throw new BadRequestException(errorMessage);
    }

    return value as SortBy;
  }
}
