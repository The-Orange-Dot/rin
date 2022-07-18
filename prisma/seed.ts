import { PrismaClient } from "@prisma/client";
import products from "../pages/products";

const client = new PrismaClient();

interface ProductData {
  name: string;
  subtitle: string;
  description: string[];
  quantity: number;
  price: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
}

const seed = async () => {
  const products = [
    {
      name: "Balancing Cleansing Oil R (Refill)",
      subtitle: "180ml (6.0oz) - 100% Naturally cultivated",
      description: [
        "「バランシング クレンジング オイル R」のリフィルが登場",
        "数々の賞を受賞してきたTHREEの王道クレンジングオイルに、詰め替えタイプが登場。環境にもライフスタイルにも寄り添うリフィルタイプで、THREEのベーシックなクレンジングアイテムを一層身近にお楽しみください。",
        "植物の恵みを凝縮したクレンジング。黄金色のオイルがとろけるように肌に広がり、メイクや肌に付着した大気中の汚れまでも速やかにオフ。深みのある心地良い香りに包まれて、1日がんばった肌と心をリラックスさせて。洗い流した後は、しっとりしなやかな肌へと導きます。",
        "■有機認証「COSMOS」を取得こちらの商品は、国際的な有機認証「COSMOS」を取得しています。原料の栽培法や、環境に配慮した製造工程、包装資材に関して厳しい基準が定められており、これら全てをクリアしています。",
      ],
      quantity: 100,
      price: 50.0,
      reviews: 0,
      image: "https://www.threecosmetics.com/img/goods/L/t1b219.jpg",
      category: "skincare",
      brand: "THREE",
    },
    {
      name: "Balancing Cleansing Oil (Gel version)",
      subtitle: "125ml (4.6oz) - 100% Naturally cultivated",
      description: [
        "「発売1周年記念、バリューなラージサイズが限定で登場",
        "3種の天然クレンザーで毛穴の汚れまでするんとオフする、クレンジングオイルジェル。油性の汚れと親和性に優れた「植物オイル」、肌の凹凸汚れに微細な粒子の「天然スクラブ」、毛穴やキメの汚れを吸着する「天然クレイ」によるトリプル処方で、メイクを落としながら、肌をおだやかにディープクレンジング。心地よさで包みながら素肌を明るく導き、翌朝のメイクのりにまで違いが出ます。",
        "■有機認証「COSMOS」を取得こちらの商品は、国際的な有機認証「COSMOS」を取得しています。原料の栽培法や、環境に配慮した製造工程、包装資材に関して厳しい基準が定められており、これら全てをクリアしています。",
      ],
      quantity: 100,
      price: 60.0,
      reviews: 0,
      image: "https://www.threecosmetics.com/img/goods/L/t1b264.jpg",
      category: "skincare",
      brand: "THREE",
    },
    {
      name: "Balancing SQ Lip Balm",
      subtitle: "7g",
      description: [
        "唇の乾燥ダメージを集中ケアする、濃密リップバーム",
        "乾燥によりダメージを受けた唇をトリートメントするリップバーム。固形のバームが体温でとろけ、睡眠中の唇をなめらかに整えます。甘くフルーティな精油の芳香が緊張をゆるめ、リラックスした気分へ。",
      ],
      quantity: 100,
      price: 40.0,
      reviews: 0,
      image: "https://www.threecosmetics.com/img/goods/S/t1b104.jpg",
      category: "skincare",
      brand: "THREE",
    },
    {
      name: "Whitening Sun Screen (Set of 2)",
      subtitle: "50mL (1.69oz) 5g SPF50+",
      description: [
        "This is a test description of a Korean Product rom&nd Whitening Sun Screen",
        "Checking to see how it looks in english to see what i can fit blah blah blah blu blu blu beep boop boop bop",
      ],
      quantity: 100,
      price: 25.0,
      reviews: 0,
      image:
        "https://romand.co.kr/web/product/big/202206/ceb0ed2f0e3d9595e96e154d4c127c94.jpg",
      category: "skincare",
      brand: "rom&nd",
    },
  ];

  products.map(
    async (product) => await client.product.create({ data: product })
  );
};

seed();
