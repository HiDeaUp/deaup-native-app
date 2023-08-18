export interface House {
  id: number;
  title: string;
  description: string;
  category: string;
  address: string;
  image?: string;
  price: number;
  bedroom: number;
  bathroom: number;
  car: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}
