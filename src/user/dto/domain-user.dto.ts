import { UUID } from "crypto";

export class DomainUserDto {
    externalId!: UUID;
    firstName!: string;
    lastName!: string;
    email!: string;
}
