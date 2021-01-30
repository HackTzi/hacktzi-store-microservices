import { Injectable } from '@nestjs/common';
import * as extract from 'mention-hashtag';
import slugify from 'slugify';

@Injectable()
export class HashtagProvider {
  readonly regex = new RegExp(':?^%|#(w+)', 'g');

  extractFromText(text: string): string[] {
    const tags = extract(text, { type: '#', symbol: false });
    return this.uniques(tags);
  }

  private uniques(tags: string[]): string[] {
    return Array.from(new Set(tags.map((tag) => this.slugify(tag))));
  }

  private slugify(value: string): string {
    return slugify(value, {
      replacement: '_',
      lower: true,
    });
  }
}
