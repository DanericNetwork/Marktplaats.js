import { Offers } from './getOffers';

void (async function () {
  const query = new Offers('ford')
    .setLimit(5)
    .setDistance(5000)
    .setPostcode('7827ED');
  const offers = (await query.fetchOffers()) as any[];
  console.log(offers);
})();
