// Product types
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Cart types
export interface CartItem extends Product {
  quantity: number;
}

// User / Auth types
export interface User {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  token?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// API Response
export interface ApiError {
  message: string;
  status: number;
}

// Dashboard CRUD
export interface NewProduct {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Promotion
export interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: string;
  badge: string;
  color: string;
  endDate: string;
}

// FAQ
export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}
