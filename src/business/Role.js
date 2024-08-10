import { getUid } from "../utils";

export const RoleTypeDef = {
    X: 1,
    O: 2
}

export class Role {
    constructor( type ) {
        this.type = type;
        this.roleId = getUid();
    }

    static getInstance( type ) {
        return new Role( type )
    }

    getName() {
        return this.type === RoleTypeDef.X ? "X" : "O";
    }
}