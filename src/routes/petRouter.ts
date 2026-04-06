import express from "express";
import PetController from "../controller/PetController";
import PetRepo from "../repositories/PetRepo";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();

const petRepo = new PetRepo(AppDataSource.getRepository("PetEntity"));
const petController = new PetController(petRepo);

router
	.get("/", (req, res) => petController.listaPets(req, res))
	.post("/", (req, res) => petController.criaPet(req, res))
	.put("/:id", (req, res) => petController.atualizaPet(req, res))
	.delete("/:id", (req, res) => petController.deletaPet(req, res));

export default router;