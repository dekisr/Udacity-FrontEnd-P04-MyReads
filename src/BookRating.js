import React from 'react'
import PropTypes from 'prop-types'

function BookRating(props) {
  return (
    <div id={`${props.item.id}_rating`} className="rating">
      {
        props.item.stars > 4 ?
        <span className="ratingFive active" onClick={() => props.addStar(5, props.item)}>★</span> :
        <span className="ratingFive" onClick={() => props.addStar(5, props.item)}>★</span>
      }
      {
        props.item.stars > 3 ?
        <span className="ratingFour active" onClick={() => props.addStar(4, props.item)}>★</span> :
        <span className="ratingFour" onClick={() => props.addStar(4, props.item)}>★</span>
      }
      {
        props.item.stars > 2 ?
        <span className="ratingThree active" onClick={() => props.addStar(3, props.item)}>★</span> :
        <span className="ratingThree" onClick={() => props.addStar(3, props.item)}>★</span>
      }
      {
        props.item.stars > 1 ?
        <span className="ratingTwo active" onClick={() => props.addStar(2, props.item)}>★</span> :
        <span className="ratingTwo" onClick={() => props.addStar(2, props.item)}>★</span>
      }
      {
        props.item.stars > 0 ?
        <span className="ratingOne active" onClick={() => props.addStar(1, props.item)}>★</span> :
        <span className="ratingOne" onClick={() => props.addStar(1, props.item)}>★</span>
      }
    </div>
  )
}
BookRating.propTypes = {
  addStar: PropTypes.func.isRequired
}

export default BookRating;