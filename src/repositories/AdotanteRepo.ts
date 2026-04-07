import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepo from "./interfaces/InterfaceAdotanteRepo";
import EnderecoEntity from "../entities/Endereco";

export default class AdotanteRepo implements InterfaceAdotanteRepo {
	private repository: Repository<AdotanteEntity>;

	constructor(repository: Repository<AdotanteEntity>) {
		this.repository = repository;
	}

	async criaAdotante(adotante: AdotanteEntity): Promise<void> {
		await this.repository.save(adotante);
	}

	async listaAdotante(): Promise<AdotanteEntity[]> {
		return await this.repository.find();
	}

	async atualizaAdotante(
		id: number,
		Dados: AdotanteEntity
	): Promise<{ success: boolean; message?: string }> {
		try {
			const adotanteToUpdate = await this.repository.findOne({ where: { id } });

			if (!adotanteToUpdate) {
				return { success: false, message: "Adotante não encontrado" };
			}

			Object.assign(adotanteToUpdate, Dados);

			await this.repository.save(adotanteToUpdate);

			return { success: true, message: "Adotante atualizado." };
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Ocorreu um erro ao tentar atualizar o adotante.",
			};
		}
	}

	async deletaAdotante(
		id: number
	): Promise<{ success: boolean; message?: string }> {
		try {
			const adotanteToRemove = await this.repository.findOne({ where: { id } });

			if (!adotanteToRemove) {
				return { success: false, message: "Adotante não encontrado." };
			}

			await this.repository.delete(adotanteToRemove);

			return { success: true, message: "Adotante excluído com sucesso." };
		} catch (err) {
			console.log(err);
			return {
				success: false,
				message: "Erro ao excluir adotante."
			};

		}
	}

	async atualizaEndereco(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string; }> {
		try {
			const adotante = await this.repository.findOne({ where: { id: idAdotante } });

			if (!adotante) {
				return { success: false, message: "Adotante não encontrado" };
			}

			const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
			adotante.endereco = novoEndereco;
			await this.repository.save(adotante);
			return { success: true };
		} catch (err) {
			console.log(err);
			return {
				success: false,
				message: "Erro ao atualizar endereço."
			};
		}
	}
}