import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const client = new PrismaClient();

interface ProductData {
  name: string;
  details: string;
  size: string;
  description: string[];
  quantity: number;
  price: number;
  images: string[];
  rating: number;
  thumbnail: string;
  category: string;
  brand: string;
  ingredients: string[];
  id: string;
}

interface UserData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  address1: string;
  zipcode: string;
  country: string;
  homePhone: string;
  mobilePhone: string;
  id: string;
  state: string;
}

interface ReviewData {
  rating: number;
  description: string;
  helpful: number;
  userId: string;
  productId: string;
}

const seed = async () => {
  await client.review.deleteMany({});
  await client.user.deleteMany({});
  await client.product.deleteMany({});

  const products: ProductData[] = [
    {
      name: "Balancing Cleansing Oil R (Refill)",
      size: "180ml (6.0oz)",
      details: "100% Naturally cultivated",
      description: [
        "「バランシング クレンジング オイル R」のリフィルが登場",
        "数々の賞を受賞してきたTHREEの王道クレンジングオイルに、詰め替えタイプが登場。環境にもライフスタイルにも寄り添うリフィルタイプで、THREEのベーシックなクレンジングアイテムを一層身近にお楽しみください。",
        "植物の恵みを凝縮したクレンジング。黄金色のオイルがとろけるように肌に広がり、メイクや肌に付着した大気中の汚れまでも速やかにオフ。深みのある心地良い香りに包まれて、1日がんばった肌と心をリラックスさせて。洗い流した後は、しっとりしなやかな肌へと導きます。",
        "■有機認証「COSMOS」を取得こちらの商品は、国際的な有機認証「COSMOS」を取得しています。原料の栽培法や、環境に配慮した製造工程、包装資材に関して厳しい基準が定められており、これら全てをクリアしています。",
      ],
      quantity: 10,
      price: 50.0,
      rating: 3.4,
      thumbnail: "https://www.threecosmetics.com/img/goods/L/t1b219.jpg",
      images: ["https://www.threecosmetics.com/img/goods/L/t1b219.jpg"],
      category: "skincare",
      brand: "THREE",
      ingredients: [
        "Tri(caprylic/capric acid) glyceryl",
        "Polyglyceryl-2 sesquioleate",
        "Olive fruit oil",
        "Polyglyceryl-2 caprate",
        "Jojoba seed oil",
        "Squalane",
        "Cha seed oil",
        "Pentacres la chloroba seed oil",
        "Crissimum maritimum extract",
        "Cha flower extract",
        "Orange peel oil",
        "mallow flower oil",
        "nucifugium vulgare oil",
        "Bitter orange leaf",
        "Branch oil",
        "Hypophaea ramnoides fruit oil",
        "carrot root extract",
        "Rice nucumber oil",
        "American oil palm fruit oil",
        "Hydrogenated vegetable oil",
        "Tocotrienol",
        "Tocopherol",
      ],
      id: "0",
    },
    {
      name: "Balancing Cleansing Oil (Gel version)",
      size: "125ml (4.6oz)",
      details: "100% Naturally cultivated",
      description: [
        "「発売1周年記念、バリューなラージサイズが限定で登場",
        "3種の天然クレンザーで毛穴の汚れまでするんとオフする、クレンジングオイルジェル。油性の汚れと親和性に優れた「植物オイル」、肌の凹凸汚れに微細な粒子の「天然スクラブ」、毛穴やキメの汚れを吸着する「天然クレイ」によるトリプル処方で、メイクを落としながら、肌をおだやかにディープクレンジング。心地よさで包みながら素肌を明るく導き、翌朝のメイクのりにまで違いが出ます。",
        "■有機認証「COSMOS」を取得こちらの商品は、国際的な有機認証「COSMOS」を取得しています。原料の栽培法や、環境に配慮した製造工程、包装資材に関して厳しい基準が定められており、これら全てをクリアしています。",
      ],
      quantity: 43,
      price: 60.0,
      rating: 4.6,
      thumbnail: "https://www.threecosmetics.com/img/goods/L/t1b264.jpg",
      images: ["https://www.threecosmetics.com/img/goods/L/t1b264.jpg"],
      category: "skincare",
      brand: "THREE",
      ingredients: [
        "(Caprylic/capric) coconut alkyl",
        "Octyldodecanol",
        "Glycerin",
        "Olive fruit oil",
        "Hexyl laurate",
        "Polyglyceryl-10 myristate",
        "Kaolin",
        "Jojoba seed oil",
        "Water",
        "Sucrose stearate",
        "Mandarin orange peel oil",
        "Sucrose laurate",
        "Argania spinosa husk",
        "mallow flower oil",
        "Bergamot peel oil",
        "Lavandula hybrida oil",
        "Nucifugium vulgare oil",
        "Brassica seed oil",
        "Opuntia ficus indica flower extract",
        "Amanazuna seed oil",
        "Rice nut oil",
        "Cha seed oil",
        "Carrot root extract",
        "Shea fat",
        "Oleic acid",
        "Cha flower extract",
        "Terminalia arguta extract",
        "Squalane",
        "Lecithin",
        "Tocotrienol",
        "Tocopherol",
      ],
      id: "1",
    },
    {
      name: "Balancing SQ Lip Balm",
      size: "7g",
      details: "",
      description: [
        "唇の乾燥ダメージを集中ケアする、濃密リップバーム",
        "乾燥によりダメージを受けた唇をトリートメントするリップバーム。固形のバームが体温でとろけ、睡眠中の唇をなめらかに整えます。甘くフルーティな精油の芳香が緊張をゆるめ、リラックスした気分へ。",
      ],
      quantity: 9,
      price: 40.0,
      rating: 5,
      thumbnail: "https://www.threecosmetics.com/img/goods/S/t1b104.jpg",
      images: ["https://www.threecosmetics.com/img/goods/S/t1b104.jpg"],
      category: "skincare",
      brand: "THREE",
      ingredients: [
        "Tri (caprylic/capric) glyceryl",
        "Beeswax",
        "Jojoba seed oil",
        "Jojoba ester",
        "Olive fruit oil",
        "Amani-oil",
        "Candelilla wax",
        "African mango kernel oil",
        "Cha seed oil",
        "Rice nuka oil",
        "squalane",
        "Cha flower extract",
        "Uraboshi yahuzu extract",
        "Mayolana leaf oil",
        "Bergamot fruit oil",
        "mallow flower oil",
        "Mandarin orange peel oil",
        "mandarin orange peel oil",
        "octhyldodecanol",
        "Hydrogenated coco glyceryl",
        "Tocotrienol",
        "Tocopherol",
      ],
      id: "2",
    },
    {
      name: "Whitening Sun Screen (Set of 2)",
      size: "50mL (1.69oz)",
      details: "SPF50+",
      description: [
        "This is a test description of a Korean Product rom&nd Whitening Sun Screen",
        "Checking to see how it looks in english to see what i can fit blah blah blah blu blu blu beep boop boop bop",
      ],
      quantity: 2,
      price: 25.0,
      rating: 3.5,
      thumbnail:
        "https://romand.co.kr/web/product/big/202206/ceb0ed2f0e3d9595e96e154d4c127c94.jpg",
      images: [
        "https://romand.co.kr/web/product/big/202206/ceb0ed2f0e3d9595e96e154d4c127c94.jpg",
      ],
      category: "skincare",
      brand: "rom&nd",
      ingredients: [],
      id: "3",
    },
    {
      name: "Hinoko Bathsalt",
      size: "400g",
      details: "",
      description: [
        "This is a test description of a Korean Product rom&nd Whitening Sun Screen",
        "Checking to see how it looks in english to see what i can fit blah blah blah blu blu blu beep boop boop bop",
      ],
      quantity: 54,
      price: 50.0,
      rating: 2.3,
      thumbnail:
        "https://shiro-shiro.jp/client_info/SHIRO/itemimage/12555/12555.jpg",
      images: [
        "https://shiro-shiro.jp/client_info/SHIRO/itemimage/12555/12555.jpg",
      ],
      category: "skincare",
      brand: "SHIRO",
      ingredients: [],
      id: "4",
    },
    {
      name: "Point Make Off",
      size: "120mL (4.5oz)",
      details: "",
      description: [
        "This is a test description of a Korean Product rom&nd Whitening Sun Screen",
        "Checking to see how it looks in english to see what i can fit blah blah blah blu blu blu beep boop boop bop",
      ],
      quantity: 0,
      price: 15.0,
      rating: 4.5,
      thumbnail:
        "https://kao-h.assetsadobe3.com/is/image/content/dam/sites/kanebo/www-kanebo-cosmetics-jp/lunasol/details/pointmake/p0601015/p0601015.jpg",
      images: [
        "https://kao-h.assetsadobe3.com/is/image/content/dam/sites/kanebo/www-kanebo-cosmetics-jp/lunasol/details/pointmake/p0601015/p0601015.jpg",
      ],
      category: "skincare",
      brand: "LUNASOL",
      ingredients: [],
      id: "5",
    },
    {
      name: "Tender Hug Balm Oil Cleansing",
      size: "150mL (5.6oz)",
      details: "",
      description: [
        "This is a test description of a Korean Product rom&nd Whitening Sun Screen",
        "Checking to see how it looks in english to see what i can fit blah blah blah blu blu blu beep boop boop bop",
      ],
      quantity: 19,
      price: 50.0,
      rating: 4.4,
      thumbnail:
        "https://kao-h.assetsadobe3.com/is/image/content/dam/sites/kanebo/www-kanebo-cosmetics-jp/lunasol/renew/details/skincare/s0101011/s0101011.png",
      images: [
        "https://kao-h.assetsadobe3.com/is/image/content/dam/sites/kanebo/www-kanebo-cosmetics-jp/lunasol/renew/details/skincare/s0101011/s0101011.png",
      ],
      category: "skincare",
      brand: "LUNASOL",
      ingredients: [],
      id: "6",
    },
    {
      name: "Oil-In Solution",
      size: "180mL (6.5oz)",
      details: "",
      description: [
        "This is a test description of a Korean Product rom&nd Whitening Sun Screen",
        "Checking to see how it looks in english to see what i can fit blah blah blah blu blu blu beep boop boop bop",
      ],
      quantity: 0,
      price: 66.0,
      rating: 4.0,
      thumbnail:
        "https://kao-h.assetsadobe3.com/is/image/content/dam/sites/kanebo/www-kanebo-cosmetics-jp/lunasol/details/skincare/s0101008/s0101008.jpg?fmt=jpeg",
      images: [
        "https://kao-h.assetsadobe3.com/is/image/content/dam/sites/kanebo/www-kanebo-cosmetics-jp/lunasol/details/skincare/s0101008/s0101008.jpg?fmt=jpeg",
      ],
      category: "skincare",
      brand: "LUNASOL",
      ingredients: [],
      id: "7",
    },
    {
      name: "Yoku Collection - Eye shadow",
      size: "6.5g",
      details: "Limited Tokyo Item",
      description: [
        "Kate Tokyo makeup",
        "Checking to see how it looks in english to see what i can fit blah blah blah blu blu blu beep boop boop bop",
      ],
      quantity: 2,
      images: [
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-1_app_600.jpg",
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-1_app_case.jpg",
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-1_app_case_open.jpg",
      ],
      price: 40,
      rating: 4.0,
      thumbnail:
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-1_app_300.jpg",
      category: "makeup",
      brand: "Kate Tokyo",
      ingredients: [],
      id: "8",
    },
  ];

  products.map(
    //@ts-ignore
    async (product) => await client.product.create({ data: product })
  );

  //Creates a lot of user data
  for (let i = 2; i < 50; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const testUser: UserData = {
      id: i.toString(),
      username: faker.internet.userName(firstName, lastName),
      password: "password",
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email(),
      city: faker.address.city(),
      address1: faker.address.streetAddress(),
      zipcode: faker.address.zipCodeByState("NY"),
      state: faker.address.stateAbbr(),
      country: "US",
      homePhone: faker.phone.number(),
      mobilePhone: faker.phone.number(),
    };

    await client.user.create({
      data: testUser,
    });
  }

  const guest: UserData = {
    id: "0",
    username: "guest",
    password: "password",
    firstName: "guest",
    lastName: "guest",
    email: "guest@example.com",
    city: "",
    address1: "",
    zipcode: "",
    state: "",
    country: "",
    homePhone: "",
    mobilePhone: "",
  };

  await client.user.create({
    data: guest,
  });

  const testUser: UserData = {
    id: "1",
    username: "test_account",
    password: "password",
    firstName: "test",
    lastName: "McTestFace",
    email: faker.internet.email(),
    city: faker.address.city(),
    address1: faker.address.streetAddress(),
    zipcode: faker.address.zipCodeByState("NY"),
    state: faker.address.stateAbbr(),
    country: "US",
    homePhone: faker.phone.number(),
    mobilePhone: faker.phone.number(),
  };

  await client.user.create({
    data: testUser,
  });

  //Creates a lot of reviews
  for (let i = 0; i < 100; i++) {
    const testReviews: ReviewData = {
      userId: Math.floor(Math.random() * 49).toString(),
      productId: Math.floor(Math.random() * 9).toString(),
      rating: Math.floor(Math.random() * 5) + 1,
      description: faker.lorem.lines(),
      helpful: Math.floor(Math.random() * 120),
    };
    await client.review.create({
      data: testReviews,
    });
  }
};

seed();
