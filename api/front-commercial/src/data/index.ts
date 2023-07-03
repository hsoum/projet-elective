export default {
  recipes: [
    {
      id: 1,
      title: 'Watermelon',
      subtitle: 'Recipes with Anna Grace',
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fwatermelon.png?alt=media&token=cf2c61b2-5ce5-4918-bc04-bb8bd0e02ddb',
    },
    {
      id: 2,
      title: 'Asparagus',
      subtitle: 'Recipes with Anna Grace',
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fasparagus.png?alt=media&token=ef611b39-09b0-4a25-8579-45cea2ac1e0e',
    },
  ],

  news: {
    standard: {
      type: 'standard',
      title: 'ExpressFood',
      description:
        'La livraison rapide de nourriture à votre porte, pour satisfaire vos papilles sans attendre !',
      callToAction: 'Explorer !',
      callToActionURL: '#',
      imageURL:
        'https://img.freepik.com/premium-vector/food-delivery_24908-48920.jpg?w=2000' },
    coupon: {
      type: 'coupon',
      title: 'Spring coupon',
      coupon: 'FRUITS2021',
      discount: 10,
      description: 'Gives 10% off all seasonal fruits on your firstdd purchase.',
    },
  },

  saleProducts: [
    {
      id: 1,
      imageURL:
        'https://www.ptitchef.com/imgupl/recipe/french-tacos--457637p713643.jpg',
      name: 'Tacos',
      price: [
        {
          name: 'regular',
          price: 6,
        },
        {
          name: 'sale',
          price: 6 * 0.7,
        },
      ],
      unit: 'pound',
      rate: 5,
    },
    {
      id: 2,
      imageURL:
        'https://www.allrecipes.com/thmb/0xH8n2D4cC97t7mcC7eT2SDZ0aE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6776_Pizza-Dough_ddmfs_2x1_1725-fdaa76496da045b3bdaadcec6d4c5398.jpg',
      name: 'Pizza',
      price: [
        {
          name: 'regular',
          price: 11,
        },
        {
          name: 'sale',
          price: 11 * 0.7,
        },
      ],
      unit: 'pound',
      rate: 5,
    },
    {
      id: 3,
      imageURL:
        'data:image/jpeg;base64,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',
      name: 'Riz balsamique',
      price: [
        {
          name: 'regular',
          price: 9,
        },
        {
          name: 'sale',
          price: 9 * 0.7,
        },
      ],
      unit: 'pound',
      rate: 5,
    },
    {
      id: 4,
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fyellow-buckthorn.png?alt=media',
      name: 'Yellow buckthorn',
      price: [
        {
          name: 'regular',
          price: 10,
        },
        {
          name: 'sale',
          price: 10 * 0.7,
        },
      ],
      unit: 'pound',
      rate: 4.5,
    },
    {
      id: 5,
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fwhite-adriatic-figs.png?alt=media',
      name: 'White adriatic figs',
      price: [
        {
          name: 'regular',
          price: 4,
        },
        {
          name: 'sale',
          price: 4 * 0.7,
        },
      ],
      unit: 'pound',
      rate: 4.4,
    },
    {
      id: 6,
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fnatural-mango.png?alt=media',
      name: 'Natural mango King size',
      price: [
        {
          name: 'regular',
          price: 12,
        },
        {
          name: 'sale',
          price: 12 * 0.7,
        },
      ],
      unit: 'pound',
      rate: 4.5,
    },
    {
      id: 7,
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fgold-apricots.png?alt=media',
      name: 'Gold apricots Jumbo Limited edition',
      price: [
        {
          name: 'regular',
          price: 5.4,
        },
        {
          name: 'sale',
          price: 5.4 * 0.7,
        },
      ],
      unit: 'pound',
      rate: 4.5,
    },
    
    {
      id: 8,
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fgold-apricots.png?alt=media',
      name: 'Gold apricots Jumbo Limited edition',
      price: [
        {
          name: 'regular',
          price: 5.4,
        },
        {
          name: 'sale',
          price: 5.4 * 0.7,
        },
      ],
      unit: 'pound',
      rate: 3,
    },
       
    
  ],

  newProducts: [
    {
      id: 10,
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fraisins-from-red-grapes.png?alt=media',
      name: 'Raisins from red grapes Extra series',
      price: [{ name: 'regular', price: 4 }],
      unit: 'pound',
      rate: 4.5,
    },
    {
      id: 11,
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fpistachios.png?alt=media',
      name: 'Roasted peeled pistachios',
      price: [{ name: 'regular', price: 10 }],
      unit: 'pound',
      rate: 4.9,
    },
    {
      id: 12,
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fred-beans.png?alt=media',
      name: 'Red beans',
      price: [{ name: 'regular', price: 7 }],
      unit: 'pound',
      rate: 5,
    },
    {
      id: 13,
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fassorted.png?alt=media',
      name: 'Assorted: black, red, spotty and string beans',
      price: [{ name: 'regular', price: 9 }],
      unit: 'pound',
      rate: 5,
    },
    {
      id: 14,
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fblack-beans.png?alt=media',
      name: 'Black beans',
      price: [{ name: 'regular', price: 12 }],
      unit: 'pound',
      rate: 4.9,
    },
    {
      id: 15,
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fchocolate-apricots.png?alt=media',
      name: 'Chocolate apricots',
      price: [
        {
          name: 'regular',
          price: 2.6,
        },
      ],
      unit: 'pound',
      rate: 4.4,
    },
    {
      id: 16,
      imageURL:
        'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/sprout%2Fseedless-prune.png?alt=media',
      name: 'Seedless prune',
      price: [
        {
          name: 'regular',
          price: 3,
        },
      ],
      unit: 'pound',
      rate: 4.4,
    },
  ],

  restaurants : [
{
id: 10,
imageURL:
"https://images.thebusinessplanshop.com/2168/idees-de-restaurant.jpg",
name: "Restaurant Le Jardin d'Alger",
cuisine: "Cuisine algérienne",
location: "Alger",
rating: 4.5,
products: [1],
},
{
  id: 10,
  imageURL:
  "https://images.thebusinessplanshop.com/2168/idees-de-restaurant.jpg",
  name: "Restaurant Le Jardin d'Alger",
  cuisine: "Cuisine algérienne",
  location: "Alger",
  rating: 4.5,
  products: [1],
  },
{
id: 11,
imageURL:
"https://images.thebusinessplanshop.com/2168/idees-de-restaurant.jpg",
name: "Restaurant La Terrasse",
cuisine: "Cuisine méditerranéenne",
location: "Alger",
rating: 4.9,
products: [3, 2],
},
{
id: 12,
imageURL:
"https://images.thebusinessplanshop.com/2168/idees-de-restaurant.jpg",
name: "Restaurant Le Palais des Saveurs",
cuisine: "Cuisine internationale",
location: "Alger",
rating: 5,
products: [4],
},
{
id: 13,
imageURL:
"https://images.thebusinessplanshop.com/2168/idees-de-restaurant.jpg",
name: "Restaurant Les Délices d'Alger",
cuisine: "Cuisine traditionnelle",
location: "Alger",
rating: 5,
products: [6],
},
{
id: 14,
imageURL:
"https://images.thebusinessplanshop.com/2168/idees-de-restaurant.jpg",
name: "Restaurant Mer et Terre",
cuisine: "Fruits de mer",
location: "Alger",
rating: 4.9,
products: [7],
},
{
id: 15,
imageURL:
"https://images.thebusinessplanshop.com/2168/idees-de-restaurant.jpg",
name: "Restaurant Végé Algérie",
cuisine: "Cuisine végétarienne",
location: "Alger",
rating: 4.4,

},
{
id: 16,
imageURL:
"https://images.thebusinessplanshop.com/2168/idees-de-restaurant.jpg",
name: "Restaurant Grillades d'Alger",
cuisine: "Grillades",
location: "Alger",
rating: 4.4,
},
]
}
