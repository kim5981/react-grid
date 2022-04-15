import React from 'react'

export default class AppClass extends React.Component {

  state = {
    totalSteps: 0,
    x: 1,
    y: 1,
    buttonPress: "",
    emailInput: "",
    message: "" ,
    grid: ["", "", "", 
           "", "", "",
           "", "", "",]
  ,
  }

  render() {

    const { className } = this.props

    const { x, y, totalSteps, grid } = this.state


    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${ x }, ${ y })`}</h3>
          <h3 id="steps">{`You moved ${totalSteps} times`}</h3>
        </div>
        <div id="grid">
          {
            grid.map( (value,idx) => {
              return( <div key={idx} className="square">{ value  }</div>)
            })
          }
          
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
