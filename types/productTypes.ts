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
};

type Count = {
  reviews: number;
};

export type ProductType = {
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
  id: string;
  review: ProductReviewType[];
  _count: Count;
};

export type Item = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  stock: number;
  details: string;
  size: string;
  image: string;
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
