
export class Record {
    constructor(roleId, gridId) {
        this.roleId = roleId;
        this.gridId = gridId;
    }

    changeRole(roleId){
        this.roleId = roleId;
    }
    changeGrid(gridId){
        this.gridId = gridId;
    }

    static getInstance(roleId, gridId){
        return new Record(roleId, gridId)
    }
}