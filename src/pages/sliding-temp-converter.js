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
        hasSmallMarks
        markFrom="right"
        sliderSmallestMark="34.6"
        sliderRangeMin="34.6"
        sliderRangeMax="36.2"
        sliderRangeStep=".1"
      />
      <Marks
        hasSmallMarks="null"
        markFrom="left"
        sliderSmallestMark="35"
        sliderRangeMin="35"
        sliderRangeMax="42"
        sliderRangeStep="5"
      />
    </Layout>
  )
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32
}

function getMarkLength(markType) {
  if (markType === "main-mark") {
    return "60%"
  } else if (markType === "medium-mark") {
    return "40%"
  } else if (markType === "small-mark") {
    return "20%"
  }
}

const Mark = styled(function (props) {
  return <div className={props.className}></div>
})`
  border-top: 1px solid black;
  width: ${props => props.markLength};
  position: absolute;
  top: ${props => props.position};
  ${props => props.markFrom}: 0;

  &::before {
    content: "${props => props.markText}";
    width: 5ch;
    position: absolute;
    top: -0.5em;
    ${props => props.markFrom}: 100%;
    text-align: center;
  }
`

// There're always 10 smaller marks between main marks
const numberOfSmallMarksBetweenMark = 10
function roundToDigitStringN(number, n) {
  return parseFloat(number).toFixed(n)
}
function roundToDigitNumberN(number, n) {
  return Number(roundToDigitStringN(number, n))
}

function roundToDigitString1(number) {
  return roundToDigitStringN(number, 1)
}
function roundToDigitNumber1(number) {
  return roundToDigitNumberN(number, 1)
}

function MarksWrapper(props) {
  const {
    sliderSmallestMark,
    sliderRangeMin,
    sliderRangeMax,
    sliderRangeStep,
  } = {
    ...Object.fromEntries(
      Object.entries({ ...props }).map(([key, val]) => [
        key,
        roundToDigitNumber1(val),
      ])
    ),
  }

  function getMainMarkPoints(
    sliderSmallestMark,
    sliderRangeStep,
    sliderRangeMax
  ) {
    let points = []
    for (
      let i = sliderSmallestMark;
      i <= sliderRangeMax;
      i = roundToDigitNumber1(i + sliderRangeStep)
    ) {
      points.push(i)
    }
    return points
  }

  const mainMarkPoints = getMainMarkPoints(
    sliderSmallestMark,
    sliderRangeStep,
    sliderRangeMax
  )

  // Medium mark points are 1/2 step away from main mark points
  const mediumMarkPoints = [
    sliderSmallestMark - sliderRangeStep / 2,
    ...mainMarkPoints.map(point => point + sliderRangeStep / 2),
  ].filter(point => point >= sliderRangeMin && point <= sliderRangeMax)

  function getPositionForPointAsPercentageString(
    point,
    sliderRangeMin,
    sliderRangeMax
  ) {
    return (
      roundToDigitString1(
        ((sliderRangeMax - point) / (sliderRangeMax - sliderRangeMin)) * 100
      ) + "%"
    )
  }

  const markFrom = props.markFrom
  const markLengthes = {
    "main-mark": "40px",
    "medium-mark": "30px",
    "small-makr": "20px",
  }

  function makeMarkForPoint(
    point,
    numberOfDigitsAfterDecimalPoint,
    markType,
    markFrom,
    sliderRangeMin,
    sliderRangeMax
  ) {
    return (
      <Mark
        markFrom={markFrom}
        markText={roundToDigitStringN(point, numberOfDigitsAfterDecimalPoint)}
        position={getPositionForPointAsPercentageString(
          point,
          sliderRangeMin,
          sliderRangeMax
        )}
        markLength={markLengthes[markType]}
      />
    )
  }

  /* let marks = []
   * for (
   *   let point = roundToDigitNumber1(sliderRangeMax);
   *   roundToDigitNumber1(point) >= roundToDigitNumber1(sliderRangeMin);
   *   point -= sliderRangeStep / numberOfSmallMarksBetweenMark
   * ) {
   *   marks.push(getMarkForPoint(point))
   * }
   * return <div className={props.className}>{marks}</div> */

  const mainMarks = mainMarkPoints.map(point =>
    makeMarkForPoint(
      point,
      2,
      "main-mark",
      markFrom,
      sliderRangeMin,
      sliderRangeMax
    )
  )
  const mediumMarks = mediumMarkPoints.map(point =>
    makeMarkForPoint(
      point,
      2,
      "medium-mark",
      markFrom,
      sliderRangeMin,
      sliderRangeMax
    )
  )
  return (
    <div className={props.className}>
      {props.hasSmallMarks ? <p>has small marks</p> : null}
      {mediumMarks}
    </div>
  )
}

const Marks = styled(MarksWrapper)`
  width: 100px;
  height: 300px;
  margin: 100px 8px 0;
  position: relative;
  outline: 2px solid red;
  float: left;
`

const TempDisplay = styled(props => (
  <span className={props.className}>{roundToDigitString1(props.value)}</span>
))`
  display: inline-block;
  font-size: 3em;
  width: 4.5ch;
`

class TempSliderWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = { step: "0.1", min: "35", max: "42" }
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
  height: 20px;
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
        <TempDisplay className="celsius-result" value={value} />
        <TempDisplay
          className="fahrenheit-result"
          value={toFahrenheit(value)}
        />
        <Marks
          sliderSmallestMark="35"
          sliderRangeMin="35"
          sliderRangeMax="42"
          sliderRangeStep="1"
        />
      </div>
    )
  }
}

const SlidingTempConverter = styled(SlidingTempConverterWrapper)`
  padding: 0;
  position: relative;

  ${TempSlider} input {
    position: absolute;
    top: 0;
    left: 100px;
    width: 840px;
  }

  ${TempDisplay} {
    position: absolute;
    top: 0;
  }

  ${TempDisplay}.celsius-result {
    left: 400px;
  }

  ${TempDisplay}.fahrenheit-result {
    left: 560px;
  }
`
