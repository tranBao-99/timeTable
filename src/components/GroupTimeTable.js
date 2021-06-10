import React, { useEffect, useState } from "react";
import './GroupTimeTable.css';
import Axios from "axios";
import { Card } from "react-bootstrap";

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function GroupTimeTable( props ) {
    const day = [ '2', '3', '4', '5', '6' ];
    const num = [ 1, 2, 3, 4, 5, 6, 7 ];
    const time = [ '8h00-8h45', '8h50-9h35', '9h55-10h40', '10h45-11h30', '13h45-14h30', '14h35-15h20', '15h30-4h15' ];
    const groups = [ '6A1', '6A2', '6A3', '6A4', '7A1', '7A2', '7A3', '7A4', '8A1', '8A2', '8A3', '8A4', '9A1', '9A2', '9A3', '9A4', '9A5' ];
    const { allLessons } = props;
    const [ team, setTeam ] = useState( '6A1' );
    const [ lessons, setLessons ] = useState( [] );

    useEffect( () => {
        Axios.get( `http://localhost:3001/lesson/${team}` )
            .then( ( res ) => {
                setLessons( res.data );
            } );
    }, [ team ] );

    var rows = [];
    var less = allLessons.filter( item => {
        return item.class === team;
    } )
    num.forEach( n => {
        var row = {
            num: 0, time: "", 'T2': "", 'T3': "", 'T4': "", 'T5': "", 'T6': "",
        }
        row.num = n;
        row.time = time[ n - 1 ];
        day.forEach( d => {
            var filter = less.filter( l => {
                return l.day === d;
            } )
            row[ `T${d}` ] = ( filter[ n - 1 ]?.teacher ) ? `${filter[ n - 1 ]?.subject} - ${filter[ n - 1 ]?.teacher}` : `${filter[ n - 1 ]?.subject}`
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
                    filename={ `TimeTable-${team}` }
                    element={
                        <button
                            type="button"
                            className="btn btn-success float-right m-3">Export Excel</button>
                    }>
                    <ExcelSheet
                        dataSet={ DataSet }
                        name={ `TimeTable-${team}-1` }
                    />
                </ExcelFile>
                <h1>Thời khóa biểu lớp  </h1>
                <select
                    className="GroupSelect"
                    onChange={ ( e ) => {
                        setTeam( e.target.value );
                    } }
                    defaultValue={ team }
                >
                    {
                        groups.map( ( item, index ) => {
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
                            return (
                                <div className="t-head-Day" >
                                    <div className="t-head-dayItem">
                                        <p>Thứ { d }</p>
                                    </div>

                                    { lessons.map( ( les, ind ) => {
                                        return ( les.day === d ) ? (
                                            <div className="t-head-dayItem">
                                                <p>{ les.subject }{ ( les.teacher ) ? ( '-' + les.teacher ) : null }</p>
                                            </div>
                                        ) : null
                                    } )
                                    }
                                </div>
                            );
                        }
                        )
                    }
                </div>
            </div>
        </div >

    );
}

export default GroupTimeTable;