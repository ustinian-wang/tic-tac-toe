import GridTable from "./components/GridTable";
import { GameProcess } from "./components/GameProcess";
import RecordHistory from "./components/RecordHistory";
import { useState } from "react";
import { getGrids } from "./business/Grid";
import { RoleManager } from "./business/RoleManager";
import { RecordManager } from "./business/RecordManager";
import { getWinner } from "./business/game";

export default function MyApp() {
    let grids = getGrids();
    let role = RoleManager.getCurrRole();
    let roles = RoleManager.getRoles();
    let records = RecordManager.getRecords();
    let currRecords = RecordManager.getCurrentRecords();
    // let records = RecordHistory.getRecords();
    const [gridsValue, setGridsValue] = useState(grids);
    const [roleValue, setRoleValue] = useState(role);
    const [rolesValue, setRolesValue] = useState(roles);
    const [recordsValue, setRecordsValue] = useState(records);
    const [currRecordsValue, setCurrRecordsValue] = useState(currRecords)



    const onClickGrid = (index)=>{
        let grid = grids[index];
        let winner = getWinner(roles, grids);
        if(grid.use(role.roleId) && !winner){

           //交换角色
           role = RoleManager.exchangeRoles();
           setRoleValue(role);
           roles = RoleManager.getRoles();
           setRolesValue(roles);

           //增加一条操作记录
           RecordManager.add(role.roleId, grid.gridId);
           records = RecordManager.getRecords();
           currRecords = RecordManager.getCurrentRecords();
           setRecordsValue(records);
           setCurrRecordsValue(currRecords);
        }
        setGridsValue(grids);
    }

    const onClickRecord = (index)=>{
        RecordManager.changeCursor(index);

        currRecords = RecordManager.getCurrentRecords();
        setCurrRecordsValue(currRecords);
        initGridsByCurrRecords(currRecords);
    }

    function initGridsByCurrRecords(currRecords){
        const gridsMapById = {};
        grids.forEach(grid=>{
            gridsMapById[grid.gridId] = grid;
            grid.clear();
        })

        currRecords.forEach(record=>{
            let {
                roleId,
                gridId
            } = record;
            let grid = gridsMapById[gridId];
            grid.use(roleId);
        })

        setGridsValue(grids);
    }


    return (
        <div style={{display: 'flex'}}>
            <div>
                <GameProcess role={roleValue} roles={rolesValue} grids={gridsValue}></GameProcess>
                <GridTable grids={gridsValue} role={roleValue} onClickGrid={onClickGrid}/>
            </div>
            <div>
                <RecordHistory records={recordsValue} onClickRecord={onClickRecord}></RecordHistory>
            </div>
        </div>

    );
}
