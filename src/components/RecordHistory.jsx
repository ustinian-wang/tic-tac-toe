import { RecordManager } from "../business/RecordManager";

export default function RecordHistory( props ){

    let records = RecordManager.getRecords();
    let list = records.map((record, index)=>{
        return (
            <li style={{margin: '4px'}} key={index}><button onClick={()=>props.onClickRecord(index)}>{index+2}. Go to move #{index+1}</button></li>
        )
    })
    list.unshift(
        <li style={{margin: '4px'}} key={-1} ><button onClick={()=>props.onClickRecord(-1)}>1. Go to game start</button></li>
    )

    return (
        <div>{list}</div>
    )
}