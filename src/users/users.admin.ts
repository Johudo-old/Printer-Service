import {
    AdminEntity /*, DefaultAdminSite, PasswordWidget */,
} from "nestjs-admin";
// import { Request, Response } from "express";
import { User } from "../common/entities/user.entity";
import { Injectable } from "@nestjs/common";
// import { Connection, Repository } from "typeorm";
// import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserAdmin extends AdminEntity {
    // constructor(
    //     @InjectRepository(User)
    //     public readonly userRepository: Repository<User>,
    //     userAdminSite: DefaultAdminSite,
    // ) {
    //     // super(userAdminSite);
    // }

    entity = User;

    listDisplay = ["id", "firstName", "lastName", "username", "isActive"];
    searchFields = ["firstName", "lastName", "username"];

    // listActions = [{ label: "Create random", action: this.createRandom }];
    // changeActions = [{ label: "Duplicate", action: this.duplicate }];

    // widgets: {};

    // async createRandom(request: Request, response: Response) {
    //     // this.userRepository.save(new User());
    //     // request.flash("messages", "Successfully created");
    // }

    // async duplicate(entity: User, request: Request, response: Response) {
    //     // const newUser = new User();
    //     // newUser.username = entity.username;
    //     // this.userRepository.save(newUser);
    //     // response.status(200).json({ message: "It worked" });
    // }
}
