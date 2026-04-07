import express from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepo from "../repositories/AdotanteRepo";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();

const adotanteRepo = new AdotanteRepo(AppDataSource.getRepository("AdotanteEntity"));
const adotanteController = new AdotanteController(adotanteRepo);

router
	.get("/", (req, res) => adotanteController.listaAdotantes(req, res))
	.post("/", (req, res) => adotanteController.criaAdotante(req, res))
	.put("/:id", (req, res) => adotanteController.atualizaAdotante(req, res))
	.delete("/:id", (req, res) => adotanteController.deletaAdotante(req, res))
	.patch("/:id", (req, res) => adotanteController.atualizaEndereco(req, res));

export default router;