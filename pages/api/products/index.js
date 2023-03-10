//import Query from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import { pool } from "../../../config/db";

  export default async function handler(req,res){

    switch (req.method) {
        case "GET":
          return await getProducts(req, res);
        case "POST":
          return await saveProduct(req, res);
        default:
          return res.status(201).json(' sms default');
    }
  } 
    
    const saveProduct = async (req, res) => {
      try {
        const { name, description, price } = req.body;
    
        const result = await pool.query("INSERT INTO nx_product SET ?", {
          name,
          description,
          price,
        });
    
        return res.status(200).json({ ...req.body, id: result.insertId });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    const getProducts = async (req, res) => {
      try {
        const results = await pool.query("SELECT * FROM nx_product");
        return res.status(200).json(results);
      } catch (error) {
        return res.status(500).json({ error });
      }
    };




