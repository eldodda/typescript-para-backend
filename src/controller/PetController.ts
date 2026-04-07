import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepo from "../repositories/PetRepo";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";

export default class PetController {
	constructor(private repository: PetRepo) { }

	async listaPets(req: Request, res: Response) {
		const listaDePets = await this.repository.listaPet();
		return res.status(200).json(listaDePets);
	}

	async buscaPorCampoGenerico(req: Request, res: Response) {
		const { campo, valor } = req.query;
		const listaDePets = await this.repository.buscaPorCampoGenerico(
			campo as keyof PetEntity,
			valor as string
		);
		return res.status(200).json(listaDePets);
	}

	async criaPet(req: Request, res: Response) {
		const { nome, especie, porte, dataDeNascimento, adotado } = <PetEntity>req.body;

		if (!Object.values(EnumEspecie).includes(especie)) {
			return res.status(400).json({ error: "Espécie inválida." });
		}

		if (porte && !Object.values(EnumPorte).includes(porte)) {
			return res.status(400).json({ error: "Porte inválido." });
		}

		const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);

		await this.repository.criaPet(novoPet);
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

	async adotaPet(req: Request, res: Response) {
		const { pet_id, adotante_id } = req.params;
		const { success, message } = await this.repository.adotaPet(
			Number(pet_id),
			Number(adotante_id)
		);

		if (!success) {
			return res.status(404).json({ message });
		}
		return res.sendStatus(204);
	}
}