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

export type ProductType = {
  name: string;
  details: string;
  size: string;
  description: string[];
  quantity: number;
  price: number;
  rating: number;
  image: string;
  category: string;
  brand: string;
  ingredients: string[];
  id: string;
  review: ProductReviewType[];
};
