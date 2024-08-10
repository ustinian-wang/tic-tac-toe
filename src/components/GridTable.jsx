import { RoleManager } from "../business/RoleManager";
import { RecordManager } from "../business/RecordManager";

export default function GridTable(props) {
    let {
        grids,
    } = props;
    let lines = []
    const getText = (grid)=>{
        return grid.getGridContent();
    }
    for ( let i = 0; i < 3; i++ ) {
        let line = [];
        for ( let j = 0; j < 3; j++ ) {
            let index = i * 3 + j
            let grid = grids[index];
            line.push(
                <div className="ma_gridTable_ceil" key={index} onClick={()=>props.onClickGrid(index)}>{ getText(grid) }</div>
            );
        }
        lines.push(
            <div className="ma_gridTable_row" key={i}>{ line }</div>
        )
    }

    return (
        <div className="ma_gridTable">
            { lines }
        </div>
    )
}