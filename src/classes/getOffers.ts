interface MarktplaatsOffer {
  itemId: string;
  title: string;
  description: string;
  date: string;
  priceInfo: {
    priceCents: number;
    priceEuros: number;
  };
  pictures: {
    small: string;
    large: string;
  };
  location?: {
    cityName: string;
  };
}

export enum SortOrder {
  Newest = 'DECREASING',
  Oldest = 'INCREASING',
}

export class Offers {
  private limit?: number = 30;
  private offset?: number = 0;
  private query: string;
  private searchInTitleAndDescription?: boolean = true;
  private distanceMeters?: number;
  private postcode?: string;
  private sortBy?: boolean;
  private sortOrder?: string;

  constructor(query: string) {
    this.query = query;
    this.sortBy = false;
  }

  setLimit(limit: number): this {
    this.limit = limit;
    return this;
  }

  /**
   *
   * @param offset the offset to start from
   * @returns
   */
  setOffset(offset: number): this {
    this.offset = offset;
    return this;
  }

  /**
   *
   * @param postcode postcode of the location to search from, e.g. 4461AB
   * @returns
   */
  setPostcode(postcode: string): this {
    this.postcode = postcode;
    return this;
  }

  /**
   *
   * @param distanceMeters Distance in meters
   */
  setDistance(distanceMeters: number): this {
    this.distanceMeters = distanceMeters;
    return this;
  }

  /**
   *
   * @param searchInTitleAndDescription
   * @default true
   * @returns
   */
  setSearchInTitleAndDescription(searchInTitleAndDescription: boolean): this {
    this.searchInTitleAndDescription = searchInTitleAndDescription;
    return this;
  }

  /**
   *
   * @param sortOrder Newest or Oldest
   */
  setSort(sortOrder: SortOrder): this {
    this.sortBy = true;
    this.sortOrder = sortOrder;
    return this;
  }

  /**
   *
   * @returns Promise<MarktplaatsOffer[]>
   */
  async fetch(): Promise<MarktplaatsOffer[]> {
    // Set the defaults if not set
    const query = `&query=${this.query}`;
    const limit = this.limit ? `?limit=${this.limit}` : '?limit=30';
    const offset = this.offset ? `&offset=${this.offset}` : '&offset=0';
    const searchInTitleAndDescription = this.searchInTitleAndDescription
      ? `&searchInTitleAndDescription=true`
      : `&searchInTitleAndDescription=false`;
    const distanceMeters = this.distanceMeters
      ? `&distanceMeters=${this.distanceMeters}`
      : '';
    const postcode = this.postcode ? `&postcode=${this.postcode}` : '';
    const sorting = this.sortBy
      ? `&sortBy=SORT_INDEX&sortOrder=${this.sortOrder}`
      : '';

    // make the url
    const url = `https://www.marktplaats.nl/lrp/api/search${limit}${offset}${query}${postcode}${distanceMeters}${searchInTitleAndDescription}${sorting}&viewOptions=list-view`;
    // fetch the data
    const response = await fetch(url);
    const data: any = await response.json();
    console.log(url);
    // console.log(data);
    // map the data to the interface
    let mapped = data.listings.map((item: any) => {
      return {
        itemId: item.itemId,
        title: item.title,
        description: item.description,
        date: item.date,
        priceInfo: {
          priceCents: item.priceInfo.priceCents,
          priceEuros: item.priceInfo.priceCents / 100,
        },
        pictures: {
          small: item.pictures[0].mediumUrl,
          large: item.pictures[0].extraExtraLargeUrl,
        },
        location: {
          cityName: item.location.cityName,
        },
      };
    });
    return mapped as MarktplaatsOffer[];
  }
}
