import React, { useEffect, useState } from 'react';
import './App.css';


const Template = (props) => {

    const [scores, setScores] = useState(null)
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        fetch(`${this.props.baseAddress}/scores`, {
            credentials: "include"
        })
            .then((res) => {
                res.json()
                    .then((data) => {
                        setScores(data)
                        props.callback()
                    })
            })
    })

    return (
        <div className="App" >
            <header className="App-header">
                <center>
                    <div className="loginScreen borderStandard" >
                        {props.children}
                    </div>
                    <div className="borderStandard">
                        <button onClick={setClicked(!clicked)} className="borderStandard" >See Scores</button>
                    </div>
                    {scores}
                </center>
            </header>
        </div >
    )
}
export default Template;