import React from 'react'
import axios from "axios"

const URL = `http://localhost:9000/api/result`

export default class AppClass extends React.Component {

  state = {
    steps: 0,
    x: 2,
    y: 2,
    B: "",
    email: "",
    message: "" ,
  }

  clickLeft = () => {
    if ( this.state.x === 1) {
      this.setState({
        ...this.state,
        message: "You can't go left"
      })
    } else if ( this.state.x > 1 && this.state.x <= 3 ) {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        x: this.state.x - 1
      })
    }
  }

  clickRight = () => {
    if ( this.state.x === 3 ) {
      this.setState({
        ...this.state,
        message: "You can't go right",
      })
    } else if ( this.state.x >= 1 || this.state.x <= 3 ) {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        x: this.state.x + 1,
        message: ""
      })
    }
  }

  clickUp = () => {
    if ( this.state.y === 1 ) {
      this.setState({
        ...this.state,
        message: "You can't go up",
      })
    } else if ( this.state.y <= 3 ) {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        y: this.state.y - 1,
        message: ""
      })
    }
  }

  clickDown = () => {
    if( this.state.y === 3) {
      this.setState({
        ...this.state,
        message: "You can't go down"
      })
    } else if ( this.state.y >= 1 || this.state.y <= 3 ) {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        y: this.state.y + 1 
      })
    }
    } 


  reset = () => {
    this.setState({
      steps: 0,
      message: "",
      x: 2,
      y: 2,
      email: ""
    })
  }

  onChange = evt => {
    const { value } = evt.target
    console.log(value)
    this.setState({
      ...this.state, 
      email: value
    })
  }

  onSubmit = evt => {
    evt.preventDefault()
    axios.post( URL, { ...this.state, email: this.state.email })
    .then( res => {
      this.setState({ ...this.state, message: res.data.message })
    })
    .catch( err => {
      this.setState({ ...this.state, message: err.response.data.message })
    })
    .finally( () => {
      this.setState(
        { email: "" } 
      )
    })

  }

  render() {

    const { className } = this.props

    const {
      x,
      y,
      steps,
      message, 
      email
    } = this.state

   
    return (
      <div id="wrapper" className={className}>

        <div className="info">
          <h3 id="coordinates">{`Coordinates (${ x }, ${ y })`}</h3>
          <h3 id="steps">
            You moved { steps } {steps === 1 ? "time" : "times"}
          </h3>
        </div>

        <div id="grid">

        <div className={ `${ this.state.x === 1 && this.state.y === 1 ? "square active" : "square" } ` }>
           { this.state.x === 1 && this.state.y === 1 ? "B" : "" }
        </div>

        <div className={ `${ this.state.x === 2 && this.state.y === 1 ? "square active" : "square" } ` }>
           { this.state.x === 2 && this.state.y === 1 ? "B" : "" }
        </div>

        <div className={ `${ this.state.x === 3 && this.state.y === 1 ? "square active" : "square" } ` }>
           { this.state.x === 3 && this.state.y === 1 ? "B" : "" } 
        </div>

        <div className={ `${ this.state.x === 1 && this.state.y === 2 ? "square active" : "square" } ` }>
           { this.state.x === 1 && this.state.y === 2 ? "B" : "" } 
        </div>

        <div className={ `${ this.state.x === 2 && this.state.y === 2 ? "square active" : "square" } ` }> 
          {  this.state.x === 2 && this.state.y === 2 ? "B" : "" } 
        </div>

        <div className={ `${ this.state.x === 3 && this.state.y === 2 ? "square active" : "square" } ` }> 
          { this.state.x === 3 && this.state.y === 2 ? "B" : "" } 
        </div>

        <div className={ `${ this.state.x === 1 && this.state.y === 3 ? "square active" : "square" } ` }>
          { this.state.x === 1 && this.state.y === 3 ? "B" : "" }
        </div>

        <div className={ `${ this.state.x === 2 && this.state.y === 3 ? "square active" : "square" } ` }>
          { this.state.x === 2 && this.state.y === 3 ? "B" : "" }
        </div>

        <div className={ `${ this.state.x === 3 && this.state.y === 3 ? "square active" : "square" } ` }> 
          { this.state.x === 3 && this.state.y === 3 ? "B" : "" } 
        </div>
         
        </div>

        <div className="info">
          <h3 id="message">{ message }</h3>
        </div>

        <div id="keypad">
          <button onClick={ () => this.clickLeft() } id="left">LEFT</button>
          <button onClick={ () => this.clickUp() } id="up">UP</button>
          <button onClick={ () => this.clickRight() } id="right">RIGHT</button>
          <button onClick={ () => this.clickDown() } id="down">DOWN</button>
          <button onClick={ this.reset } id="reset">reset</button>
        </div>

        <form onSubmit={ this.onSubmit }>
          <input 
            id="email" 
            type="email" 
            placeholder="type email"
            value={ email }
            onChange={ this.onChange }
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

//` winner is ${ emailInput.substring(0, emailInput.lastIndexOf("@")) } `