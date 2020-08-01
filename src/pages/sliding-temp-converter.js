import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function SlidingTempConverterPage() {
  return (
    <Layout titleText="Sliding temperature converter">
      <ul>
        Todo
        <li>How to implement marks</li>
        <li>How to rotate and align the slider nicely?</li>
      </ul>
      <p>
        Inspired by{" "}
        <a href="https://apps.apple.com/us/app/sliding-temperature-converter/id883954653">
          the iOS app Sliding Temperature Converter
        </a>
        .
      </p>
      <Marks
        markHeight="100px"
        markRangeMin="-25.5"
        markRangeMax="48"
        markRangeStep="10"
      />
      <SlidingTempConverter />
    </Layout>
  )
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32
}

const Mark = styled(props => (
  <div className={props.className}>
    {props.markType === "long" ? <span>{props.markText}</span> : null}
    <div></div>
  </div>
))`
  width: 200px;
  position: relative;
  border-right: 4px solid black;
  outline: 1px solid blue;
  flex: 0 0 auto;

  div {
    height: 50%;
    width: 60%;
    float: right;
    border-bottom: 4px solid black;
    outline: 1px solid red;
  }

  span {
    font-size: 32px;
    position: absolute;
    top: calc(50% - 1em / 2);
    left: 0;
    width: 4ch;
    text-align: right;
  }
`

const roundup = n => (n === Math.floor(n) ? n : Math.floor(n) + 1)

function MarksWrapper(props) {
  const { markRangeMin, markRangeMax, markRangeStep } = {
    ...Object.fromEntries(
      Object.entries({ ...props }).map(([key, val]) => [
        key,
        Number(roundTemperature(val)),
      ])
    ),
  }

  let marks = []
  for (
    let i = roundup(markRangeMax);
    i >= Math.floor(markRangeMin);
    i = i - markRangeStep
  ) {
    marks.push(<Mark key={i} markType="long" markText={i} />)
  }
  return <div className={props.className}>{marks}</div>
}

const Marks = styled(MarksWrapper)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  outline: 1px solid orange;
  height: calc(
    (${props => roundup(props.markRangeMax)} - ${props => props.markRangeMin}) *
      ${props => props.markHeight} / ${props => props.markRangeStep}
  );

  ${Mark} {
    height: ${props => props.markHeight};
  }

  ${Mark}:first-child {
    margin-top: calc(
      -1 * (${props => props.markHeight} / 2) + (
          ${props => roundup(props.markRangeMax)} -
            ${props => roundup(props.markRangeMax)}
        ) * ${props => props.markHeight} / ${props => props.markRangeStep}
    );
  }
`

function roundTemperature(temperature) {
  return parseFloat(temperature).toFixed(1)
}

const TempDisplay = styled(props => (
  <span className={props.className}>{roundTemperature(props.value)}</span>
))`
  display: inline-block;
  font-size: 3em;
  width: 4.5ch;
`

class TempSliderWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = { step: "0.5", min: "-20", max: "50" }
  }

  render() {
    return (
      <div className={this.props.className}>
        <input onChange={this.props.onChange} type="range" {...this.state} />
      </div>
    )
  }
}

const TempSlider = styled(TempSliderWrapper)`
  width: 300px;
  height: 400px;
  outline: 1px solid blue;

  input {
    outline: 3px solid red;
  }
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
        <TempSlider value={value} onChange={this.handleChange} />
        <TempDisplay value={value} />
        <TempDisplay value={toFahrenheit(value)} />
      </div>
    )
  }
}

const SlidingTempConverter = styled(SlidingTempConverterWrapper)`
  padding: 100px 0;
`
