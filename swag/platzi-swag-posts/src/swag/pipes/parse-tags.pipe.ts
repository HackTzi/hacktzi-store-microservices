import { ArgumentMetadata, Injectable, ParseArrayPipe } from '@nestjs/common';
import { HashtagProvider } from '../providers/hashtag.provider';

@Injectable()
export class ParseTagsPipe extends ParseArrayPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    const items = await super.transform(value, metadata);

    if (Array.isArray(items)) {
      return items.map((item) => HashtagProvider.slugifyTag(item));
    }

    return items;
  }
}
