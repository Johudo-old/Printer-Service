import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
    AdminCoreModuleFactory,
    AdminAuthModuleFactory,
    DefaultAdminSite,
    AdminUserEntity,
} from "nestjs-admin";
import { User } from "src/users/user.entity";
import { adminCredentialValidator } from "./credentialValidator";

const CoreModule = AdminCoreModuleFactory.createAdminCoreModule({});
const AuthModule = AdminAuthModuleFactory.createAdminAuthModule({
    adminCoreModule: CoreModule, // what admin module are you configuring authentication for
    credentialValidator: adminCredentialValidator, // how do you validate credentials
    imports: [TypeOrmModule.forFeature([User])], // what modules export the dependencies of the credentialValidator available
    providers: [], // additional providers that will be instanciated and exported by the AdminAuthModuleFactory
});

@Module({
    imports: [CoreModule, AuthModule],
    exports: [CoreModule, AuthModule],
})
export class BackofficeModule {
    constructor(private readonly adminSite: DefaultAdminSite) {
        adminSite.register("Administration", AdminUserEntity);
    }
}
