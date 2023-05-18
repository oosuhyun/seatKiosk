import React from "react";
import {useNavigate} from "react-router-dom";

function  StartPage() {
    const navigate = useNavigate();

    return(
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop:200}}>
                <text style={{fontFamily: 'NeoDunggeunmoPro-Regular', fontSize:30}}>
                    자리 예약 시스템
                </text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button
                    onClick={(e) => {
                        navigate("/main");
                    }}
                    className={"button_seat"}
                    style={{width: 170, height:100}}

                >시작하기</button>
            </div>
        </div>

    )
}

export  default  StartPage;