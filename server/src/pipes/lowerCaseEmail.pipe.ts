import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class LowerCaseEmailPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.email) {
      const transformedData = {
        ...value,
        email: value.email.toLowerCase(),
      };
      return transformedData;
    }
    return value;
  }
}
