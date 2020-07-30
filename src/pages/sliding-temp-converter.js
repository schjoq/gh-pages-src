import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function SlidingTempConverterPage() {
  return (
    <Layout titleText="Sliding temperature converter">
      <SlidingTempConverter />
    </Layout>
  )
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32
}

const TempDisplay = styled.span`
  display: inline-block;
  font-size: 3em;
  width: 4.5ch;
`

const TempSlider = styled(props => (
  <input {...props} type="range" step="0.5" min="-10" max="40" />
))`
  background-color: pink;
`

class SlidingTempConverterWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = { value: "25" }
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
  }

  render() {
    const value = this.state.value
    return (
      <div className={this.props.className}>
        <TempDisplay>{value}</TempDisplay>
        <TempSlider value={value} onChange={this.handleChange} />
        <TempDisplay>{toFahrenheit(value)}</TempDisplay>
      </div>
    )
  }
}

const SlidingTempConverter = styled(SlidingTempConverterWrapper)`
  padding: 100px 0;
`
