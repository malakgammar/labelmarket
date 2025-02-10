import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './Loader';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
        fetchProducts();
    }, []);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    return (
        <div className="container mt-4">
            {loading ? (
                <Loader />
            ) : (
                <div className="row">
                    <div className="col-md-4">
                        <h2>Catégories de Produits</h2>
                        <ul className="list-group">
                            {categories.map(category => (
                                <li
                                    key={category.id}
                                    className="list-group-item"
                                    onClick={() => handleCategoryClick(category.name)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-8">
                        <h2>Produits</h2>
                        <div className="row">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="col-md-4 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">Prix : {product.price} €</p>
                                            <button className="btn btn-primary">Ajouter au panier</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;