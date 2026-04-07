import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/Endereco";

export default interface InterfaceAdotanteRepo {
	criaAdotante(Adot: AdotanteEntity): void;
	listaAdotante(): Array<AdotanteEntity> | Promise<AdotanteEntity[]>;
	atualizaAdotante(id: number, Adot: Partial<AdotanteEntity>): Promise<{ success: boolean; message?: string }>;
	deletaAdotante(id: number): Promise<{ success: boolean; message?: string }>;
	atualizaEndereco(idAdotante:number, endereco:EnderecoEntity): Promise<{ success: boolean; message?: string }>;
}