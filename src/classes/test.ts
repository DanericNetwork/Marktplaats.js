import { Offers, SortOrder } from './getOffers';

void (async function () {
  const query = new Offers('Bank').setLimit(3).setSort(SortOrder.Newest);
  const offers = (await query.fetch()) as any[];
  console.log(offers);
})();
