export interface ProductModel {
  id: string;
  amount: number;
  quantity: number;
  currency: string;
  successUrl: string;
  failedUrl: string;
  name: string;
  description: string;
  buyNowClicked: boolean;
}
