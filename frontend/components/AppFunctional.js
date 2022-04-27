import React, { useState } from 'react'
import axios from "axios"

const URL = `http://localhost:9000/api/result`

export default function AppFunctional(props) {
  const [ state, setState ] =  useState({
    steps: 0,
    x: 2,
    y: 2,
    B: "",
    email: "",
    message: "" ,
  })

  const clickLeft = () => {
    if ( state.x === 1) {
      setState({
        ...state,
        message: "You can't go left"
      })
    } else if ( state.x > 1 && state.x <= 3 ) {
      setState({
        ...state,
        steps: state.steps + 1,
        x: state.x - 1
      })
    }
  }

  const clickRight = () => {
    if ( state.x === 3 ) {
      setState({
        ...state,
        message: "You can't go right",
      })
    } else if ( state.x >= 1 || state.x <= 3 ) {
      setState({
        ...state,
        steps: state.steps + 1,
        x: state.x + 1,
        message: ""
      })
    }
  }

  const clickUp = () => {
    if ( state.y === 1 ) {
      setState({
        ...state,
        message: "You can't go up",
      })
    } else if ( state.y <= 3 ) {
      setState({
        ...state,
        steps: state.steps + 1,
        y: state.y - 1,
        message: ""
      })
    }
  }

  const clickDown = () => {
    if( state.y === 3) {
      setState({
        ...state,
        message: "You can't go down"
      })
    } else if ( state.y >= 1 || state.y <= 3 ) {
      setState({
        ...state,
        steps: state.steps + 1,
        y: state.y + 1 
      })
    }
    } 


  const reset = () => {
    setState({
      steps: 0,
      message: "",
      x: 2,
      y: 2,
      email: ""
    })
  }

  const onChange = evt => {
    const { value } = evt.target
    console.log(value)
    setState({
      ...state, 
      email: value
    })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    axios.post( URL, { ...state, email: state.email })
    .then( res => {
      setState({ ...state, message: res.data.message })
      setState({ ...state, email: "" })
    })
    .catch( err => {
      setState({ ...state, message: err.response.data.message })
    })
  
  }

    return (
      <div id="wrapper" className={props.className}>

        <div className="info">
          <h3 id="coordinates">{`Coordinates (${ state.x }, ${ state.y })`}</h3>
          <h3 id="steps">{`You moved ${state.steps} times`}</h3>
        </div>

        <div id="grid">

        <div className={ `${ state.x === 1 && state.y === 1 ? "square active" : "square" } ` }>
           { state.x === 1 && state.y === 1 ? "B" : "" }
        </div>

        <div className={ `${ state.x === 2 && state.y === 1 ? "square active" : "square" } ` }>
           { state.x === 2 && state.y === 1 ? "B" : "" }
        </div>

        <div className={ `${ state.x === 3 && state.y === 1 ? "square active" : "square" } ` }>
           { state.x === 3 && state.y === 1 ? "B" : "" } 
        </div>

        <div className={ `${ state.x === 1 && state.y === 2 ? "square active" : "square" } ` }>
           { state.x === 1 && state.y === 2 ? "B" : "" } 
        </div>

        <div className={ `${ state.x === 2 && state.y === 2 ? "square active" : "square" } ` }> 
          {  state.x === 2 && state.y === 2 ? "B" : "" } 
        </div>

        <div className={ `${ state.x === 3 && state.y === 2 ? "square active" : "square" } ` }> 
          { state.x === 3 && state.y === 2 ? "B" : "" } 
        </div>

        <div className={ `${ state.x === 1 && state.y === 3 ? "square active" : "square" } ` }>
          { state.x === 1 && state.y === 3 ? "B" : "" }
        </div>

        <div className={ `${ state.x === 2 && state.y === 3 ? "square active" : "square" } ` }>
          { state.x === 2 && state.y === 3 ? "B" : "" }
        </div>

        <div className={ `${ state.x === 3 && state.y === 3 ? "square active" : "square" } ` }> 
          { state.x === 3 && state.y === 3 ? "B" : "" } 
        </div>
         
        </div>

        <div className="info">
          <h3 id="message">{ state.message }</h3>
        </div>

        <div id="keypad">
          <button onClick={ () => clickLeft() } id="left">LEFT</button>
          <button onClick={ () => clickUp() } id="up">UP</button>
          <button onClick={ () => clickRight() } id="right">RIGHT</button>
          <button onClick={ () => clickDown() } id="down">DOWN</button>
          <button onClick={ reset } id="reset">reset</button>
        </div>

        <form onSubmit={ onSubmit }>
          <input 
            id="email" 
            type="email" 
            placeholder="type email"
            value={ state.email }
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
