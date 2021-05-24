import React, { Component } from 'react';
import './Filter.css';

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      minDate: undefined,
      maxDate: undefined,
    }
  }

  // if the date inputs receive any changes update the minDate or maxDate in state
  inputChange(e) {
    // this.setState({ [e.target.id]: new Date(e.target.value).getTime() });
    this.props.dates([e.target.id], new Date(e.target.value).getTime());
  }

  render() {
    return (
      <div className="filter">
        <p>Start Date:<input type="date" min="1" id="minDate" onChange={event => this.inputChange(event)}></input></p>
        <p>End Date: <input type="date" min={this.state.range} id="maxDate" onChange={event => this.inputChange(event)}></input></p>
      </div>
    )
  }
}

export default Filter;