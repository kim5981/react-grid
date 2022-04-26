import React from 'react'

export default class AppClass extends React.Component {

  state = {
    activeSquare: "",
    totalSteps: 0,
    x: 2,
    y: 2,
    emailInput: "",
    message: "" ,
    grid: [
      [ 0, 0, 0 ], 
      [ 0, 1, 0 ], 
      [ 0, 0, 0 ] 
    ]
  ,
  }

  clickLeft = () => {

    if(this.state.x > 0) {
      this.setState({
        ...this.state,
        totalSteps: this.state.totalSteps + 1,
        x: this.state.x - 1
      })
    } else if (this.state.x <= 0) {
      this.setState({
        ...this.state,
        message: "You can't go left"
      })
    }
  }

  clickRight = () => {

  }

  clickUp = () => {
    if( this.state.y < 3 ) {
      this.setState({
        ...this.state,
        totalSteps: this.state.totalSteps + 1,
        y: this.state.y - 1 
      })
    } else if ( this.state.y <= 0 ) {
      this.setState({
        ...this.state,
        message: "You can't go up"
      })
    }
    
  }

  clickDown = () => {

  }

  reset = () => {
    this.setState({
      totalSteps: 0,
      message: "",
      x: 2,
      y: 2
    })
  }

  render() {

    const { className } = this.props

    const {
      x,
      y,
      totalSteps,
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
           this.state.grid.flatMap(x => x)
           .map( (l, idx ) => {
             return l === 1 ? (
               <div key={ idx } value={ idx } className="square active"> B </div>
             ) : (
               <div key={ idx } value={ idx } className="square"></div>
             )
           })
         } 
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
