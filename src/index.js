/* Script Entry */
import { MongoClient } from 'mongodb';
import { dbUrl } from '../config';

const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const subscriptions = client.db('production').collection('subscriptions');

    subscriptions.updateMany(
      {
        'lineItem.sku': 'MAN-TR2-RB',
      },
      {
        $set: {
          'lineItem.sku': 'MAN-K-RBA',
          'lineItem.variantId':
            'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNDIzOTA5MDY1NTM2OA==',
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
}

run();
