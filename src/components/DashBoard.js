import React from "react";
import "./DashBoard.css"
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx";
import Axios from "axios";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

function DashBoard() {
    const readExcel = ( file ) => {
        const group = [ '6A1', '6A2', '6A3', '6A4', '7A1', '7A2', '7A3', '7A4', '8A1', '8A2', '8A3', '8A4', '9A1', '9A2', '9A3', '9A4', '9A5' ];
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer( file );
        fileReader.onload = ( e ) => {
            const bufferArray = e.target.result;

            const wb = XLSX.read( bufferArray, { type: "buffer" } );

            const wsname = wb.SheetNames[ 0 ];

            const ws = wb.Sheets[ wsname ];

            const data = XLSX.utils.sheet_to_json( ws );
            let day = 2;
            let num = 1;
            data.map( item => {
                for ( var i = 0; i < group.length; i++ ) {
                    let content = item[ group[ i ] ].toString().split( "-" );
                    let subject = content[ 0 ];
                    let teacher = content[ 1 ];
                    let Lesson = {
                        day: day,
                        num: num,
                        teacher: teacher,
                        subject: subject,
                        class: group[ i ]
                    };
                    add( Lesson )
                }
                num++;
                if ( num === 8 ) {
                    num = 1;
                    day++;
                };
                return (
                    console.log( '1' )
                )
            } )
        }
    };
    const add = ( lesson ) => {
        Axios.post( "http://localhost:3001/lesson",
            { lesson: lesson } )
            .then( () => {
                console.log( "susscess" );
            } );
    };

    return (

        /*<div className="DashBoard" >
            <Link
                className="link"
                to='/'>
                Trang chủ
            </Link>
            <Link
                className="link"
                to='/groupTimeTable'>
                TKB theo lớp
            </Link>
            
            <div className="Input">
                <input
                    type="file"
                    onChange={ ( e ) => {
                        const file = e.target.files[ 0 ]
                        readExcel( file )
                    } }></input>
            </div>
        </div>*/
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand
                href="/"
            >Thời khóa biểu</Navbar.Brand>
            <Nav className="mr-auto">
                <Link
                    className="link"
                    to='/'>
                    Toàn trường
                </Link>
                <Link
                    className="link"
                    to='/groupTimeTable'>
                    Theo lớp
                </Link>
                <Link className="link"
                    to='/teacherTimeTable'>
                    Lịch dạy của gv
                </Link>
            </Nav>
        </Navbar >

    );
}

export default DashBoard;