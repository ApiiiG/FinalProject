import express from "express";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts); //dohvaća sve postove iz baze
router.get("/:id", getPost); //dohvaća odabrani post, ovisno o id-u
router.post("/", addPost); //dodaje post u bazu
router.delete("/:id", deletePost); //briše post iz baze
router.put("/:id", updatePost); //update-a post iz baze


export default router;