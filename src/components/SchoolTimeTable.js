import React/*,{ useState }*/ from "react";
import "./SchoolTimeTable.css";
import LessonContainer from "./LessonContainer";
import TimeSheet from "./TimeSheet";
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


function SchoolTimeTable( props ) {
    const { all } = props;
    const group = [ '6A1', '6A2', '6A3', '6A4', '7A1', '7A2', '7A3', '7A4', '8A1', '8A2', '8A3', '8A4', '9A1', '9A2', '9A3', '9A4', '9A5' ];
    const day = [ '2', '3', '4', '5', '6' ];
    const num = [ 1, 2, 3, 4, 5, 6, 7 ];
    const time = [ '8h00-8h45', '8h50-9h35', '9h55-10h40', '10h45-11h30', '13h45-14h30', '14h35-15h20', '15h30-4h15' ];
    var array = [];
    day.forEach( d => {
        num.forEach( n => {
            var a = {
                day: "", num: 0, time: "", '6A1': "", '6A2': "", '6A3': "", '6A4': "", '7A1': "", '7A2': "", '7A3': "", '7A4': "",
                '8A1': "", '8A2': "", '8A3': "", '8A4': "", '9A1': "", '9A2': "", '9A3': "", '9A4': "", '9A5': "",
            }
            a[ `day` ] = d;
            a[ `num` ] = n;
            a.time = time[ n - 1 ];
            group.forEach( g => {
                const les = all.filter( item => {
                    return ( item.class === g && item.day === d && item.num === n );
                } )

                a[ `${g}` ] = ( les[ 0 ]?.teacher ) ? `${les[ 0 ]?.subject}  - ${les[ 0 ]?.teacher}` : `${les[ 0 ]?.subject}`;
            } );
            array.push( a );
        } )
    } );
    const DataSet = [
        {
            columns: [
                { title: "Thứ" }, { title: "Tiết" }, { title: "Thời gian" }, { title: "6A1" }, { title: "6A2" }, { title: "6A3" }, { title: "6A4" },
                { title: "7A1" }, { title: "7A2" }, { title: "7A3" }, { title: "7A4" }, { title: "8A1" }, { title: "8A2" }, { title: "8A3" }, { title: "8A4" },
                { title: "9A1" }, { title: "9A2" }, { title: "9A3" }, { title: "9A4" }, { title: "9A5" }
            ],

            data: array.map( ( item ) => [
                { value: item.day }, { value: item.num }, { value: item.time }, { value: item[ `6A1` ] }, { value: item[ `6A2` ] }, { value: item[ `6A3` ] },
                { value: item[ `6A4` ] }, { value: item[ `7A1` ] }, { value: item[ `7A2` ] }, { value: item[ `7A3` ] }, { value: item[ `7A4` ] }, { value: item[ `8A1` ] },
                { value: item[ `8A2` ] }, { value: item[ `8A3` ] }, { value: item[ `8A4` ] }, { value: item[ `9A1` ] }, { value: item[ `9A2` ] }, { value: item[ `9A3` ] },
                { value: item[ `9A4` ] }, { value: item[ `9A5` ] }
            ] )
        }
    ]

    return (
        <div className="SchoolTimeTable">
            <div className="Head">

                <ExcelFile
                    filename="TimeTable"
                    element={
                        <button
                            type="button"
                            className="btn btn-success float-right m-2">Export Excel</button>
                    }>
                    <ExcelSheet
                        dataSet={ DataSet }
                        name='timeTable-1'
                    />
                </ExcelFile>

                <h1>Thời khóa biểu toàn trường</h1>

            </div>

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