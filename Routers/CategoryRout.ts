import express from "express";
const CategorytRout = express.Router();
import CategoryController from "../Controller/CategoryController";

CategorytRout.post('/createCategory', CategoryController.createCategory);
CategorytRout.get('/getIncomeCategory', CategoryController.getIncomeCategory);
CategorytRout.get('/getExpenceCategory', CategoryController.getExpenceCategory);

export default CategorytRout;