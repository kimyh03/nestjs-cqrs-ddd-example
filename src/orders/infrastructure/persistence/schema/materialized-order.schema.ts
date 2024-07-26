import { Schema } from 'dynamoose';

export abstract class MaterializedOrderKey {
  id: string;
}

export const MaterializedOrderSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  customerId: {
    type: String,
  },
  status: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  totalDiscount: {
    type: Number,
  },
  totalAmountWithDiscount: {
    type: Number,
  },
  items: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          id: String,
          quantity: Number,
          unitPrice: Number,
        },
      },
    ],
  },
  discounts: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          id: String,
          type: String,
          value: Number,
        },
      },
    ],
  },
  createdAt: {
    type: String,
  },
  eventPosition: {
    type: Number,
  },
});
