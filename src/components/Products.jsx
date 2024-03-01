import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../modules/Products.module.scss";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await axios.get(
      `https://fakestoreapi.com/products?_page=${page}&_limit=10`
    );
    const data = res.data;
    setProducts((prevProducts) => [...prevProducts, ...data]);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    fetchProducts();
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles["products"]}>
        {products.map((product) => (
          <div key={product.id} className={styles["product"]}>
            <img src={product.image} className={styles["image"]} />
            <div className={styles["info"]}>
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <p>
                Rating: {product.rating.rate} ({product.rating.count})
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className={styles["button"]} onClick={handleLoadMore}>
        Load More
      </button>
    </div>
  );
};

export default Products;
