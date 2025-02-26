import Product from "../model/productModel.js";
export const create = async (req, res) => {
    try {
        const productData = new Product(req.body);

        const { nom, prix, description, photo, idCategorie } = productData;

        if (!nom || !prix || !description || !photo || !idCategorie) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        const existingProduct = await Product.findOne({ nom });
        if (existingProduct) {
            return res.status(400).json({ message: "Le produit existe déjà." });
        }

        const savedProduct = await productData.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

export const fetch = async (req, res) => {
    try {
        const products = await Product.find();
        
        if (products.length === 0) {
            return res.status(404).json({ message: "Products not found." });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);

        res.status(500).json({ error: "Internal Server Error." });
    }
};