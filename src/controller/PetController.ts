import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepo from "../repositories/PetRepo";
import PetEntity from "../entities/PetEntity";

export default class PetController {
	constructor(private repository: PetRepo) { }

	async listaPets(req: Request, res: Response) {
		const listaDePets = await this.repository.listaPet();
		return res.status(200).json(listaDePets);
	}

	async criaPet(req: Request, res: Response) {
		const { nome, especie, dataDeNascimento, adotado } = <PetEntity>req.body;

		if (!Object.values(EnumEspecie).includes(especie)) {
			return res.status(400).json({ error: "Espécie inválida." });
		}

		const listaDePets = await this.repository.listaPet();
		const novoId = listaDePets.length > 0 
        ? Math.max(...listaDePets.map(p => p.id)) + 1 
        : 1;

		const novoPet = new PetEntity();
		novoPet.id = novoId;
		novoPet.adotado = adotado;
		novoPet.especie = especie;
		novoPet.dataDeNascimento = dataDeNascimento;
		novoPet.nome = nome;

		this.repository.criaPet(novoPet);
		return res.status(201).json(novoPet);
	}

	async atualizaPet(req: Request, res: Response) {
		const { id } = req.params;
		const { success, message } = await this.repository.atualizaPet(
			Number(id),
			<PetEntity>req.body,
		);

		if (!success) {
			return res.status(404).json({ message });
		}
		return res.status(204).json({ message });
	}

	async deletaPet(req: Request, res: Response) {
		const { id } = req.params;
		const { success, message } = await this.repository.deletaPet(Number(id));

		if (!success) {
			return res.status(404).json({ message });
		}
		return res.status(204).json({ message });
	}
}