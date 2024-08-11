import { getWinner } from "../business/game";

export const GameStatusDef = {
    RUNNING: 1,
    READY_TO_FINISH: 2,
    FINISHED: 3
}

// const Game = {
//     status: GameStatusDef.RUNNING,
//     roles: getRoles(),
//     grids:
//     checkStatus(){
//
//     },
//
//     changeToNextRole(){
//         exchangeRoles()
//     }
// }

//todo 这里还没传递数据
export function GameProcess(props){
    let roles = props.roles;
    let role = props.role;
    let grids = props.grids;
    let winner = getWinner(roles, grids);

    if(winner){
        return (
            `Winner: ${winner.getName()}`
        )
    }else{
        return (
            `Next player: ${role.getName()}`
        )
    }
}