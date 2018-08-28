import React from 'react'
import { Link } from 'react-router-dom'

function CompHeaderSearch(props) {
  return (
    <header className="headerSearch">
      <div id="heroSearch">
        <Link to="/" className="back">Back</Link>
        <p className="titleThree">add Books</p>
      </div>
    </header>
  )
}

export default CompHeaderSearch;