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


  handleMove = (id) => {
    //tell fn which box got clicked on by id name
    // every time that id gets clicked increase steps by one
    //set that value into state
    console.log("this is the id: ", id);
    document.getElementById(id)
    
    this.setState({
      ...this.state,
        totalSteps: this.state.totalSteps + 1
    })
  }

  render() {

    const { className } = this.props

    const {
      x,
      y,
      totalSteps,
      grid,
    } = this.state


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
          <button onClick={ () => this.handleMove("left") } id="left">LEFT</button>
          <button onClick={ () => this.handleMove("up") } id="up">UP</button>
          <button onClick={ () => this.handleMove("right") } id="right">RIGHT</button>
          <button onClick={ () => this.handleMove("down") } id="down">DOWN</button>
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
