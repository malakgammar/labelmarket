import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CategoriesPage.css"; // Assurez-vous que ce fichier CSS existe

const CategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Affichez dans la console la valeur actuelle de la variable d'environnement
  const apiUrl = process.env.REACT_APP_API_URL; // Doit être "http://localhost:5000"
  console.log("API URL:", apiUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Confirmez l'URL complète dans le log
        const fullUrl = `${apiUrl}/product/getallproducts`;
        console.log("Fetching products from:", fullUrl);
        const response = await axios.get(fullUrl);
        console.log("Response data:", response.data);
        setProducts(response.data);

        // Initialisez la quantité pour chaque produit à 1
        const initialQuantities = response.data.reduce((acc, product) => {
          acc[product._id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error while fetching data", error);
      }
    };
    fetchData();
  }, [apiUrl]);

  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Number(value)
    }));
  };

  const addToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    console.log(`Added ${quantity} of ${product.nom} to cart.`);
    // Placez ici la logique d'ajout au panier
  };

  return (
    <div className="CategoriesPage">
      <div className="productGrid">
        {products.length === 0 ? (
          <p>Aucun produit trouvé.</p>
        ) : (
          products.map((product) => (
            <div className="productCard" key={product._id}>
              <img
                src={product.photo}
                alt={product.nom}
                className="productImage"
              />
              <h3>{product.nom}</h3>
              <p className="productPrice">${product.prix.toFixed(2)}</p>
              <p className="productDescription">{product.description}</p>
              <input
                type="number"
                min="1"
                value={quantities[product._id] || 1}
                onChange={(e) =>
                  handleQuantityChange(product._id, e.target.value)
                }
                className="quantityInput"
              />
              <button
                className="addToCartButton"
                onClick={() => addToCart(product)}
              >
                Ajouter au panier
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;