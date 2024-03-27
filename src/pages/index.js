import { useEffect, useRef, useState } from 'react';

async function getProducts() {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/list`;
  const res = await fetch(url);
  return await res.json();
}

export default function Home() {
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const productLoaded = useRef();
  useEffect(() => {
    if (productLoaded.current) return;
    productLoaded.current = true;
    async function fetchData() {
      const productsBD = await getProducts();
      if (
        productsBD &&
        productsBD.data &&
        productsBD.data.records &&
        productsBD.data.records.length > 0
      ) {
        setProducts(productsBD.data.records);
      }
      setLoadingProducts(false);
    }
    fetchData();
  }, []);
  return (
    <div className="wrapper">
      <h1>List Of Products</h1>
      {loadingProducts && <p className="loadingText">Loading Products...</p>}
      {products && products.length > 0 ? (
        <div className="ListProducts">Products</div>
      ) : (
        <p className="notFoundText">Products not found</p>
      )}
    </div>
  );
}
