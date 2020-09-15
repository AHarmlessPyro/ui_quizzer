import React from 'react';
import logo_temp from './logo_temp_1.png'
import classNames from 'classnames'
import backArrow from './back-arrow.png'
import frontArrow from './share.png'
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
  let tableHeader = (
    <tr>
      <th>
        Name
  </th>
      <th>
        T1 Score
  </th>
      <th>
        T1 Time
  </th>
      <th>
        T2 Score
  </th>
      <th>
        T2 Time
  </th>
      <th>
        T3 Score
  </th>
      <th>
        T3 Time
  </th>
    </tr>)

  return (
    <div className="App" >
      <header className="App-header">
        <center>
          <div className="loginScreen borderStandard" >
            {props.children}
          </div>
          <div className="borderStandard" style={{ color: "var(--base-color)" }}>
            <button onClick={(evt) => {
              props.scoreFunction(evt);
              props.reverseVisibility();
            }} className="borderStandard" >See Scores</button>
          </div>
        </center>
      </header>
      <div id="scoreMenu" className={classNames({
        "inVisible": props.visibility,
        "Visible": !props.visibility
      })} >
        <center>
          <div style={{
            "borderBottom": "1px solid var(--base-color)"
          }}>
            <button
              className="borderStandard"
              style={{ height: "35px" }}
              onClick={() => {
                props.reverseVisibility();
              }}> Close this </button>
          </div>
          <table style={{ width: "400px", height: "100%" }}>
            {props.scores &&
              <div>
                <span className="headerText">Your Stats : </span>
                {tableHeader}
                < tr >
                  <td>{props.scores.self.name}</td>
                  <td>{props.scores.self.t1.score} </td>
                  <td> {props.format(props.scores.self.t1.time)}</td>
                  <td>{props.scores.self.t2.score}</td>
                  <td> {props.format(props.scores.self.t2.time)}</td>
                  <td>{props.scores.self.t3.score}</td>
                  <td> {props.format(props.scores.self.t3.time)}</td>
                </tr>
              </div>
            }
            {props.scores && props.scores['t1'].map((value) => {
              return (
                <div>
                  <span className="headerText">Task-1</span>
                  {tableHeader}
                  <tr>
                    <td>{value.name}</td>
                    <td>{value.t1.score}</td>
                    <td> {props.format(value.t1.time)}</td>
                    <td>{value.t2.score}</td>
                    <td> {props.format(value.t2.time)}</td>
                    <td>{value.t3.score}</td>
                    <td> {props.format(value.t3.time)}</td>
                  </tr>
                </div>
              )
            })}
            {props.scores && props.scores['t2'].map((value) => {
              return (
                <div>
                  <span className="headerText">Task-2</span>
                  {tableHeader}

                  <tr>
                    <td>{value.name}</td>
                    <td>{value.t1.score}</td>
                    <td> {props.format(value.t1.time)}</td>
                    <td>{value.t2.score}</td>
                    <td> {props.format(value.t2.time)}</td>
                    <td>{value.t3.score}</td>
                    <td> {props.format(value.t3.time)}</td>
                  </tr>
                </div>
              )
            })}
            {props.scores && props.scores['t3'].map((value) => {
              return (
                <div>
                  <span className="headerText">Task-3 </span>
                  {tableHeader}
                  <tr>
                    <td>{value.name}</td>
                    <td>{value.t1.score}</td>
                    <td> {props.format(value.t1.time)}</td>
                    <td>{value.t2.score}</td>
                    <td> {props.format(value.t2.time)}</td>
                    <td>{value.t3.score}</td>
                    <td> {props.format(value.t3.time)}</td>
                  </tr>
                </div>
              )
            })}
          </table>
        </center>
      </div >
    </div >
  )
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.baseAddress = `https://qui-zup.herokuapp.com`//`http://127.0.0.1:3000`

    this.state = {
      quizOptions: null,
      inputNameValue: null,
      currentQuiz: null,
      currentQuestion: null,
      notice: null,
      scores: null,
      scoresVisible: true,
      startTime: { "t1": null, "t2": null, "t3": null }
    }
  }

  timeFormat = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? '0' : "") + seconds
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
                current: "login",
                inputNameValue: data.user
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
              method: "POST",
              credentials: "include"
            })
              .then((res2) => {
                res2.json()
                  .then((data2) => {

                    let startTime = Object.assign({}, this.state.startTime)
                    startTime[quizToGo] = data.startTime
                    this.setState({
                      currentQuestion: data2.questions,
                      notice: data2.notice,
                      maxCount: data2.maxCount,
                      currentQuiz: quizToGo,
                      current: "quiz",
                      startTime: startTime
                    })
                    window.setTimeout(function () {
                      fetch(`${this.baseAddress}/getQuestion/${quizToGo}/${this.state.maxCount}`, {
                        method: "POST",
                        credentials: "include"
                      })
                        .then((res) => {
                          this.setState({
                            questions: {
                              "index": 11,
                              "question": "Something went Wrong! Oops",
                              "answer": [],
                              "correct": -1
                            },
                            maxCount: data.maxCount
                          })
                          fetch(`${this.baseAddress}/endTimer/${(new Date()).getTime()}/${this.state.currentQuiz}`, {
                            method: "POST",
                            credentials: "include"
                          })
                        })
                    }.bind(this), 121000);
                    window.setTimeout(function () {
                      alert("30 seconds left")
                    }, 90000)
                  })
              })

          })
      })
  }

  answerButtonClickHandler = (evt) => {
    fetch(`${this.baseAddress}/getQuestion/${this.state.currentQuiz}/${this.state.currentQuestion.index}/${evt.target.dataset.correct}`, {
      method: "POST",
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
    if (this.state.scoresVisible === true) {
      this.setState({ scoresVisible: false })
    } else {
      this.setState({ scoresVisible: true })
    }
  }

  previousQuestionCLickHandler = (evt, direction) => {
    let bodyText = { "back": false }
    if (direction === 'back') {
    } else if (direction === 'next') {
      // continue. Nothing to see here.
    }
    fetch(`${this.baseAddress}/getQuestion/${this.state.currentQuiz}/${this.state.currentQuestion.index}`, {
      method: "POST",
      credentials: "include",
      body: bodyText
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

  }

  render() {

    if (this.state.current === 'login') {
      return (
        <Template format={this.timeFormat} scoreFunction={this.seeScores.bind(this)} scores={this.state.scores} visibility={this.state.scoresVisible} reverseVisibility={this.reverseVisiblityScores.bind(this)}>
          <div>
            <img className="logoImg" alt="NMLC logo" src={logo_temp} ></img>
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
        <Template format={this.timeFormat} scoreFunction={this.seeScores.bind(this)} scores={this.state.scores} visibility={this.state.scoresVisible} reverseVisibility={this.reverseVisiblityScores.bind(this)}>
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
          {this.timeFormat((new Date()).getTime() - this.state.currentQuiz ? this.startTime[this.state.currentQuiz] : 0)}
        </div>
      </div >

      if (this.state.currentQuestion.index > this.state.maxCount) {
        debugger;
        internalValueToDisplay = <div>
          <span className="headerText">Quiz Done! Go back to quiz selection menu from the top button</span>
        </div>
      }

      let forwardEnable = true
      let backwardEnable = true
      if (this.state.currentQuestion) {
        if (this.state.currentQuestion.index === this.maxCount) {
          forwardEnable = false
        }
        if (this.state.currentQuestion.index === 1) {
          backwardEnable = false
        }
      }
      return (
        <Template format={this.timeFormat} scoreFunction={this.seeScores.bind(this)} scores={this.state.scores} visibility={this.state.scoresVisible} reverseVisibility={this.reverseVisiblityScores.bind(this)}>
          <div>
            <div style={{
              "marginBottom": "30px", "borderBottom": "1px solid var(--base-color)"
            }}>
              <img disabled={`${backwardEnable}`} src={backArrow} alt="previous question" style={{ height: "35px" }} onClick={this.previousQuestionCLickHandler.bind(this, "back")}>
              </img>
              <button className="borderStandard" style={{ height: "35px" }} onClick={this.backButtonClickHandler.bind(this)}>Back To Quiz Selection</button>
              <img disabled={`${forwardEnable}`} src={frontArrow} alt="next question" style={{ height: "35px" }} onClick={this.previousQuestionCLickHandler.bind(this, "next")}>
              </img>
            </div>
            {internalValueToDisplay}
          </div >
        </Template>
      )
    } else {
      return (
        <Template format={this.timeFormat} scoreFunction={this.seeScores.bind(this)} scores={this.state.scores} visibility={this.state.scoresVisible} reverseVisibility={this.reverseVisiblityScores.bind(this)}>
          <div className="header">
            We're loading Stuff. Either than or something went seriously wrong.
        </div>
        </Template>
      )
    }
  }
}

export default App;
