import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepo {
	criaPet(pet: PetEntity): void;
	listaPet(): Array<PetEntity> | Promise<PetEntity[]>;
	atualizaPet(id: number, pet: Partial<PetEntity>): Promise<{ success: boolean; message?: string }>;
	deletaPet(id: number): Promise<{ success: boolean; message?: string }>;
}