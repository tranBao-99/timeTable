import React, { useEffect, useState, useCallback } from "react";
import './LessonContainer.css'
import PropTypes from 'prop-types';
import axios from "axios";


LessonContainer.propTypes = {
    team: PropTypes.string,
};

function LessonContainer( props ) {
    const { team } = props;
    const [ lessons, setLessons ] = useState( [] );
    const [ allLessons, setAllLessons ] = useState( [] );
    const [ dragItem, setDragItem ] = useState();
    const [ dropItem, setDropItem ] = useState();

    useEffect( () => {
        axios.get( `http://localhost:3001/lesson/${team}` )
            .then( ( res ) => {
                setLessons( res.data );
                if ( team === '6A3' ) console.log( res.data )
            } );
        axios.get( 'http://localhost:3001/lesson' )
            .then( ( res ) => {
                setAllLessons( res.data );

            } );

    }, [ team ] );

    const update = ( day, num, subject, teacher, team ) => {
        axios.put( `http://localhost:3001/lesson/${day}/${num}/${subject}/${teacher}/${team}` )
            .then( ( res, err ) => {
                if ( err )
                    console.log( err );
            } );
    }

    function onDragStart( e, les ) {
        setDragItem( les );
    }
    function onDragEnd( e ) {

    }

    function onDragOver( e ) {
        e.preventDefault();
        e.target.style.backgroud = 'Lightgray'
    }

    function onDragLeave( e ) {
        e.preventDefault();
    }

    function onDropHandler( e, les ) {
        //check1( dragItem, les );
        e.preventDefault();
        if ( les?.class !== dragItem?.class ) {
            setDragItem( null );
            alert( "Không thể thay đổi tiết học khác lớp" );
            return;
        }


        //console.log( 'drag', dragItem );
        //console.log( 'drop', les );

        var Error;
        let all = allLessons;
        let kt = true;



        if ( kt ) {
            let filter1 = all.filter( item => {
                return ( ( item.teacher === dragItem.teacher ) && ( item.class !== dragItem.class ) )
            } )

            filter1.forEach( f => {
                if ( f.num === les.num && f.day === les.day && f.teacher !== null ) {
                    Error = `Thầy(cô) ${dragItem.teacher} bị trùng lịch của lớp ${f.class} vào thứ ${f.day} tiết thứ ${f.num}`;
                    kt = false;
                }
            } )
        }

        if ( kt ) {
            let filter2 = all.filter( item => {
                return ( ( item.teacher === les.teacher ) && ( item.class !== les.class ) )
            } )

            filter2.forEach( f => {
                if ( f.num === dragItem.num && f.day === dragItem.day && f.teacher !== null ) {
                    Error = `Thầy(cô) ${les.teacher} bị trùng lịch của lớp ${f.class} vào thứ ${f.day} tiết thứ ${f.num}`;
                    kt = false;
                }
            } )
        }



        if ( kt ) {
            const newL = [ ...lessons ]

            update( dragItem.day, dragItem.num, les.subject, les.teacher, dragItem.class );
            update( les.day, les.num, dragItem.subject, dragItem.teacher, les.class );
            const newLe = newL.map( c => {
                if ( c.num === les.num && c.day === les.day && c.class === les.class ) {
                    return {
                        ...c,
                        subject: dragItem.subject,
                        teacher: dragItem.teacher
                    }
                }

                if ( c.num === dragItem.num && c.day === dragItem.day && c.class === dragItem.class ) {
                    return {
                        ...c,
                        subject: les.subject,
                        teacher: les.teacher
                    }
                }
                return c;
            } )
            setDragItem();
            setLessons( newLe );
        }
        else {
            setDragItem();
            alert( Error );
            return;
        }
    }

    return (
        <div className="LessonContainer">
            <div className="Class">
                <div className="ClassName">
                    <p>{ team }</p>
                </div>
                <div className="Lessons">
                    {
                        lessons.map( ( les ) => {
                            return (
                                <div
                                    onDragLeave={ ( e ) => onDragLeave( e ) }
                                    onDragOver={ ( e ) => onDragOver( e ) }
                                    onDragEnd={ ( e ) => onDragEnd( e ) }
                                    onDragStart={ ( e ) => onDragStart( e, les ) }
                                    onDrop={ ( e ) => onDropHandler( e, les ) }
                                    className="Lesson"
                                    draggable="true"
                                >
                                    <p>{ les.subject }{ ( les.teacher ) ? ( '-' + les.teacher ) : null }</p>
                                </div>
                            );
                        } )

                    }
                </div>
            </div>
        </div>


    );
}

export default LessonContainer;