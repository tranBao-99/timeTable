import React, { useEffect, useState } from "react";
import './TeacherTimeTable.css';
import Axios from "axios";
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function TeacherTimeTable( props ) {
    const { allLessons } = props;
    const day = [ '2', '3', '4', '5', '6' ];
    const num = [ 1, 2, 3, 4, 5, 6, 7 ];
    const time = [ '8h00-8h45', '8h50-9h35', '9h55-10h40', '10h45-11h30', '13h45-14h30', '14h35-15h20', '15h30-4h15' ];
    const [ teacher, setTeacher ] = useState( [] );
    const [ lessons, setLessons ] = useState( [] );
    useEffect( () => {
        Axios.get( `http://localhost:3001/teachers` )
            .then( ( res ) => {
                setLessons( res.data );
                const data = res.data;
                const teas = data.map( item => {
                    return item.teacher;
                } )
                const teachers = Array.from( new Set( teas ) );
                setTeacher( teachers )
            } );
    }, [] );
    const [ name, setName ] = useState( teacher[ 0 ] );
    useEffect( () => {
        Axios.get( `http://localhost:3001/teachers/${name}` )
            .then( ( res ) => {
                setLessons( res.data );
            } );
    }, [ name ] );
    var rows = [];
    var lessOfTeacher = allLessons.filter( item => {
        return item.teacher === name;
    } )

    num.forEach( n => {
        var row = {
            num: 0, time: "", 'T2': "", 'T3': "", 'T4': "", 'T5': "", 'T6': "",
        }
        row.num = n;
        row.time = time[ n - 1 ];
        day.forEach( d => {
            var filter = lessOfTeacher.filter( l => {
                return l.day === d && l.num === n;
            } )
            row[ `T${d}` ] = ( filter.length > 0 ) ? `${filter[ 0 ]?.subject} - ${filter[ 0 ]?.class}` : `Nghỉ`
        } )
        rows.push( row );
    } )

    const DataSet = [
        {
            columns: [
                { title: "Tiết" }, { title: "Thời gian" }, { title: "Thứ hai" }, { title: "Thứ ba" }, { title: "Thứ tư" }, { title: "Thứ năm" },
                { title: "Thứ sáu" },
            ],

            data: rows.map( ( item ) => [
                { value: item.num }, { value: item.time }, { value: item[ `T2` ] }, { value: item[ `T3` ] }, { value: item[ `T4` ] },
                { value: item[ `T5` ] }, { value: item[ `T6` ] },

            ] )
        }
    ]


    return (
        <div className="GroupTimeTable">
            <div className="SelectGroup">
                <ExcelFile
                    filename={ `Lịch dạy của ${name}` }
                    element={
                        <button
                            type="button"
                            className="btn btn-success float-right m-2">Export Excel</button>
                    }>
                    <ExcelSheet
                        dataSet={ DataSet }
                        name={ `TimeTable-${name}-1` }
                    />
                </ExcelFile>
                <h1
                    className="teacherHeader"
                >Lịch giảng dạy của thầy (cô)</h1>


                <select
                    className="teacherSelect"
                    onChange={ ( e ) => {
                        setName( e.target.value );
                    } }
                    defaultValue={ name }
                >
                    {
                        teacher.map( ( item, index ) => {
                            return (
                                <option>{ item }</option>
                            )
                        } )
                    }

                </select>
            </div>

            <div class="t-head">
                <div className="THleft">
                    <div className="t-head-Num">
                        <div className="t-head-title">
                            <p>Tiết</p>
                        </div>
                        {
                            num.map( ( numItem, index ) => {
                                return (
                                    <div className="t-head-numItem">
                                        <p>{ numItem }</p>
                                    </div>
                                );
                            } )
                        }
                    </div>

                    <div className="t-head-Time">
                        <div className="t-head-timeItem">
                            <p>Thời gian</p>
                        </div>
                        {
                            time.map( ( timeItem, index ) => {
                                return (
                                    <div className="t-head-timeItem">
                                        <p>{ timeItem }</p>
                                    </div>
                                );
                            } )
                        }
                    </div>
                </div>
                <div className="THright">
                    {
                        day.map( ( d, index ) => {
                            var les = lessons.filter( item => {
                                return item.day === d;

                            } )
                            var nums = [ 1, 2, 3, 4, 5, 6, 7 ];
                            return (
                                <div className="t-head-Day" >
                                    <div className="t-head-dayItem">
                                        <p>Thứ { d }</p>
                                    </div>
                                    {
                                        nums.map( n => {
                                            var l = les.filter( le => {
                                                return le.num === n;
                                            } )
                                            return (
                                                <div className="t-head-dayItem">
                                                    <p>
                                                        {
                                                            ( l.length > 0 ) ? ( l.map( item => {
                                                                return (
                                                                    item.subject + ' - ' + item.class
                                                                )
                                                            } ) ) : 'Nghỉ'
                                                        }
                                                    </p>
                                                </div>
                                            )
                                        } )


                                    }

                                </div>
                            );
                        }
                        )
                    }
                </div>
            </div>
        </div>

    );
}

export default TeacherTimeTable;