import React, { Component } from 'react'
import { Col } from 'reactstrap'

class ImageHomepage extends Component {
  render () {
    return (
      <Col className="image-wrapper" xs={12} sm={6}>
        <img src={this.props.image.src} alt={this.props.image.title} className="img-fluid"></img>
        <h2>{this.props.image.title}</h2>
      </Col>
    )
  }
}

export default ImageHomepage