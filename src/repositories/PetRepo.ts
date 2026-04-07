import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepo from "./interfaces/InterfacePetRepo";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class PetRepo implements InterfacePetRepo {
	private petRepo: Repository<PetEntity>;
	private adotanteRepo: Repository<AdotanteEntity>;

	constructor(petRepository: Repository<PetEntity>, adotanteRepository: Repository<AdotanteEntity>) {
		this.petRepo = petRepository;
		this.adotanteRepo = adotanteRepository;
	}
	
	async criaPet(pet: PetEntity): Promise<void> {
		await this.petRepo.save(pet);
	}
	
	async listaPet(): Promise<PetEntity[]> {
		return await this.petRepo.find();
	}

	async buscaPorCampoGenerico<Tipo extends keyof PetEntity>(
		campo: Tipo, 
		valor: PetEntity[Tipo]
	): Promise<PetEntity[]> {
		const pets = await this.petRepo.find({ where: { [campo]: valor } });
		return pets;
	}

	async atualizaPet(
		id: number,
		Dados: PetEntity
	): Promise<{ success: boolean; message?: string }> {
		try {
			const petToUpdate = await this.petRepo.findOne({ where: { id } });

			if (!petToUpdate) {
				return { success: false, message: "Pet não encontrado" };
			}

			Object.assign(petToUpdate, Dados);

			await this.petRepo.save(petToUpdate);

			return { success: true, message: "Pet atualizado." };
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
		const petToRemove = await this.petRepo.findOne({ where: { id } });

		if (!petToRemove) {
			return { success: false, message: "Pet não encontrado." };
		}

		await this.petRepo.delete(id);
		return { success: true };
	}

	async adotaPet(idPet: number, idAdotante: number): Promise<{ success: boolean; message?: string }> {
		const pet = await this.petRepo.findOne({
			where: { id: idPet },
		});
		if (!pet) {
			return { success: false, message: "Pet não encontrado" };
		}

		const adotante = await this.adotanteRepo.findOne({
			where: { id: idAdotante },
		});
		if (!adotante) {
			return { success: false, message: "Adotante não encontrado" };
		}

		pet.adotante = adotante;
		pet.adotado = true;
		await this.petRepo.save(pet);
		return { success: true };
	}
}