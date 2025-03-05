import React, { useEffect, useState } from "react";
import "./CategoriesPage.css"; // Import du fichier CSS

const CategoriesPage = () => {
    const [products, setProducts] = useState([]); // État pour stocker les produits
    const [categories, setCategories] = useState([]); // État pour stocker les catégories
    const [selectedCategory, setSelectedCategory] = useState(""); // État pour la catégorie sélectionnée
    const [quantities, setQuantities] = useState({}); // État pour gérer les quantités
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs
    const userId = "12345"; // Remplace par l'ID de l'utilisateur connecté

    // Fonction pour récupérer les produits depuis l'API
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/product/getallproducts");
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des produits");
            }
            const data = await response.json();
            setProducts(data); // Mettre à jour l'état des produits

            // Initialiser les quantités
            const initialQuantities = data.reduce((acc, product) => {
                acc[product._id.$oid] = 1; // Utiliser product._id.$oid pour l'ID
                return acc;
            }, {});
            setQuantities(initialQuantities);
        } catch (error) {
            console.error("Erreur :", error);
            setError(error.message); // Mettre à jour l'état d'erreur
        } finally {
            setLoading(false); // Arrêter le chargement
        }
    };

    // Fonction pour récupérer les catégories depuis l'API
    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:5000/category/getallcategories");
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des catégories");
            }
            const data = await response.json();
            setCategories(data); // Mettre à jour l'état des catégories
        } catch (error) {
            console.error("Erreur :", error);
            setError(error.message); // Mettre à jour l'état d'erreur
        }
    };

    // Utilisation de useEffect pour appeler fetchProducts et fetchCategories au chargement du composant
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Fonction pour gérer le changement de quantité
    const handleQuantityChange = (productId, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Number(value),
        }));
    };

    // Fonction pour ajouter un produit au panier
    const handleAddToCart = async (productId, productName) => {
        const quantity = quantities[productId] || 1;

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

    // Fonction pour filtrer les produits par catégorie
    const filteredProducts = selectedCategory
        ? products.filter((product) => product.idCategorie.$oid === selectedCategory)
        : products;

    // Affichage en fonction de l'état de chargement et des erreurs
    if (loading) {
        return <p className="loading">Chargement des produits...</p>;
    }

    if (error) {
        return <p className="error">Erreur : {error}</p>;
    }

    return (
        <div className="categories-page">
            <h1>Liste des Produits</h1>

            {/* Filtre par catégorie */}
            <div className="category-filter">
                <label htmlFor="category">Filtrer par catégorie :</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Toutes les catégories</option>
                    {categories.map((category) => (
                        <option key={category._id.$oid} value={category._id.$oid}>
                            {category.nom}
                        </option>
                    ))}
                </select>
            </div>

            {/* Liste des produits */}
            {filteredProducts.length === 0 ? (
                <p className="no-products">Aucun produit trouvé.</p>
            ) : (
                <div className="product-list">
                    {filteredProducts.map((product) => (
                        <div key={product._id.$oid} className="product-card">
                            <img src={product.photo} alt={product.nom} />
                            <h3>{product.nom}</h3>
                            <p className="productPrice">${product.prix.toFixed(2)}</p>
                            <p className="productDescription">{product.description}</p>
                            <input
                                type="number"
                                min="1"
                                value={quantities[product._id.$oid] || 1}
                                onChange={(e) => handleQuantityChange(product._id.$oid, e.target.value)}
                                className="quantityInput"
                            />
                            <button
                                onClick={() => handleAddToCart(product._id.$oid, product.nom)}
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