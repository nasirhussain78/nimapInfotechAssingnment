import { Category, Product } from "../models/models.js";

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number' && value.toString().trim().length === 0) return false
    return true;
}


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


class Controller {

    //1✅Category
    async createCategory(req, res) {
        try {

            const data = req.body;
            if (!isValidRequestBody(data)) {
                return res.status(400).send({ status: false, message: 'Please provide details' })
            }

            if (!isValid(data.name)) {
                return res.status(400).send({ status: false, message: 'name is required' })
            }

            const result = await Category.create(data);

            return res.status(201).send({ status: true, msg: "successfully created", data: result });
        }
        catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }


    //get category
    async getCategory(req, res) {
        try {
            const result = await Category.findAll({ where: { isDeleted: false } });
            return res.send({ status: true, msg: "successfully", data: result });
        }
        catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }


    // get by id
    async getCategoryById(req, res) {
        try {
            const id = req.query.id;
            const result = await Category.findOne({ where: { id, isDeleted: false } });
            if (!result) {
                return res.status(400).send({ status: false, msg: "no data found by this id" });
            }
            return res.send({ status: true, msg: "successfully", data: result });
        }
        catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }


    //update category
    async updateCategory(req, res) {
        try {
            const document = req.body;
            const id = req.query.id;
            const category = await Category.findOne({ where: { id: id, isDeleted: false } });
            if (!category) {
                res.status(404).send({ status: false, message: "No data found" });
                return;
            }
            const result = await Category.update(document, { where: { id: id } });
            return res.send({ status: true, msg: "successfully updated", data: result });

        }
        catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }


    //delete category
    async deleteCategory(req, res) {
        try {

            const id = req.query.id;
            const category = await Category.findOne({ where: { id: id, isDeleted: false } });

            if (!category) {
                return res.status(404).send({ status: false, message: 'not data found' });
            }

            await Category.update({ isDeleted: true }, { where: { id: id } });

            return res.send({ status: true, msg: "successfully deleted" });
        }
        catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }


    //2️✅Product
    async createProduct(req, res) {
        try {

            const data = req.body;
            const { name, description, categoryId } = data;

            if (!isValidRequestBody(data)) {
                return res.status(400).send({ status: false, message: 'Please provide details' })
            }
            if (!isValid(name)) {
                return res.status(400).send({ status: false, message: 'name is required' })
            }
            if (!isValid(description)) {
                return res.status(400).send({ status: false, message: 'description is required' })
            }
            if (!isValid(categoryId)) {
                return res.status(400).send({ status: false, message: 'categoryId is required' })
            }

            const result = await Product.create(data);

            return res.status(201).send({ status: true, msg: "successfully created", data: result });
        }
        catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }


    //Pagination & and get products
    async getProduct(req, res) {
        try {
            let pageSize = Number(req.query.pageSize);
            let currentPage = req.query.currentPage || 1;

            const result = await Product.findAndCountAll({
                where: { isDeleted: false },
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }],
                limit: pageSize,
                offset: (currentPage - 1) * pageSize
            });

            let total = result.count;
            let totalPage = Math.ceil(total / pageSize);

            return res.send({ status: true, msg: "successfull", data: result.rows, count: total, page: totalPage });

        }
        catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }



    //update product
    async updateProduct(req, res) {
        try {
            const document = req.body;
            const id = req.query.id;
            const product = await Product.findOne({ where: { id: id, isDeleted: false } });

            if (!product) {
                res.status(404).send({ status: false, message: "No data found" })
                return;
            }

            const result = await Product.update(document, { where: { id: id }, returning: true });

            return res.send({ status: true, msg: "successfully update", data: result });
        }
        catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }


    //delete product
    async deleteProduct(req, res) {
        try {
            const id = req.query.id;
            const product = await Product.findOne({
                where: { id: id, isDeleted: false }
            });

            if (!product) {
                return res.status(404).send({ status: false, message: 'not found' });
            }

            await Product.update(
                { isDeleted: true },
                { where: { id: id }, returning: true }
            );
            return res.send({ status: true, msg: "successfully deleted" });

        }
        catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }


}

export default new Controller();