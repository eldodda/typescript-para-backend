import express from "express";
import PetController from "../controller/PetController";
import PetRepo from "../repositories/PetRepo";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();

const petRepo = new PetRepo(
	AppDataSource.getRepository("PetEntity"),
	AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepo);

router
	.get("/", (req, res) => petController.listaPets(req, res))
	.get("/busca", (req, res) => petController.buscaPorCampoGenerico(req, res))
	.post("/", (req, res) => petController.criaPet(req, res))
	.put("/:id", (req, res) => petController.atualizaPet(req, res))
	.put("/:pet_id/:adotante_id", (req, res) => petController.adotaPet(req, res))
	.delete("/:id", (req, res) => petController.deletaPet(req, res));

export default router;