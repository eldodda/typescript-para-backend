import { Request, Response } from "express";
import AdotanteRepo from "../repositories/AdotanteRepo";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/Endereco";

export default class AdotanteController {
	constructor(private repository: AdotanteRepo) { }

	async listaAdotantes(req: Request, res: Response) {
		const listaDeAdotantes = await this.repository.listaAdotante();
		return res.status(200).json(listaDeAdotantes);
	}

	async criaAdotante(req: Request, res: Response) {
		const { nome, senha, celular, foto, endereco } = <AdotanteEntity>req.body;

		const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);

		await this.repository.criaAdotante(novoAdotante);
		return res.status(201).json(novoAdotante);
	}

	async atualizaAdotante(req: Request, res: Response) {
		const { id } = req.params;
		const { success, message } = await this.repository.atualizaAdotante(
			Number(id),
			<AdotanteEntity>req.body,
		);

		if (!success) {
			return res.status(404).json({ message });
		}
		return res.status(204).json({ message });
	}

	async deletaAdotante(req: Request, res: Response) {
		const { id } = req.params;
		const { success, message } = await this.repository.deletaAdotante(Number(id));

		if (!success) {
			return res.status(404).json({ message });
		}
		return res.status(204).json({ message });
	}

	async atualizaEndereco(req: Request, res: Response) {
		const { id } = req.params;
		const { success, message } = await this.repository.atualizaEndereco(Number(id), req.body as EnderecoEntity);

		if (!success) {
			return res.status(404).json({ message });
		}
		return res.status(204).json({ message });
	}
}