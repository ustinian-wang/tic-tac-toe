import GridTable from "./components/GridTable";
import { GameProcess } from "./components/GameProcess";
import RecordHistory from "./components/RecordHistory";
import { useState } from "react";
import { getGrids } from "./business/Grid";
import { RoleManager } from "./business/RoleManager";
import { RecordManager } from "./business/RecordManager";
import { getWinner } from "./business/game";

export default function MyApp() {

    const onClickGrid = (index)=>{
        let grid = state.grids[index];
        let grids = getGrids();
        let role = RoleManager.getCurrRole();
        let roles = RoleManager.getRoles();
        let records = RecordManager.getRecords();
        let winner = getWinner(state.roles, state.grids);
        console.log("jser winner", winner);
        if(grid.use(role.roleId) && !winner){
            grids = getGrids();
            roles = RoleManager.getRoles();
            role = RoleManager.exchangeRoles();
            RecordManager.add(role.roleId, grid.gridId);
            records = RecordManager.getRecords();
            updateState({
                role,
                grids,
                roles,
                records
            })
        }

    }

    const onClickRecord = (index)=>{
        RecordManager.changeCursor(index);
        let currRecords = RecordManager.getCurrentRecords();
        initGridsByCurrRecords(currRecords);
    }

    function initGridsByCurrRecords(currRecords){
        const gridsMapById = {};
        state.grids.forEach(grid=>{
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

        updateState({
            grids: state.grids
        })
    }

    const [state, setState] = useState(()=>{
        return {
            grids : getGrids(),
            role : RoleManager.getCurrRole(),
            roles : RoleManager.getRoles(),
            records : RecordManager.getRecords(),
        }
    })

    const updateState = (value)=>{
        setState({
            ...state,
            ...value
        })
    }

    return (
        <div style={{display: 'flex'}}>
            <div>
                <GameProcess role={state.role} roles={state.roles} grids={state.grids}/>
                <GridTable grids={state.grids} role={state.role} onClickGrid={onClickGrid}/>
            </div>
            <div>
                <RecordHistory records={state.records} onClickRecord={onClickRecord}/>
            </div>
        </div>

    );
}
