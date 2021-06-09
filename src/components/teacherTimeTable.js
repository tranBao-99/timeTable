import React, { useEffect, useState } from "react";
import './TeacherTimeTable.css';
import Axios from "axios";


function TeacherTimeTable() {
    const day = [ '2', '3', '4', '5', '6' ];
    const num = [ '1', '2', '3', '4', '5', '6', '7' ];
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
                console.log( res.data );
                setLessons( res.data );

            } );
    }, [ name ] );



    return (
        <div className="GroupTimeTable">
            <div className="SelectGroup">
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