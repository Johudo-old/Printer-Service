import { User } from "../users/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export const adminCredentialValidator = {
    inject: [getRepositoryToken(User)], // injects the User repository in the factory
    useFactory: (userRepository: Repository<User>) => {
        // You can now return a function to validate the credentials
        return async function validateCredentials(
            username: string,
            password: string,
        ) {
            console.log("test", username, password);
            const user: User | null = await userRepository.findOne({
                username,
            });

            // Note: here we're assuming the password is in plaintext in the database.
            // Never do that in a real app! You should hash your password and compare hashes
            // if (user && user.isAdmin && password === user.password) {
            return user;
            // }
            // return null; // The credentials do not identify an administor
        };
    },
};
