import axios from "axios";
import * as z from "zod";

const baseURL = "https://fakestoreapi.com";

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
});

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.string(),
  category: z.string(),
  description: z.string(),
  image: z.string(),
});

export type Product = z.infer<typeof productSchema>;

export const fetchProducts = async () => {
  const {data} = await axiosInstance.get<Product[]>("/products");
  return data;
};

export const fetchSingleProduct = async (id: number) => {
  const {data} = await axiosInstance.get<Product>(`/products/${id}`);
  return data;
};
