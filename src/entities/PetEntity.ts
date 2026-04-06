import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie.js";

@Entity()
export default class PetEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	nome: string;
	@Column()
	especie: EnumEspecie;
	@Column()
	dataDeNascimento: Date;
	@Column()
	adotado: boolean;
}