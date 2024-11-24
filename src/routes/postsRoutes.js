import express from "express";
import multer from "multer";
import cors from "cors";
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controller/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200  
}

// Necessário para Windows
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Só essa linha basta para Linux / MacOS
const upload = multer({ dest: "./uploads" , storage});

const routes = (app) => {
    // Habilita o parser JSON para lidar com requisições JSON
    app.use(express.json());
    app.use(cors(corsOptions));
    // Rota GET para obter todos os posts
    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;