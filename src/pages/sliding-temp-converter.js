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
      <SlidingTempConverter />
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
  return (
    <div className={props.className}>
      {/* props.markType === "main-mark" ? <span>{props.markText}</span> : null */}
      <span>{props.markText}</span>
      <div></div>
    </div>
  )
})`
  div {
    width: ${props => getMarkLength(props.markType)};
    height: 50%;
    float: right;
    outline: 1px solid red;
  }
`

// There're always 10 smaller marks between main marks
const numberOfSmallMarksBetweenMark = 10
function roundTo1DigitString(temperature) {
  return parseFloat(temperature).toFixed(1)
}
function roundTo1DigitNumber(temperature) {
  return Number(roundTo1DigitString(temperature))
}

function MarksWrapper(props) {
  const {
    sliderSmallestMark,
    sliderRangeMin,
    sliderRangeMax,
    sliderRangeStep,
    sliderHeight,
  } = {
    ...Object.fromEntries(
      Object.entries({ ...props }).map(([key, val]) => [
        key,
        roundTo1DigitNumber(val),
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
      i += sliderRangeStep
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

  const mediumMarkPoints = [
    sliderSmallestMark - sliderRangeStep / 2,
    ...mainMarkPoints.map(point => point + sliderRangeStep / 2),
  ]
  // Test
  console.log("Main mark points: ", mainMarkPoints)
  console.log("Medium mark points: ", mediumMarkPoints)

  function getMarkForPoint(point) {
    const temperatureString = roundTo1DigitString(point)
    const temperatureNumber = roundTo1DigitNumber(point)
    let markType
    if (mainMarkPoints.includes(temperatureNumber)) markType = "main-mark"
    else if (mediumMarkPoints.includes(temperatureNumber))
      markType = "medium-mark"
    else markType = "small-mark"
    return (
      <Mark
        key={point}
        className={markType}
        markType={markType}
        markText={temperatureString}
      />
    )
  }

  console.log(roundTo1DigitNumber(sliderRangeMin))
  let marks = []
  for (
    let point = roundTo1DigitNumber(sliderRangeMax);
    roundTo1DigitNumber(point) >= roundTo1DigitNumber(sliderRangeMin);
    point -= sliderRangeStep / numberOfSmallMarksBetweenMark
  ) {
    /*     console.log(point, roundTo1DigitNumber(point), roundTo1DigitString(point)) */
    marks.push(getMarkForPoint(point))
  }
  return (
    <div className={props.className}>
      <table>
        <tbody>
          <tr>
            <td>Max</td>
            <td>{sliderRangeMax}</td>
          </tr>
          <tr>
            <td>Min</td>
            <td>{sliderRangeMin}</td>
          </tr>
          <tr>
            <td>Smallest mark</td>
            <td>{sliderSmallestMark}</td>
          </tr>
          <tr>
            <td>Step</td>
            <td>{sliderRangeStep}</td>
          </tr>
          <tr>
            <td>Slider height</td>
            <td>{sliderHeight}</td>
          </tr>
        </tbody>
      </table>
      {marks}
    </div>
  )
}

const Marks = styled(MarksWrapper)`
  /*   overflow: hidden; */
  display: flex;
  flex-direction: column;
  outline: 1px solid orange;
  --slider-height: ${props => props.sliderHeight};
  --slider-range-max: ${props => props.sliderRangeMax};
  --slider-range-min: ${props => props.sliderRangeMin};
  --slider-range-step: ${props => props.sliderRangeStep};
  --slider-mark-height: calc(
    ${props => props.sliderHeight} /
      (var(--slider-range-max) - var(--slider-range-min)) /
      ${numberOfSmallMarksBetweenMark}
  );
  height: var(--slider-height);

  table {
    position: absolute;
    left: 8vw;
  }

  ${Mark} {
    height: var(--slider-mark-height);
    width: 200px;
    position: relative;
    outline: 1px solid blue;
    flex: 0 0 auto;
  }

  ${Mark}:nth-child(2) {
    background-color: pink;
    margin-top: calc(
      0 * -1 *
        (
          (var(--drawn-slider-range-max) - var(--slider-range-max)) *
            var(--slider-height) /
            (var(--slider-range-max) - var(--slider-range-min))
        )
    );
  }

  ${Mark} > div {
    border-bottom: 3px solid;
  }

  ${Mark}.small-mark > div {
    border-bottom: ${props => (props.hasSmallMarks ? "3px" : "0px")} solid;
  }

  ${Mark} span {
    font-size: calc(var(--slider-mark-height) * 0.7);
    position: absolute;
    top: calc(50% - 1em / 2);
    left: 0;
    width: 4ch;
    text-align: right;
  }
`

const TempDisplay = styled(props => (
  <span className={props.className}>{roundTo1DigitString(props.value)}</span>
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
          sliderHeight="840px"
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
