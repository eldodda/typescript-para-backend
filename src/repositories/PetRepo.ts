import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepo from "./interfaces/InterfacePetRepo";

export default class PetRepo implements InterfacePetRepo {
	private repository: Repository<PetEntity>;

	constructor(repository: Repository<PetEntity>) {
		this.repository = repository;
	}

	criaPet(pet: PetEntity): void {
		 void this.repository.save(pet);
	}

	async listaPet(): Promise<PetEntity[]> {
		return await this.repository.find();
	}

	async atualizaPet(
		id: number,
		Dados: PetEntity
	): Promise<{ success: boolean; message?: string }> {
		try {
			const petToUpdate = await this.repository.findOne({ where: { id } });

			if (!petToUpdate) {
				return { success: false, message: "Pet não encontrado" };
			}

			Object.assign(petToUpdate, Dados);

			await this.repository.save(petToUpdate);

			return { success: true, message: "Pet atualizado."};
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Ocorreu um erro ao tentar atualizar o pet.",
			};
		}
	}

	async deletaPet(
		id: number
	): Promise<{ success: boolean; message?: string }> {
		try {
			const petToRemove = await this.repository.findOne({ where: { id } });

			if (!petToRemove) {
				return {success: false, message: "Pet não encontrado."};
			}

			await this.repository.delete(petToRemove);

			return {success: true, message: "Pet excluído com sucesso."};
		} catch (err) {
			console.log(err);
			return {
				success: false,
				message: "Erro ao excluir pet."
			};
			
		}
	}
}