import { USE_MOCKS } from "@/constants/config";
import { api } from "@/lib/api";
import { mockProduct } from "@/mocks/product.mock";
import type { Product } from "@/types/product";

const mockProductService = {
  getByBarcode: async (_barcode: string): Promise<Product> => mockProduct,
};

const apiProductService = {
  getByBarcode: async (barcode: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/barcode/${barcode}`);
    return response.data;
  },
};

export const productService = USE_MOCKS ? mockProductService : apiProductService;
