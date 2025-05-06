import postgres from "postgres";
import Product from "../interface/Product";

const sql = postgres({
  host: "localhost",
  port: 5432,
  database: "powertools",
  username: "postgres",
  password: "admin",
});

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await sql<Product[]>`SELECT * FROM products`;
    return products as Product[]; // Type assertion to Product[]
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
