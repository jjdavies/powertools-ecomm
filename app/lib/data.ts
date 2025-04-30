import postgres from "postgres";

const sql = postgres({
  host: "localhost",
  port: 5432,
  database: "powertools",
  username: "postgres",
  password: "admin",
});

export async function getProducts() {
  try {
    const products = await sql`SELECT * FROM products`;
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
