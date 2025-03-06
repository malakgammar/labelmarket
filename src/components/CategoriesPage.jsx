import React, { useEffect, useState } from "react";
import "./CategoriesPage.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const CategoriesPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = "12345";

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/product/getallproducts");
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des produits");
            }
            const data = await response.json();
            setProducts(data);

            const initialQuantities = data.reduce((acc, product) => {
                acc[product._id] = 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        } catch (error) {
            console.error("Erreur :", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:5000/category/getallcategories");
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des catégories");
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Erreur :", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleQuantityChange = (productId, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Number(value),
        }));
    };

    const handleAddToCart = async (productId, productName) => {
        const quantity = quantities[productId] || 1;

        if (isNaN(quantity)) {
            alert("Veuillez entrer une quantité valide.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    idproduit: productId,
                    quantite: quantity,
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout au panier");
            }

            const result = await response.json();
            console.log("Réponse de l'API :", result);
            alert(`${quantity} ${productName} ajouté(s) au panier !`);
        } catch (error) {
            console.error("Erreur :", error);
            alert("Erreur lors de l'ajout au panier.");
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory ? product.idCategorie === selectedCategory : true;
        const matchesSearch = product.nom.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return <p className="loading">Chargement des produits...</p>;
    }

    if (error) {
        return <p className="error">Erreur : {error}</p>;
    }

    return (
        <div className="categories-page">
            <h1>Liste des Produits</h1>

            <div className="filters">
                <div className="search-filter">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="category-filter">
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Toutes les catégories</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.nom}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="no-products">Aucun produit trouvé.</p>
            ) : (
                <div className="product-list">
                    {filteredProducts.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.photo} alt={product.nom} />
                            <h3>{product.nom}</h3>
                            <p className="productPrice">{product.prix.toFixed(2)} MAD</p>
                            <p className="productDescription">{product.description}</p>
                            <input
                                type="number"
                                min="1"
                                value={quantities[product._id] || 1}
                                onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                className="quantityInput"
                            />
                            <button
                                onClick={() => handleAddToCart(product._id, product.nom)}
                            >
                                Ajouter au panier
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;