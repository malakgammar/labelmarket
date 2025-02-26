import category from "../model/categoryModel.js";

export const create = async (req, res) => {
    try {
        const categoryData = new category(req.body);

        const savedCategory = await categoryData.save();

        res.status(200).json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
}

export const fetch = async (req, res) => {
    try {
        const categories = await category.find();

        if (categories.length === 0) {
            return res.status(404).json({ message: "Categories not found." });
        }

        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);

        res.status(500).json({ error: "Internal Server Error." });
    }
};