import { Record } from "./Record";

class RecordManagerFactory{
    constructor() {
        this.list = [];
        this.cursor = -1;
    }

    changeCursor(index){
        this.cursor = index;
    }

    next(){
        if(this.cursor>this.list.length){
            return;
        }
        this.cursor++;
    }

    prev(){
        if(this.cursor<=0){
            return;
        }
        this.cursor--;
    }

    add(roleId, gridId){
        this.clearRestOfNext()
        this.cursor++;
        this.list.push(Record.getInstance(roleId, gridId))
    }

    clearRestOfNext(){
        this.list.splice(this.cursor+1);
    }

    getCurrentRecords(){
        return this.list.slice(0, this.cursor+1);
    }

    getRecords(){
        return this.list;
    }
}

export const RecordManager = new RecordManagerFactory()

