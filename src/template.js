import React from 'react';
import './App.css';


class Template extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="App" >
                <header className="App-header">
                    <center>
                        <div className="loginScreen borderStandard" >
                            {this.props.children}
                        </div>
                    </center>
                </header>
            </div >
        )
    }
} export default Template;