import React from 'react';
import './App.css';


class Template extends React.Component {
    constructor(props) {
        // super(props)
        this.state = {
            scores: {},
            clicked: false
        }
    }

    onClickStatusChange = (evt) => {
        fetch(`${this.props.baseAddress}/scores`, {
            credentials: "include"
        })
            .then((res) => {
                res.json()
                    .then((data) => {
                        this.setState({
                            scores: data
                        })
                        this.props.callback()
                    })
            })
    }

    render() {
        return (
            <div className="App" >
                <header className="App-header">
                    <center>
                        <div className="loginScreen borderStandard" >
                            {this.props.children}
                        </div>
                        <div className="borderStandard">
                            <button onClick={this.onClickStatusChange.bind(this)} className="borderStandard" >See Scores</button>
                        </div>
                    </center>
                </header>
            </div >
        )
    }
}
export default Template;