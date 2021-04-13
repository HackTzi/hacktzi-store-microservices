import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './entities/product.entity';
import slugify from 'slugify';

const slugifyConfig = {
  replacement: '-', // replace spaces with replacement character, defaults to `-`
  // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
  strict: true, // strip special characters except replacement, defaults to `false`
  locale: 'es',
};

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  listenTo = () => Product;

  async afterInsert(event: InsertEvent<Product>) {
    /** Assing title_uri  */

    event.entity.title_uri = slugify(
      `${event.entity.id} ${event.entity.title}`,
      slugifyConfig,
    );

    console.log(event.entity);

    await event.manager
      .getRepository(Product)
      .update({ id: event.entity.id }, { title_uri: event.entity.title_uri });
  }
}
