import { Role, RoleTypeDef } from "./Role";
class RoleManagerFactor{
    constructor() {
        this.roleX = Role.getInstance(RoleTypeDef.X);
        this.roleO = Role.getInstance(RoleTypeDef.O);
        this.list = [this.roleO, this.roleX]
    }
    reset(){
        this.list = [this.roleO, this.roleX];
    }
    getCurrRole(){
        return this.list[0]
    }
    getRole( roleId ) {
        return this.list.find( role => role.roleId === roleId )
    }
    exchangeRoles(){
        this.list.reverse();
        return this.list[0];
    }
    getRoles(){
        return this.list;
    }

}

export const RoleManager = new RoleManagerFactor()