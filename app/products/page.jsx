import ProductList from "./ProductList";

async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "force-cache",
  });
  return res.json();
}

export default async function Page() {
  const initialProducts = await fetchProducts();

  return <ProductList initialProducts={initialProducts} />;
}
