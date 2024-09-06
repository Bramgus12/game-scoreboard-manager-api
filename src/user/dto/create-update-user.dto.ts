import { ApiProperty } from "@nestjs/swagger";

export class CreateUpdateUserDto {
    @ApiProperty()
    firstName!: string;

    @ApiProperty()
    lastName!: string;
}
