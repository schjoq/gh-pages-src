import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function Comparing2ImagPage() {
  const leftImg = {
    src: "/woodcut/woodblock.jpg",
    alt: "Woodblock Martyrdom of Saint Sebastian",
  }
  const rightImg = {
    src: "/woodcut/print.jpg",
    alt: "Print of woodblock Martyrdom of Saint Sebastian",
  }
  return (
    <Layout titleText="Comparing 2 Images">
      <Comparing2Imag leftImg={leftImg} rightImg={rightImg}>
        Left: woodblcok <cite>Martyrdom of Saint Sebastian</cite> (reversed
        horizontally); right: print of same woodblcok.
      </Comparing2Imag>
    </Layout>
  )
}

class Comparing2ImagWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = { percentage: 0.55 }
  }

  handleChange(e) {
    this.setState({ percentage: e.target.value })
  }

  render() {
    const percentage = this.state.percentage
    return (
      <figure className={this.props.className}>
        <img {...this.props.leftImg} />
        <ImgRight percentage={percentage} {...this.props.rightImg} />
        <input
          value={percentage}
          onChange={this.handleChange}
          type="range"
          min="0"
          max="1"
          step="any"
        />
        <figcaption>{this.props.children}</figcaption>
      </figure>
    )
  }
}

const Comparing2Imag = styled(Comparing2ImagWrapper)`
  margin: 0;
  position: relative;

  &,
  img,
  input {
    width: 300px;
  }

  img:nth-child(2) {
    position: absolute;
    left: 0;
  }

  figcaption {
    margin-top: 1em;
  }
`

const ImgRight = styled.img`
  clip-path: inset(
    0 0 0 ${props => parseFloat(props.percentage * 100).toFixed(2) + "%"}
  );
`
