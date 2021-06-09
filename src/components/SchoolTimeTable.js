import React/*,{ useState }*/ from "react";
import "./SchoolTimeTable.css";
import LessonContainer from "./LessonContainer";
import TimeSheet from "./TimeSheet";

function SchoolTimeTable() {

    const group = [ '6A1', '6A2', '6A3', '6A4', '7A1', '7A2', '7A3', '7A4', '8A1', '8A2', '8A3', '8A4', '9A1', '9A2', '9A3', '9A4', '9A5' ];


    return (
        <div className="SchoolTimeTable">
            <h1>Thời khóa biểu toàn trường</h1>
            <div class="main">
                <TimeSheet />
                {
                    group.map( ( item, index ) => {
                        return (
                            <LessonContainer
                                key={ index }
                                team={ item } /> );
                    } )
                }
            </div>
        </div >
    );
}
export default SchoolTimeTable;