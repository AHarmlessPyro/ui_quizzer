(this.webpackJsonpui_quizzer=this.webpackJsonpui_quizzer||[]).push([[0],[,,,,,function(e,t,n){e.exports=n.p+"static/media/logo_temp_1.c22650c3.png"},,,function(e,t,n){e.exports=n(15)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(2),s=n.n(r),i=(n(13),n(3)),o=n(4),u=n(7),l=n(6),d=n(5),m=n.n(d);n(14);function h(e){return c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement("center",null,c.a.createElement("div",{className:"loginScreen borderStandard"},e))))}var p=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).inputNameOnChangeHandler=function(e){e.preventDefault(),a.setState({inputNameValue:e.target.value})},a.quizClickChangeHandler=function(e){e.preventDefault();var t=e.target.name;fetch("".concat(a.baseAddress,"/startTimer/").concat((new Date).getTime(),"/").concat(t,"/"),{method:"POST",credentials:"include"}).then((function(e){e.json().then((function(e){fetch("".concat(a.baseAddress,"/getQuestion/").concat(t,"/").concat(e.redirectTo),{credentials:"include"}).then((function(e){e.json().then((function(e){a.setState({currentQuestion:e.questions,notice:e.notice,maxCount:e.maxCount,currentQuiz:t,current:"quiz"})}))}))}))}))},a.answerButtonClickHandler=function(e){console.log(e.target),fetch("".concat(a.baseAddress,"/getQuestion/").concat(a.state.currentQuiz,"/").concat(a.state.currentQuestion.index,"/").concat(e.target.dataset.correct),{credentials:"include"}).then((function(e){e.json().then((function(e){a.setState({currentQuestion:e.questions,notice:e.notice,maxCount:e.maxCount})}))})),a.state.currentQuestion.index===a.state.maxCount&&fetch("".concat(a.baseAddress,"/endTimer/").concat((new Date).getTime(),"/").concat(a.state.currentQuiz),{method:"POST",credentials:"include"})},a.seeScores=function(e){e.preventDefault(),fetch("".concat(a.baseAddress,"/scores"),{credentials:"include"}).then((function(e){e.json().then((function(e){a.setState({current:"scores",scores:e})}))}))},a.backButtonClickHandler=function(e,t){e.preventDefault(),a.setState({current:"quiz selection"})},a.baseAddress="https://qui-zup.herokuapp.com",a.state={quizOptions:null,inputNameValue:null,currentQuiz:null,currentQuestion:null,notice:null,scores:null},a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;console.log("component mounting"),fetch("".concat(this.baseAddress,"/isUserRegistered"),{method:"GET",credentials:"include"}).then((function(t){t.json().then((function(t){console.log(t),t.reg?fetch("".concat(e.baseAddress,"/listOfQuizzes"),{credentials:"include"}).then((function(t){t.json().then((function(t){e.setState({current:"quiz selection",quizOptions:t})}))})):e.setState({current:"login"})}))}))}},{key:"login",value:function(){var e=this;null!==this.state.inputNameValue&&void 0!==this.state.inputNameValue&&fetch("".concat(this.baseAddress,"/registerUser/").concat(this.state.inputNameValue),{method:"POST",credentials:"include"}).then((function(t){console.log(t),fetch("".concat(e.baseAddress,"/listOfQuizzes"),{credentials:"include"}).then((function(t){t.json().then((function(t){e.setState({current:"quiz selection",quizOptions:t})}))}))}))}},{key:"render",value:function(){var e=this;if("login"===this.state.current)return h(c.a.createElement("div",null,c.a.createElement("img",{className:"logoImg",src:m.a}),c.a.createElement("div",{className:"userName"},c.a.createElement("input",{type:"text",id:"inputName",placeholder:"Enter Your Name Here",className:"borderStandard",onChange:this.inputNameOnChangeHandler})),c.a.createElement("div",{className:"loginButtons"},c.a.createElement("button",{className:"borderStandard",onClick:this.login.bind(this)},"start quiz"),c.a.createElement("button",{className:"borderStandard",onClick:this.seeScores.bind(this)},"see scores"))));if("quiz selection"===this.state.current)return h(c.a.createElement("div",null,c.a.createElement("span",{className:"headerText"},"Select a Quiz :"),c.a.createElement("div",{className:"loginButtons"},this.state.quizOptions.map((function(t){return c.a.createElement("button",{onClick:e.quizClickChangeHandler,name:t.key,className:"borderStandard",key:t.key},t.name)})))));if("quiz"===this.state.current){var t=c.a.createElement("div",null,c.a.createElement("span",{className:"headerText"},this.state.currentQuestion.question),c.a.createElement("br",null),c.a.createElement("span",{className:"notice"},this.state.notice),c.a.createElement("div",{className:"loginButtons"},this.state.currentQuestion.answer.map((function(t,n){return c.a.createElement("button",{style:{paddingBottom:"30px",marginBottom:"30px"},onClick:e.answerButtonClickHandler.bind(e),name:n,"data-correct":n===e.state.currentQuestion.correct,className:"borderStandard",key:t},t)}))));return this.state.currentQuestion.index>this.state.maxCount&&(t=c.a.createElement("div",null,c.a.createElement("span",{className:"headerText"},"Quiz Done! Go back to quiz selection menu from the top button"))),h(c.a.createElement("div",null,c.a.createElement("div",{style:{marginBottom:"30px",borderBottom:"1px solid var(--base-color)"}},c.a.createElement("button",{className:"borderStandard",style:{height:"35px"},onClick:this.backButtonClickHandler.bind(this)},"Back To Quiz Selection")),t))}return"scores"===this.state.current?h(c.a.createElement("table",null,this.state.scores.map((function(e){return c.a.createElement("tr",null,c.a.createElement("th",null,e.name),c.a.createElement("th",null,e.t1),c.a.createElement("th",null,e.t2),c.a.createElement("th",null,e.t3))})))):c.a.createElement("div",null,"Womp Womp")}}]),n}(c.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.bbbbf7ce.chunk.js.map