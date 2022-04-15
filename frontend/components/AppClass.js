import React from 'react'

export default class AppClass extends React.Component {

  state = {
    totalSteps: 0,
    x: 1,
    y: 1,
    emailInput: "",
    message: "" ,
    grid: ["", "", "", 
           "", "", "",
           "", "", "",]
  ,
  }

  handleMove = (id) => {

    const setToB = document.querySelector(".class.active") 
    const getActiveSquare = document.querySelector(`#${id}`)
    getActiveSquare.classList.toggle("active")
    setToB.textContent = "B"
   

    this.setState({
      ...this.state,
        totalSteps: this.state.totalSteps + 1,
    })
  }

  render() {

    const { className } = this.props

    const {
      x,
      y,
      totalSteps,
      grid,
      activeSquare, 
      message
    } = this.state

    const onChange = (evt) => {
      const { value } = evt.target
      console.log(value)
      this.setState({
        ...this.state, 
        emailInput: value
      })
    }

    const onSubmit = (evt) => {
      evt.preventDefault()
      this.setState({
        ...this.state,
        message: ` winner is ${ this.state.emailInput } ` 
      })
      this.setState({
        emailInput: ""
      })
    }

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${ x }, ${ y })`}</h3>
          <h3 id="steps">{`You moved ${totalSteps} times`}</h3>
        </div>
        <div id="grid">
          {
            grid.map( (value,idx) => {
              return( <div key={idx} className="square"></div>)
            })
          }
          
        </div>
        <div className="info">
          <h3 id="message">{ message }</h3>
        </div>
        <div id="keypad">
          <button onClick={ () => this.handleMove("left") } id="left">LEFT</button>
          <button onClick={ () => this.handleMove("up") } id="up">UP</button>
          <button onClick={ () => this.handleMove("right") } id="right">RIGHT</button>
          <button onClick={ () => this.handleMove("down") } id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form onSubmit={onSubmit}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email"
            value={ this.emailInput }
            onChange={ onChange }
          />
          <input
            id="submit" 
            type="submit"
          />
        </form>
      </div>
    )
  }
}
