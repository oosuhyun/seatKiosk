
import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {useLocation} from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function  RegisterPage() {

    const location = useLocation();
    const seatID = getSeatID(location);
    let category = "데스크탑";
    let seatNum = seatID;
    if(seatID>100){
        category = "노트북";
        seatNum = seatID - 100;
    };
    const [reservationDate, setReservationDate] = useState(new Date());
    const now = reservationDate.getFullYear() + "-" + ("0"+(reservationDate.getMonth()+1)).slice(-2) + "-" + ("0"+reservationDate.getDate()).slice(-2) + "T"
        + ("0"+reservationDate.getHours()).slice(-2) + ":" + (("0"+reservationDate.getMinutes())).slice(-2).slice(0,1)+"0" + ":00";

    //
    // let nowText = now.toString();
    //
    // const [reservationDateAfter130, setReservationDateAfter130] = useState(new Date());
    // reservationDateAfter130.setMinutes(reservationDateAfter130.getMinutes() + 1);
    // const after130 = reservationDateAfter130.getFullYear() + "-" + ("0"+(reservationDateAfter130.getMonth()+1)).slice(-2) + "-" + ("0"+reservationDateAfter130.getDate()).slice(-2) + "T"
    //     + ("0"+reservationDateAfter130.getHours()).slice(-2) + ":" + ("0"+reservationDateAfter130.getMinutes()).slice(-2) + ":00";
    //
    // let  after130Text = after130.toString();

    const startDate = reservationDate.getFullYear() + "-" + ("0"+(reservationDate.getMonth()+1)).slice(-2) + "-" + ("0"+reservationDate.getDate()).slice(-2);
    const navigate = useNavigate();


    const [NameValue, setNameValue] = useState("");
    const onNameChange = (event) => {
        setNameValue(event.currentTarget.value);
    };
    const [NumberValue, setNumberValue] = useState("")
    const onNumberChange = (event) => {
        setNumberValue(event.currentTarget.value);
    };

    const [IdValue, setIdValue] = useState("")
    const [classValue, setClassValue] = useState(localStorage.getItem("classInfo"));

    const classes = [
        { name: '(1: 30)', value: '1' },
        { name: '(2: 30)', value: '2' }
    ];






    const onButtonClick = () => {

        axios.get("api/member/check?name="+ NameValue + "&tel="+ NumberValue)
            .then((res) => {
                console.log(res.data[0].memMbrId);
                // setIdValue(res.data[0].memMbrId);
                // console.log(IdValue);


                const data ={
                    "reID": 1,
                    "seatID": seatID,
                    "reservationName": NameValue,
                    "reSTime": now,
                    "reFTime": now,
                    "memMbrId": res.data[0].memMbrId
                };

                if(classValue == "1"){
                    console.log(data);
                    axios.post("api/reservation/res130", JSON.stringify(data), {
                        headers: {
                            "Content-Type": 'application/json'
                        },
                    })
                        .then((res) => {
                            console.log(res.data);
                            if (res.status === 201) {
                                alert("예약되었습니다.")
                                // window.location.reload();
                                navigate("/");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            if (error.response && error.response.status === 409) {
                                alert("이미 예약된 시간입니다.")
                            }
                        })
                } else if(classValue == "2"){
                    axios.post("api/reservation/res230", JSON.stringify(data), {
                        headers: {
                            "Content-Type": 'application/json'
                        },
                    })
                        .then((res) => {
                            console.log(res.data);
                            if (res.status === 201) {
                                alert("예약되었습니다.")
                                // window.location.reload();
                                navigate("/");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            if (error.response && error.response.status === 409) {
                                alert("이미 예약된 시간입니다.")
                            }
                        })
                }


            })
            .catch((error) =>{
                console.log(error);
                if(error.response && error.response.status === 404) {
                    alert("이름과 전화번호를 확인해주세요");
                }
            });


    };

    const onCheckEnter = (e) => {
        if(e.code === 'Enter') {
            e.preventDefault();
        }
    }

    return(
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div  style={{ display: 'flex', flexDirection: 'column', width: 500, marginTop: 70, paddingTop: 10, paddingLeft: 80, height: 500, border: 1, borderColor: "black", borderStyle: "solid"}}>
                <br/>
                <div style={{marginLeft: 15}}>
                    <h3>{startDate} {category} 좌석{seatNum}</h3>
                </div>
                <br/>
                <div>
                    <text style={{paddingRight: 10}}>예약할 시간: </text>
                    {classes.map((oneClass) => (
                        <button
                            onClick={(e) => {
                                localStorage.setItem("classInfo", oneClass.value);
                                window.location.reload();
                                setClassValue(localStorage.getItem("classInfo"));
                            }}
                            className={oneClass.value ==  classValue ? "two_select_button2_selected" : "two_select_button2_not_selected"}
                        >
                            {oneClass.name}
                        </button>
                    ))}
                </div>
                <br/>
                <div>
                    <Form onKeyDown={onCheckEnter}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>이름: </Form.Label>
                            <Form.Control
                                type="text"
                                name = "name"
                                placeholder="이름을 입력하시오"
                                value={NameValue}
                                onChange={onNameChange}
                                style={{width : 300}}
                            />
                        </Form.Group>
                    </Form>
                    <br/>
                    <Form onKeyDown={onCheckEnter}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>보호자 전화번호 뒷자리: </Form.Label>
                            <Form.Control
                                type="text"
                                name = "name"
                                placeholder="보호자 전화번호 뒷자리를 입력하세요"
                                value={NumberValue}
                                onChange={onNumberChange}
                                style={{width : 300}}
                            />
                        </Form.Group>
                    </Form>
                    <div style={{ display: 'flex', justifyContent: 'end', marginRight:100}}>
                        <button
                            onClick={onButtonClick}
                            className={"button_seat"}
                            style={{width: 120, height:60}}
                        >예약하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getSeatID(location) {
    const params = new URLSearchParams(location.search);
    return params.get('seat')
}

export  default  RegisterPage;
