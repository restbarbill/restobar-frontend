export type ProductCategory =
  | 'FOOD'
  | 'BEER'
  | 'COCKTAIL'
  | 'BOTTLE'
  | 'SNACK'
  | 'PROMO_PACKAGE';

export type PreparationStation = 'NONE' | 'KITCHEN' | 'BAR';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  preparationStation: PreparationStation;
  salePrice: number;
  costPrice: number;
  stockQuantity: number;
  unitOfMeasure: string;
  imageUrl?: string | null;
  isAvailable: boolean;
}
