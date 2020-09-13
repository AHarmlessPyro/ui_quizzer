import React, { useEffect, useState } from 'react';
import logo_temp from './logo_temp_1.png'
import Template from './template'
import './App.css';

/**
 * States : 
 * login  -> quiz selection
 *        -> scores
 * quiz selection -> quiz
 * quiz
 * scores
 */

// const Template = (props) => {
//   const [scores, setScore] = useState({})
//   const [clicked, setClick] = useState(false)

//   useEffect(
//     function fetchScores() {
//       debugger;
//       fetch(`${props.baseAddress}/scores`, {
//         credentials: "include"
//       })
//         .then((res) => {
//           res.json()
//             .then((data) => {
//               setScore(data)
//               //props.callback()
//             })
//         })
//     }
//     , [clicked])


//   return (
//     <div className="App" >
//       <header className="App-header">
//         <center>
//           <div className="loginScreen borderStandard" >
//             {props.children}
//           </div>
//           <div className="borderStandard">
//             <button onClick={setClick(!clicked)} className="borderStandard" >See Scores</button>
//           </div>
//         </center>
//       </header>
//     </div >
//   )
// }


class App extends React.Component {
  constructor(props) {
    super(props);

    this.baseAddress = `http://127.0.0.1:3000` //`https://qui-zup.herokuapp.com`//

    this.state = {
      // current: "login",
      quizOptions: null,
      inputNameValue: null,
      currentQuiz: null,
      currentQuestion: null,
      notice: null,
      scores: null
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
            debugger;
            console.log(data)
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
          console.log(res)
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
    console.log(evt.target)
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
              current: "scores",
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

  render() {

    if (this.state.current === 'login') {
      return (
        Template(
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
        )
      )
    } else if (this.state.current === "quiz selection") {
      return (
        Template(
          <div>
            <span className="headerText">Select a Quiz :</span>
            <div className="loginButtons">
              {this.state.quizOptions.map((data) => {
                return <button onClick={this.quizClickChangeHandler} name={data.key} className="borderStandard" key={data.key}>{data.name}</button>
              })}
            </div>
          </div >
        )
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
        Template(
          <div>
            <div style={{
              "marginBottom": "30px", "borderBottom": "1px solid var(--base-color)"
            }}>
              <button className="borderStandard" style={{ height: "35px" }} onClick={this.backButtonClickHandler.bind(this)}>Back To Quiz Selection</button>
            </div>
            {internalValueToDisplay}
          </div >
        )
      )
    } else if (this.state.current === 'scores') {
      return (
        Template(

        )
      )
    } else {
      return (
        <div className="header">
          We're loading Stuff. Either than or something went seriously wrong.
        </div>
      )
    }
  }
}

export default App;
