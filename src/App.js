import React, { useEffect, useState } from 'react';
import logo_temp from './logo_temp_1.png'
//import Template from './template'
import './App.css';

/**
 * States : 
 * login  -> quiz selection
 *        -> scores
 * quiz selection -> quiz
 * quiz
 * scores
 */

const Template = (props) => {
  return (
    <div className="App" >
      <header className="App-header">
        <center>
          <div className="loginScreen borderStandard" >
            {props.children}
          </div>
          <div className="borderStandard" style={{ color: "var(--base-color)" }}>
            <button onClick={() => {
              document.getElementById('scoreMenu') &&
                document.getElementById('scoreMenu').classList.remove("inVisible")
            }} className="borderStandard" >See Scores</button>
          </div>
        </center>
      </header>
      <div id="scoreMenu" style={{ position: "fixed", width: "100%", top: "0%", textAlign: "center" }}>
        {/* <center> */}
        <div style={{
          "marginBottom": "30px", "borderBottom": "1px solid var(--base-color)"
        }}>
          <button
            className="borderStandard"
            style={{ height: "35px" }}
            onClick={() => {
              document.getElementById('scoreMenu') &&
                document.getElementById('scoreMenu').classList.add('inVisible')
            }}> Close this </button>
        </div>
        <table style={{ width: "400px", height: "500px" }}>
          <tr>
            <th>
              Name
              </th>
            <th>
              T1 Score
              </th>
            <th>
              T2 Score
              </th>
            <th>
              T3 Score
              </th>
          </tr>
          {props.scores && props.scores.map((value) => {
            return (
              <tr>
                <td>{value.name}</td>
                <td>{value.t1.score}</td>
                <td>{value.t2.score}</td>
                <td>{value.t3.score}</td>
              </tr>
            )
          })}
        </table>
        {/* </center> */}
      </div >
    </div >
  )
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.baseAddress = `https://qui-zup.herokuapp.com`//`http://127.0.0.1:3000`

    this.state = {
      // current: "login",
      quizOptions: null,
      inputNameValue: null,
      currentQuiz: null,
      currentQuestion: null,
      notice: null,
      scores: null,
      scoresVisibile: "none"
    }
  }

  componentDidMount() {
    console.log("component mounting")
    fetch(`${this.baseAddress}/isUserRegistered`, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => {
        res.json()
          .then((data) => {
            if (data.reg) {
              fetch(`${this.baseAddress}/listOfQuizzes`, {
                credentials: "include"
              })
                .then((res2) => {
                  res2.json()
                    .then((data2) => {
                      this.setState({
                        current: "quiz selection",
                        quizOptions: data2
                      })
                    })
                })
            } else {
              this.setState({
                current: "login"
              })
            }
          })
      })
  }

  login() {
    if (this.state.inputNameValue !== null && this.state.inputNameValue !== undefined) {
      debugger;
      fetch(`${this.baseAddress}/registerUser/${this.state.inputNameValue}`, {
        method: "POST",
        credentials: "include"
      })
        .then((res) => {
          debugger;
          fetch(`${this.baseAddress}/listOfQuizzes`, {
            credentials: "include"
          })
            .then((res) => {
              res.json()
                .then((data) => {
                  this.setState({
                    current: "quiz selection",
                    quizOptions: data
                  })
                })
            })
        })
    }
  }

  inputNameOnChangeHandler = (evt) => {
    evt.preventDefault();
    this.setState({
      inputNameValue: evt.target.value
    })
  }

  quizClickChangeHandler = (evt) => {
    evt.preventDefault();
    let quizToGo = evt.target.name
    fetch(`${this.baseAddress}/startTimer/${(new Date()).getTime()}/${quizToGo}/`, {
      method: "POST",
      credentials: "include"
    })
      .then((res) => {
        res.json()
          .then((data) => {
            fetch(`${this.baseAddress}/getQuestion/${quizToGo}/${data.redirectTo}`, {
              credentials: "include"
            })
              .then((res2) => {
                res2.json()
                  .then((data2) => {
                    this.setState({
                      currentQuestion: data2.questions,
                      notice: data2.notice,
                      maxCount: data2.maxCount,
                      currentQuiz: quizToGo,
                      current: "quiz"
                    })
                  })
              })

          })
      })
  }

  answerButtonClickHandler = (evt) => {
    fetch(`${this.baseAddress}/getQuestion/${this.state.currentQuiz}/${this.state.currentQuestion.index}/${evt.target.dataset.correct}`, {
      credentials: "include"
    })
      .then((res) => {
        res.json()
          .then((data) => {
            this.setState({
              currentQuestion: data.questions,
              notice: data.notice,
              maxCount: data.maxCount,
            })
          })
      })
    if (this.state.currentQuestion.index === this.state.maxCount) {
      fetch(`${this.baseAddress}/endTimer/${(new Date()).getTime()}/${this.state.currentQuiz}`, {
        method: "POST",
        credentials: "include"
      })
    }
  }


  seeScores = (evt) => {
    debugger;
    evt.preventDefault()
    fetch(`${this.baseAddress}/scores`, {
      credentials: "include"
    })
      .then((res) => {
        res.json()
          .then((data) => {
            this.setState({
              scores: data
            })
          })
      })
  }

  backButtonClickHandler = (evt, newTarget) => {
    evt.preventDefault()
    this.setState({
      current: "quiz selection"
    })
  }

  reverseVisiblityScores() {
    console.log("running reversal");
    if (this.state.scoresVisible === 'none') {
      this.setState({ scoresVisible: "" })
    } else {
      this.setState({ scoresVisible: "none" })
    }
  }


  render() {

    if (this.state.current === 'login') {
      return (
        <Template scoreFunction={this.seeScores.bind(this)} scores={this.state.scores}>
          <div>
            <img className="logoImg" src={logo_temp} ></img>
            <div className="userName">
              <input
                type="text"
                id="inputName"
                placeholder="Enter Your Name Here"
                className="borderStandard"
                onChange={this.inputNameOnChangeHandler}>
              </input>
            </div>
            <div className="loginButtons">
              <button className="borderStandard" onClick={this.login.bind(this)}>start quiz</button>
              <button className="borderStandard" onClick={this.seeScores.bind(this)}>see scores</button>
            </div>
          </div>
        </Template>
      )
    } else if (this.state.current === "quiz selection") {
      return (
        <Template scoreFunction={this.seeScores.bind(this)} scores={this.state.scores}>
          <div>
            <span className="headerText">Select a Quiz :</span>
            <div className="loginButtons">
              {this.state.quizOptions.map((data) => {
                return <button onClick={this.quizClickChangeHandler} name={data.key} className="borderStandard" key={data.key}>{data.name}</button>
              })}
            </div>
          </div >
        </Template>
      )
    } else if (this.state.current === 'quiz') {
      let internalValueToDisplay = <div>
        <span className="headerText">{this.state.currentQuestion.question}</span>
        <br></br>
        <span className="notice">{this.state.notice}</span>
        <div className="loginButtons">
          {this.state.currentQuestion.answer.map((data, index) => {
            return <button style={{ "paddingBottom": "30px", "marginBottom": "30px" }} onClick={this.answerButtonClickHandler.bind(this)} name={index} data-correct={index === this.state.currentQuestion.correct} className="borderStandard" key={data}>{data}</button>
          })}
        </div>
      </div >

      if (this.state.currentQuestion.index > this.state.maxCount) {
        debugger;
        internalValueToDisplay = <div>
          <span className="headerText">Quiz Done! Go back to quiz selection menu from the top button</span>
        </div>
      }

      return (
        <Template scoreFunction={this.seeScores.bind(this)} scores={this.state.scores}>
          <div>
            <div style={{
              "marginBottom": "30px", "borderBottom": "1px solid var(--base-color)"
            }}>
              <button className="borderStandard" style={{ height: "35px" }} onClick={this.backButtonClickHandler.bind(this)}>Back To Quiz Selection</button>
            </div>
            {internalValueToDisplay}
          </div >
        </Template>
      )
    } else {
      return (
        <Template scoreFunction={this.seeScores.bind(this)} scores={this.state.scores} >
          <div className="header">
            We're loading Stuff. Either than or something went seriously wrong.
        </div>
        </Template>
      )
    }
  }
}

export default App;
