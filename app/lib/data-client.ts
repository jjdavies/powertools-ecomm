import { Connection } from "postgrejs";
import Product from "../interface/Product";

const connection = new Connection("postgres://localhost");
await connection.connect();

// const sql = postgres({
//   host: "localhost",
//   port: 5432,
//   database: "powertools",
//   username: "postgres",
//   password: "admin",
// });

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await connection.query(`SELECT * FROM products`);
    console.log(products);
    return products as Product[]; // Type assertion to Product[]
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
