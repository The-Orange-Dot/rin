import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

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
  instructions: string[];
  id: string;
  productCode?: string;
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
  status: "admin" | "user";
}

interface ReviewData {
  description: string;
  helpful: number;
  rating: number;
  userId: string;
  productId: string;
}

interface PostData {
  title: string;
  image: string;
  subtitle: string;
  body: string;
  category: string;
  writer: string;
  keywords: string[];
}

const seed = async () => {
  console.log("Hydrating seed data...");
  await client.review.deleteMany({});
  await client.user.deleteMany({});
  await client.product.deleteMany({});
  await client.post.deleteMany({});

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
      instructions: [],
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
      instructions: [],
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
      instructions: [],
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
      thumbnail: "https://m.media-amazon.com/images/I/61fAljjSzwS._SL1500_.jpg",
      images: ["https://m.media-amazon.com/images/I/61fAljjSzwS._SL1500_.jpg"],
      category: "skincare",
      instructions: [],
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
      instructions: [],
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
      instructions: [],
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
      instructions: [],
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
      instructions: [],
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
      name: "The Colors Select (YOKU) - EX-1 Eyeshadow",
      size: "6.1g / 0.2oz",
      details: "Express who you are with more freedom",
      description: [
        "Express who you are with more freedom",
        "Four different textures on the eyeshadow palette: ",
        "A: see through glow: A base color to create gloss and shadow",
        "B: Matte : Color that tones your face up *血色感アップカラー",
        "C. Pearl : Glossy color that tones your face",
        "D. Prism Crush: Shimmery pigments that makes you gorgeous",
        "All products from A to D are applicable as eyeshadows, blush, contour and eyebrows.  ",
      ],
      quantity: 2,
      instructions: [
        "Take A with your finger or the thick end of the tip and spread over the entire eyelid and the outer corner of the lower eyelid.",
        'Take B with the thick end of the tip and apply in a "U" shape around the inner corner of the eye.',
        "Take C with the thin end of the tip and apply in a line around the corner of the eye.",
        "Take B on a finger and blend in a vertical oval on the cheek.",
        "Take D on your finger and apply to the upper eyelid and high cheeks to glow up your skin.",
      ],
      price: 40.0,
      images: [
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-1_app_600.jpg",
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-1_app_case.jpg",
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-1_app_case_open.jpg",
        "https://cf-simple-s3-origin-rin-cloudfront-s3-994834096994.s3.amazonaws.com/kate_tokyo/yoku_series/kate_tokyo_ex-1_app_instructions.jpg",
      ],
      rating: 4.0,
      thumbnail:
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-1_app_300.jpg",
      category: "make-up",
      brand: "Kate Tokyo",
      ingredients: [
        "Phytosteryl",
        " Dipentaerythryl pentaisostearate",
        " Silica",
        " Hydrogenated polyisobutene",
        " Tetra(hydroxystearate/isostearate)dipentaerythryl",
        " Zinc myristate",
        " Sorbitan sesqui-isostearate",
        " Carnauba wax",
        " Al distearate",
        " Tocopherol",
        " Al Tocopherol",
        " Chlorphenesin",
        " Sodium dehydroacetate",
        " (+/-)gunjo",
        " Mica",
        " Titanium dioxide",
        " Iron oxide",
        " Al hydroxide",
        " Ba sulfate",
        " Tin oxide",
        " Borosilicate (Ca/Al)",
        " Yellow 4",
        " Blue 1",
        " Red 202",
        " Red 226",
      ],
      id: "8",
    },
    {
      name: "Eye shadow - Yoku Collection - EX-2",
      size: "6.5g",
      details: "Limited Tokyo Item",
      description: [
        "Kate Tokyo makeup",
        "Checking to see how it looks in english to see what i can fit blah blah blah blu blu blu beep boop boop bop",
      ],
      quantity: 2,
      price: 40.0,
      images: [
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-2_app_600.jpg",
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-2_app_case.jpg",
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-2_app_case_open.jpg",
      ],
      rating: 4.0,
      thumbnail:
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-2_app_300.jpg",
      category: "make-up",
      brand: "Kate Tokyo",
      ingredients: [],
      instructions: [],
      id: "9",
    },
    {
      name: "Highlighter - Yoku Collection - EX-1",
      size: "3.4g",
      details: "Limited Tokyo Item",
      description: [
        "Kate Tokyo makeup",
        "Checking to see how it looks in english to see what i can fit blah blah blah blu blu blu beep boop boop bop",
      ],
      quantity: 2,
      price: 30.0,
      images: [
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-1_brush_600.jpg",
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-1_brush_case.jpg",
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-1_brush_case_open.jpg",
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_brush.jpg",
      ],
      rating: 4.0,
      thumbnail:
        "https://d31pc8y2j50o7q.cloudfront.net/kate_tokyo/yoku_series/kate_tokyo_ex-1_brush_300.jpg",
      category: "make-up",
      brand: "Kate Tokyo",
      ingredients: [],
      instructions: [],
      id: "10",
    },
  ];

  await products.map(
    async (product) => await client.product.create({ data: product as any })
  );
  console.log("Products complete...");

  //Creates a lot of user data
  for (let i = 2; i < 50; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const testUser: UserData = {
      id: i.toString(),
      username: faker.internet.userName(firstName, lastName),
      password: "password",
      firstName: firstName,
      status: "user",
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
    status: "user",
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
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (error, salt) => {
    bcrypt.hash("password123", salt, async (error, hash) => {
      const testUser: UserData = {
        id: "1",
        username: "admin",
        password: hash,
        firstName: "admin",
        lastName: "mcTestFace",
        status: "admin",
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
    });
  });
  console.log("Users complete...");

  //Creates a lot of reviews
  for (let i = 0; i < 150; i++) {
    const testReviews: ReviewData = {
      userId: Math.floor(Math.random() * 49).toString(),
      productId: Math.floor(Math.random() * 11).toString(),
      rating: Math.floor(Math.random() * 5) + 1,
      description: faker.lorem.lines(),
      helpful: Math.floor(Math.random() * 120),
    };

    await client.review.create({
      data: testReviews,
    });
  }
  console.log("Reviews complete...");

  for (let i = 0; i < 10; i++) {
    const imageArray = [
      "cosmetics.jpg",
      "cute_colorful.png",
      "cute_phone_2.jpg",
      "cute_phone_3.jpg",
      "cute_pink.jpg",
      "cute_shadow_2.jpeg",
      "cute_shadow.jpeg",
      "face_wash.jpg",
      "sakura.jpg",
      "packing.jpg",
      "smartphone_girls.jpg",
    ];
    const categoryArray = ["fashion", "culture", "cosmetics", "blog"];

    for (let j = 0; j < 10; j++) {
      const category = categoryArray[Math.floor(Math.random() * 4)];
      const title = faker.lorem.words(Math.floor(Math.random() * 5) + 3);
      const mainImage = imageArray[Math.floor(Math.random() * 11)];
      const subtitle = faker.lorem.words(10);

      let body = faker.lorem.sentences(Math.floor(Math.random() * 50) + 50);
      let imageBoolean = Math.floor(Math.random() * 2);
      let longerArticle = Math.floor(Math.random() * 2);

      while (longerArticle) {
        if (imageBoolean) {
          body.concat("\n", imageArray[Math.floor(Math.random() * 11)]);
        } else {
          body.concat(
            "\n",
            faker.lorem.sentences(Math.floor(Math.random() * 50) + 50)
          );
        }

        imageBoolean = Math.floor(Math.random() * 3);
        longerArticle = Math.floor(Math.random() * 3);

        if (!longerArticle) {
          const newPost: PostData = {
            title: title,
            image: mainImage,
            subtitle: subtitle,
            body: body,
            category: category,
            writer: faker.name.firstName(),
            keywords: ["test", "blah"],
          };

          await client.post.create({
            data: newPost,
          });
        }
      }
    }
  }

  console.log("Hydration complete!");
};

seed();
