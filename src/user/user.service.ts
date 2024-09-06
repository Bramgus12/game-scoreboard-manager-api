import { EntityManager, MikroORM } from "@mikro-orm/core";
import { Injectable, NotFoundException } from "@nestjs/common";
import { DomainUserDto } from "./dto/domain-user.dto";
import { User } from "entities/user.entity";
import { randomUUID, UUID } from "crypto";
import { CreateUpdateUserDto } from "./dto/create-update-user.dto";

@Injectable()
export class UserService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    async getUser(externalId: string): Promise<User | null> {
        return await this.em.findOne(User, { externalId: externalId as UUID });
    }

    async createUser(user: DomainUserDto) {
        const newUser = new User(user, randomUUID());

        const createdUser = this.em.create<User>(User, newUser);
        await this.em.persistAndFlush(createdUser);

        return createdUser;
    }

    async updateUser(externalUserId: UUID, user: CreateUpdateUserDto) {
        const foundUser = await this.em.findOne(User, { externalId: externalUserId });

        if (foundUser == null) {
            throw new NotFoundException("User not found");
        }

        foundUser.firstName = user.firstName;
        foundUser.lastName = user.lastName;

        await this.em.persistAndFlush(foundUser);

        return foundUser;
    }
}
