export type TProductForm = {
  name: string;
  categoryId: string;
  shop: string;
  quantity: number;
  price: number;
  file: File | null;
  warranty: Date | null;
};
