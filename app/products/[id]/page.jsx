import ProductDetail from "../../_components/ProductDetail";

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "force-cache",
  });
  const products = await res.json();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "force-cache",
  });
  return res.json();
}

export default async function Page({ params }) {
  const product = await getProduct(params.id);

  return <ProductDetail params={params} product={product} />;
}
