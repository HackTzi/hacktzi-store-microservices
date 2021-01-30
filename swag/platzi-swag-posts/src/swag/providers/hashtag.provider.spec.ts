import { HashtagProvider } from './hashtag.provider';

describe(HashtagProvider.name, () => {
  let provider: HashtagProvider;

  beforeAll(() => {
    provider = new HashtagProvider();
  });

  it('should return tags from text', () => {
    const tags = provider.extractFromText(`
      Hello #world i'm in #Hudson #City #Live #LIG
    `);
    expect(tags).toEqual(['world', 'hudson', 'city', 'live', 'lig']);
  });

  it('should return unique tags from text', () => {
    const tags = provider.extractFromText(`
      Hello #world #world #World
    `);
    expect(tags).toEqual(['world']);
  });
});
