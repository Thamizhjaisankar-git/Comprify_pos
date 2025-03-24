export const sampleTrolleys = [
  {
    _id: "trolley1",
    store: "store123",
    store_name: "Store 123", // For display purposes
    trolley_code: "TR-1001",
    status: "available",
    current_user: null,
    current_cart: null,
    last_used_at: null,
    history: [],
    created_at: "2023-01-15T10:30:00Z",
  },
  {
    _id: "trolley2",
    store: "store123",
    store_name: "Store 123",
    trolley_code: "TR-1002",
    status: "in-use",
    current_user: "user456",
    current_cart: "cart789",
    last_used_at: "2023-03-20T14:45:00Z",
    history: ["history1", "history2"],
    created_at: "2023-01-20T09:15:00Z",
  },
  {
    _id: "trolley3",
    store: "store456",
    store_name: "Store 456",
    trolley_code: "TR-2001",
    status: "maintenance",
    current_user: null,
    current_cart: null,
    last_used_at: "2023-03-18T11:20:00Z",
    history: ["history3"],
    created_at: "2023-02-05T13:40:00Z",
  },
];

// SmartCart data
export const sampleCarts = [
  {
    _id: "cart789",
    user: "user456",
    store: "store123",
    trolley_id: "TR-1002",
    status: "active",
    location: {
      x: 45,
      y: 23,
      last_updated: "2023-03-20T15:10:00Z",
    },
    items: [
      {
        product: {
          _id: "prod1",
          name: "Organic Apples",
          price: 4.99,
        },
        quantity: 2,
        actual_weights: [0.45, 0.52],
        added_at: "2023-03-20T14:50:00Z",
      },
      {
        product: {
          _id: "prod2",
          name: "Whole Grain Bread",
          price: 3.49,
        },
        quantity: 1,
        actual_weights: [0.75],
        added_at: "2023-03-20T14:55:00Z",
      },
      {
        product: {
          _id: "prod3",
          name: "Milk 1L",
          price: 2.99,
        },
        quantity: 1,
        actual_weights: [1.03],
        added_at: "2023-03-20T15:05:00Z",
      },
    ],
    weights: [
      {
        recorded_at: "2023-03-20T14:50:00Z",
        total_weight: 0.45,
      },
      {
        recorded_at: "2023-03-20T14:55:00Z",
        total_weight: 1.72,
      },
      {
        recorded_at: "2023-03-20T15:05:00Z",
        total_weight: 2.75,
      },
    ],
    flags: [
      {
        issue: "weight mismatch on item #2",
        flagged_at: "2023-03-20T14:56:00Z",
      },
    ],
    total_price: 16.46,
    created_at: "2023-03-20T14:45:00Z",
  },
];

// SmartShoppingHistory data
export const sampleHistory = [
  {
    _id: "history1",
    user: "user456",
    store: "store123",
    trolley_id: "TR-1002",
    smart_cart: "cart123",
    cart_items: [
      {
        product: {
          _id: "prod4",
          name: "Bananas",
          price: 1.99,
        },
        quantity: 1,
        actual_weights: [0.35],
        price_at_purchase: 1.99,
      },
      {
        product: {
          _id: "prod5",
          name: "Cereal",
          price: 4.49,
        },
        quantity: 1,
        actual_weights: [0.5],
        price_at_purchase: 4.49,
      },
    ],
    total_price: 6.48,
    payment_method: "card",
    checkout_time: "2023-02-15T11:30:00Z",
    flags: [],
  },
  {
    _id: "history2",
    user: "user456",
    store: "store123",
    trolley_id: "TR-1002",
    smart_cart: "cart456",
    cart_items: [
      {
        product: {
          _id: "prod6",
          name: "Orange Juice",
          price: 3.99,
        },
        quantity: 1,
        actual_weights: [1.1],
        price_at_purchase: 3.99,
      },
      {
        product: {
          _id: "prod7",
          name: "Chicken Breast",
          price: 8.99,
        },
        quantity: 2,
        actual_weights: [0.8, 0.75],
        price_at_purchase: 17.98,
      },
      {
        product: {
          _id: "prod8",
          name: "Pasta",
          price: 1.49,
        },
        quantity: 1,
        actual_weights: [0.5],
        price_at_purchase: 1.49,
      },
    ],
    total_price: 23.46,
    payment_method: "UPI",
    checkout_time: "2023-03-05T16:45:00Z",
    flags: [
      {
        issue: "weight mismatch on chicken breast",
        flagged_at: "2023-03-05T16:40:00Z",
      },
    ],
  },
  {
    _id: "history3",
    user: "user789",
    store: "store456",
    trolley_id: "TR-2001",
    smart_cart: "cart789",
    cart_items: [
      {
        product: {
          _id: "prod9",
          name: "Chocolate Bar",
          price: 2.49,
        },
        quantity: 3,
        actual_weights: [0.1, 0.1, 0.1],
        price_at_purchase: 7.47,
      },
      {
        product: {
          _id: "prod10",
          name: "Bottled Water",
          price: 1.29,
        },
        quantity: 2,
        actual_weights: [0.5, 0.5],
        price_at_purchase: 2.58,
      },
    ],
    total_price: 10.05,
    payment_method: "wallet",
    checkout_time: "2023-03-18T10:30:00Z",
    flags: [],
  },
];
