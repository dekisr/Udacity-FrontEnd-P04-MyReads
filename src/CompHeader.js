import React, { Component } from 'react'
import payaso from './assets/images/char.svg'

class CompHeader extends Component {
  render() {
    return (
      <header>
        <div id="hero">
          <div className="char"><img src={payaso} alt="Hello"/></div>
          <div className="logo">
            <p className="titleOne">My</p>
            <p className="titleTwo">Reads</p>
          </div>
          <div className="blank"></div>
        </div>
      </header>
    )
  }
}

export default CompHeader;