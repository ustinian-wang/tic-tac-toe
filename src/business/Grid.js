import { RoleManager } from "./RoleManager";
import { isEmptyArr } from "@ustinian-wang/kit";
import { getUid } from "../utils";

const GridStatusDef = {
    BLANK: 1,
    PLAYED: 2
}

export class Grid {
    constructor() {
        this.status = GridStatusDef.BLANK;
        this.roleId = 0;
        this.gridId = getUid()
    }

    changeSingleStatus( status ) {
        if ( status !== GridStatusDef.BLANK ) {
            this.status = status;
            return true;
        }
        return false;
    }

    changeStatus( status ) {
        this.status = status;
    }

    changeRole( roleId ) {
        this.roleId = roleId
    }

    use(roleId){
        if( this.status===GridStatusDef.BLANK){
            this.roleId = roleId;
            this.status = GridStatusDef.PLAYED;
            return true;
        }
        return false;
    }
    clear(){
        this.status = GridStatusDef.BLANK;
        this.roleId = 0;
    }

    getGridContent() {
        let role = RoleManager.getRole( this.roleId );
        if ( this.status === GridStatusDef.BLANK ) {
            return "";
        } else {
            if ( role ) {
                return role.getName();
            } else {
                // console.error( "role should exist" )
                return "";
            }
        }

    }

    static getInstance() {
        return new Grid();
    }
}

let list = []
export function getGrids(){
    if(isEmptyArr(list)){
        for ( let i = 0; i < 9; i++ ) {
            let grid = Grid.getInstance();
            list.push( grid );
        }
    }
    return list;
}