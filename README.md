# Marktplaats.js

## Installation

```bash
npm install @danericc/marktplaats.js
```

## Example usage

```typescript
import { Offers } from '@danericc/marktplaats.js';

async function main() {
  const offers = new Offers('Ford Ka 2014')
    .setLimit(3) // the amount
    .setDistance(10000) // the distance is in meters
    .setOffset(30) // the offset to start from
    .setPostcode('3311BH'); // the postcode to search from

  const result = await offers.fetch();
  console.log(result);
}

main();
```
