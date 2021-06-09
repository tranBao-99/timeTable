import React from "react";
import './TimeSheet.css';
function TimeSheet() {
    const day = [ '2', '3', '4', '5', '6' ];
    const num = [ '1', '2', '3', '4', '5', '6', '7' ];
    const time = [ '8h00-8h45', '8h50-9h35', '9h55-10h40', '10h45-11h30', '13h45-14h30', '14h35-15h20', '15h30-4h15' ];
    return (
        <div className="TimeSheet">
            <div className="Day">
                <div className="title">
                    <p>Thứ</p>
                </div>
                {
                    day.map( ( item, index ) => {
                        return (
                            <div className="dayItem">
                                <p>{ item }</p>
                            </div>
                        );
                    } )
                }
            </div>

            <div className="Num">
                <div className="title">
                    <p>Tiết</p>
                </div>
                {
                    day.map( ( item, index ) => {
                        return (
                            num.map( ( numItem, index ) => {
                                return (
                                    <div className="numItem">
                                        <p>{ numItem }</p>
                                    </div>
                                );
                            } )
                        );
                    } )
                }
            </div>

            <div className="Time">
                <div className="titleTime">
                    <p>Thời gian</p>
                </div>
                {
                    day.map( ( item, index ) => {
                        return (
                            time.map( ( timeItem, index ) => {
                                return (
                                    <div className="timeItem">
                                        <p>{ timeItem }</p>
                                    </div>
                                );
                            } )
                        );
                    } )
                }
            </div>
        </div>
    );
}

export default TimeSheet;