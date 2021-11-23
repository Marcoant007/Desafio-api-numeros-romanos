import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserTable1637699292132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.user (
                id serial,
                name varchar(100),
                password varchar(100)
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE user`)
    }

}
