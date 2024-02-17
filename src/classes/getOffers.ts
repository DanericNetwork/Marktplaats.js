interface MarktplaatsOffer {
  itemId: string;
  title: string;
  description: string;
  priceInfo: {
    priceCents: number;
  };
  pictures: {
    small: string;
    large: string;
  };
  location?: {
    cityName: string;
  };
}

export class Offers {
  private limit?: number = 30;
  private offset?: number = 0;
  private query: string;
  private searchInTitleAndDescription?: boolean = true;
  private distanceMeters?: number;
  private postcode?: string;

  constructor(query: string) {
    this.query = query;
  }

  setLimit(limit: number): this {
    this.limit = limit;
    return this;
  }

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

  async fetch(): Promise<MarktplaatsOffer[]> {
    const limit = this.limit ?? 30;
    const offset = this.offset ?? 0;
    const searchInTitleAndDescription =
      this.searchInTitleAndDescription ?? true;
    const distanceMeters = this.distanceMeters ?? undefined;
    const postcode = this.postcode ?? undefined;
    const url = `https://www.marktplaats.nl/lrp/api/search?limit=${limit}&offset=${offset}&query=${
      this.query
    }${postcode ? '&postcode=' + postcode : ''}${
      distanceMeters ? '&distanceMeters=' + distanceMeters : ''
    }&searchInTitleAndDescription=${searchInTitleAndDescription.toString()}&viewOptions=list-view`;
    const response = await fetch(url);
    const data: any = await response.json();
    // map the data to the interface
    let mapped = data.listings.map((item: any) => {
      return {
        itemId: item.itemId,
        title: item.title,
        description: item.description,
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
