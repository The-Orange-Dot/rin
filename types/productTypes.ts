export type UserReviewType = {
  image: string;
  username: string;
};

export type ProductReviewType = {
  createdAt: string;
  description: string;
  helpful: number;
  rating: number;
  updatedAt: string;
  userReview: UserReviewType;
  userId: string;
  productId: string;
  id: string;
};

export type CountType = {
  reviews: number;
};

export type ProductType = {
  id: string;
  name: string;
  details: string;
  size: string;
  description: string[];
  quantity: number;
  price: number;
  rating: number;
  images: string[];
  thumbnail: string;
  category: string;
  brand: string;
  ingredients: string[];
  reviews: ProductReviewType[];
  _count: CountType;
  instructions: string[];
};

export type Item = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  stock: number;
  details: string;
  size: string;
  images: string[];
  thumbnail: string;
};

export type ShoppingCart = {
  value: Item[];
};

export type OrderHistoryType = {
  username: string;
  products: ShoppingCart;
  registeredUser: boolean;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
};
