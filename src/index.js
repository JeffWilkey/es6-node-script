/* Script Entry */
import { MongoClient } from 'mongodb';
import { dbUrlEU, dbUrlUK, dbUrlAU } from '../config';

const client = new MongoClient(dbUrlAU, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const Subscription = client.db('production').collection('subscriptions');

    const cursor = await Subscription.find({
      $or: [
        { 'lineItem.currency': null },
        { 'lineItem.currency': { $exists: false } },
        { 'lineItem.quantity': { $exists: false } },
        { 'lineItem.quantity': null },
      ],
    });
    const count = await cursor.count();

    console.log(count);

    const subscriptions = await cursor.toArray();

    for (const subscription of subscriptions) {
      try {
        await Subscription.updateOne(
          { _id: subscription._id },
          {
            $set: {
              'lineItem.quantity': 1,
              'lineItem.currency': 'AUD',
            },
          }
        );

        console.log(subscription._id + ' updated');
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

run();
