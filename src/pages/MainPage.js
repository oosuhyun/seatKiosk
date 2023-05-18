import React, {useState, useEffect} from 'react'
import "../assets/css/Main.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {ButtonGroup , ToggleButton} from "react-bootstrap";


function  MainPage() {
    // const now = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const [reservationDate, setReservationDate] = useState(new Date());
    const [seat, setSeat] = useState([{
        // "seatID": 0,
        // "seatStatus": 0,
        // "seatFDate": "",
        // "academy": ""
    }]);
    const navigate = useNavigate();
    const today = reservationDate.getFullYear() + "-" + ("0"+(reservationDate.getMonth()+1)).slice(-2) + "-" + ("0"+reservationDate.getDate()).slice(-2) + "T"
        + ("0"+reservationDate.getHours()).slice(-2) + ":" + (("0"+reservationDate.getMinutes())).slice(-2).slice(0,1)+"0" + ":00";


    const [classValue, setClassValue] = useState(localStorage.getItem("classInfo"));

    const classes = [
        { name: '취미반(1: 30)', value: '1' },
        { name: '진로반(2: 30)', value: '2' }
    ];


    useEffect(() => {
        console.log(classValue);
        if(classValue == "1"){
            axios.put("/api/seat/130check/" + today.toString())
                .then(res => console.log(res.data))
                .catch(error => console.log(error));
            axios.get("/api/seat")
                .then(res => setSeat(res.data))
                .catch(error => console.log(error));
        } else if(classValue == "2"){
            axios.put("/api/seat/230check/" + today.toString())
                .then(res => console.log(res.data))
                .catch(error => console.log(error));
            axios.get("/api/seat")
                .then(res => setSeat(res.data))
                .catch(error => console.log(error));
        }

        // setInterval(() => {
        //     if(new Date().getSeconds() == "01" && new Date().getSeconds().toString().slice(1) == "0" ){
        //         localStorage.setItem("classInfo", classValue);
        //         window.location.reload();
        //         setClassValue(localStorage.getItem("classInfo"));
        //     };
        // }, 1000);
    }, [classValue]);


    const onButtonClick = (event, seatID) => {
        console.log(seatID);
        navigate("/register?seat=" + seatID, {state:{date: reservationDate}});
    };


    return(
        <div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 30}}>
                        <h2 style={{marginTop:10, fontFamily: 'NeoDunggeunmoPro-Regular', fontSize:30}}>{reservationDate.getFullYear()}년 {("0"+(reservationDate.getMonth()+1)).slice(-2)}월 {("0"+reservationDate.getDate()).slice(-2)}일 {week[reservationDate.getDay()]}요일</h2>
                        {/*<h2>{today}</h2>*/}
                        <div>
                            {classes.map((oneClass) => (
                                <button
                                    onClick={(e) => {
                                        localStorage.setItem("classInfo", oneClass.value);
                                        window.location.reload();
                                        setClassValue(localStorage.getItem("classInfo"));
                                        // console.log(oneClass.value);
                                    }}
                                    className={oneClass.value ==  classValue ? "two_select_button_selected" : "two_select_button_not_selected"}
                                >
                                    {oneClass.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20}} >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginRight: 80
                    }}>
                        {seat.filter(myMap => (myMap.seatID) <= 6)
                            .map((myMap) => (
                                <button
                                    disabled={myMap.seatFDate < today ? true : myMap.seatStatus === 0 ? true : false}
                                    onClick={e => onButtonClick(e, myMap.seatID)}
                                    className={"button_seat"}
                                >{myMap.seatID}</button>
                            ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20}} >
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginTop: 20
                                }}>
                                    {seat.filter(myMap => (myMap.seatID) > 100 && (myMap.seatID) <= 102)
                                        .map((myMap) => (
                                            <button
                                                disabled={myMap.seatFDate < today ? true : myMap.seatStatus === 0 ? true : false}
                                                onClick={e => onButtonClick(e, myMap.seatID)}
                                                className={"button_seat_notebook"}
                                            >{myMap.seatID-100}</button>
                                        ))}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginTop: 20
                                }}>
                                    {seat.filter(myMap => (myMap.seatID) > 102 && (myMap.seatID) <= 104)
                                        .map((myMap) => (
                                            <button
                                                disabled={myMap.seatFDate < today ? true : myMap.seatStatus === 0 ? true : false}
                                                onClick={e => onButtonClick(e, myMap.seatID)}
                                                className={"button_seat_notebook"}
                                            >{myMap.seatID-100}</button>
                                        ))}
                                </div>
                            </div>
                            <div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20}} >
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginTop: 20
                                    }}>
                                        {seat.filter(myMap => (myMap.seatID) > 104 && (myMap.seatID) <= 106)
                                            .map((myMap) => (
                                                <button
                                                    disabled={myMap.seatFDate < today ? true : myMap.seatStatus === 0 ? true : false}
                                                    onClick={e => onButtonClick(e, myMap.seatID)}
                                                    className={"button_seat_notebook"}
                                                >{myMap.seatID-100}</button>
                                            ))}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginTop: 20
                                    }}>
                                        {seat.filter(myMap => (myMap.seatID) > 106 && (myMap.seatID) <= 108)
                                            .map((myMap) => (
                                                <button
                                                    disabled={myMap.seatFDate < today ? true : myMap.seatStatus === 0 ? true : false}
                                                    onClick={e => onButtonClick(e, myMap.seatID)}
                                                    className={"button_seat_notebook"}
                                                >{myMap.seatID-100}</button>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 80
                    }}>
                        {seat.filter(myMap => (myMap.seatID) > 6 && (myMap.seatID) < 100)
                            .map((myMap) => (
                                <button
                                    disabled={myMap.seatFDate < today ? true : myMap.seatStatus === 0 ? true : false}
                                    onClick={e => onButtonClick(e, myMap.seatID)}
                                    className={"button_seat"}
                                >{myMap.seatID}</button>
                            ))}
                    </div>
                </div>
                {/*<h2></h2>*/}
                <br/>
            </div>
        </div>
    );
};



export  default  MainPage;


