import { Offers, myPackage } from '../src';

describe('index', () => {
  describe('myPackage', () => {
    it('should return a string containing the message', () => {
      const message = 'Hello';

      const result = myPackage(message);

      expect(result).toMatch(message);
    });
  });
});

describe('Offers', () => {
  it('should return a request object with the query', () => {
    const query = 'bicycle';

    const offers = new Offers(query);

    expect(offers).toMatchObject({ query });
  });
});
