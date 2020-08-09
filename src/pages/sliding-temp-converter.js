import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function SlidingTempConverterPage() {
  return (
    <Layout titleText="Sliding Temperature Converter">
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
      <SlidingTemperatureConverter />
    </Layout>
  )
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32
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

  // Small mark points are 1-4 or 6-9 of 1/10 steps away from main mark points
  const smallMarkPoints = [
    [1, 2, 3, 4, 6, 7, 8, 9].map(
      x => sliderSmallestMark - (sliderRangeStep / 10) * x
    ),
    ...mainMarkPoints.map(point =>
      [1, 2, 3, 4, 6, 7, 8, 9].map(x => point + (sliderRangeStep / 10) * x)
    ),
  ]
    .flat()
    .filter(point => point >= sliderRangeMin && point <= sliderRangeMax)

  const markFrom = props.markFrom

  function makeMarkForPoint(
    point,
    numberOfDigitsAfterDecimalPoint,
    markType,
    markFrom,
    sliderRangeMin,
    sliderRangeMax
  ) {
    const markLengthes = {
      "main-mark": "40px",
      "medium-mark": "30px",
      "small-mark": "20px",
    }
    return (
      <Mark
        markFrom={markFrom}
        markText={
          numberOfDigitsAfterDecimalPoint === null
            ? null
            : roundToDigitStringN(point, numberOfDigitsAfterDecimalPoint)
        }
        position={getPositionForPointAsPercentageString(
          point,
          sliderRangeMin,
          sliderRangeMax
        )}
        markLength={markLengthes[markType]}
      />
    )
  }

  const mainMarks = mainMarkPoints.map(point =>
    makeMarkForPoint(
      point,
      0,
      "main-mark",
      markFrom,
      sliderRangeMin,
      sliderRangeMax
    )
  )
  // Medium marks always exist
  const mediumMarks = mediumMarkPoints.map(point =>
    makeMarkForPoint(
      point,
      null,
      "medium-mark",
      markFrom,
      sliderRangeMin,
      sliderRangeMax
    )
  )
  // Small marks may and may not exist
  const smallMarks =
    props.hasSmallMarks === "true"
      ? smallMarkPoints.map(point =>
          makeMarkForPoint(
            point,
            null,
            "small-mark",
            markFrom,
            sliderRangeMin,
            sliderRangeMax
          )
        )
      : null

  return (
    <div className={props.className}>
      {mainMarks}
      {mediumMarks}
      {smallMarks}
    </div>
  )
}

const Marks = styled(MarksWrapper)`
  width: 112px;
  height: 300px;
  position: relative;
  margin: 0 2px;
`

const TemperatureResult = styled(props => (
  <span className={props.className}>{roundToDigitString1(props.value)}</span>
))`
  display: inline-block;
  font-size: 3em;
  width: 150px;
  text-align: center;
`

const TemperatureSliderWrapper = props => (
  <input
    className={props.className}
    onChange={props.onChange}
    type="range"
    step="0.1"
    min={props.sliderRangeMin}
    max={props.sliderRangeMax}
    value={props.value}
  />
)

const TemperatureSlider = styled(TemperatureSliderWrapper)``

class SlidingTemperatureConverterWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSettingChange = this.handleSettingChange.bind(this)
    this.settings = {
      human: {
        celsius: {
          hasSmallMarks: "false",
          markFrom: "right",
          sliderSmallestMark: "35",
          sliderRangeMin: "35",
          sliderRangeMax: "42",
          sliderRangeStep: "1",
        },
        fahrenheit: {
          hasSmallMarks: "false",
          markFrom: "left",
          sliderSmallestMark: "95",
          sliderRangeStep: "1",
        },
      },
      weather: {
        celsius: {
          hasSmallMarks: "false",
          markFrom: "right",
          sliderSmallestMark: "-30",
          sliderRangeMin: "-36",
          sliderRangeMax: "50",
          sliderRangeStep: "10",
        },
        fahrenheit: {
          hasSmallMarks: "false",
          markFrom: "left",
          sliderSmallestMark: "-30",
          sliderRangeStep: "20",
        },
      },
      oven: {
        celsius: {
          hasSmallMarks: "true",
          markFrom: "right",
          sliderSmallestMark: "0",
          sliderRangeMin: "0",
          sliderRangeMax: "300",
          sliderRangeStep: "100",
        },
        fahrenheit: {
          hasSmallMarks: "false",
          markFrom: "left",
          sliderSmallestMark: "100",
          sliderRangeStep: "100",
        },
      },
    }
    this.state = {
      values: { human: "38", weather: "20", oven: "150" },
      setting: "oven",
    }
  }

  handleChange(e) {
    const value = e.target.value
    this.setState({
      values: { ...this.state.values, [this.state.setting]: value },
    })
    document.getElementById(
      "slider-bar"
    ).style.top = getPositionForPointAsPercentageString(
      value,
      this.settings[this.state.setting].celsius.sliderRangeMin,
      this.settings[this.state.setting].celsius.sliderRangeMax
    )
  }

  handleSettingChange(newSetting) {
    this.setState({ setting: newSetting })
    document.getElementById(
      "slider-bar"
    ).style.top = getPositionForPointAsPercentageString(
      this.state.values[newSetting],
      this.settings[newSetting].celsius.sliderRangeMin,
      this.settings[newSetting].celsius.sliderRangeMax
    )
  }

  componentDidMount() {
    document.getElementById(
      "slider-bar"
    ).style.top = getPositionForPointAsPercentageString(
      this.state.values[this.state.setting],
      this.settings[this.state.setting].celsius.sliderRangeMin,
      this.settings[this.state.setting].celsius.sliderRangeMax
    )
  }

  render() {
    const value = this.state.values[this.state.setting]
    return (
      <div className={this.props.className}>
        <div>
          {" "}
          <span id="slider-bar"></span>
          <TemperatureSlider
            sliderRangeMin={
              this.settings[this.state.setting].celsius.sliderRangeMin
            }
            sliderRangeMax={
              this.settings[this.state.setting].celsius.sliderRangeMax
            }
            value={value}
            onChange={this.handleChange}
          />
          <TemperatureResult className="celsius-result" value={value} />
          <Marks {...this.settings[this.state.setting].celsius} />
          <Marks
            {...this.settings[this.state.setting].fahrenheit}
            sliderRangeMin={roundToDigitString1(
              toFahrenheit(
                this.settings[this.state.setting].celsius.sliderRangeMin
              )
            )}
            sliderRangeMax={roundToDigitString1(
              toFahrenheit(
                this.settings[this.state.setting].celsius.sliderRangeMax
              )
            )}
          />
          <TemperatureResult
            className="fahrenheit-result"
            value={toFahrenheit(value)}
          />
        </div>
        <button onClick={() => this.handleSettingChange("human")}>Human</button>
        <button onClick={() => this.handleSettingChange("weather")}>
          Weather
        </button>
        <button onClick={() => this.handleSettingChange("oven")}>Oven</button>
      </div>
    )
  }
}

const SlidingTemperatureConverter = styled(SlidingTemperatureConverterWrapper)`
  > div:first-child {
    padding: 0;
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  #slider-bar {
    position: absolute;
    border-top: 2px solid red;
    width: 100px;
    top: 50%;
    left: 50%;
    translate: -50%;
  }

  ${TemperatureSlider} {
    position: absolute;
    top: 50%;
    left: 116px;
    width: 300px;

    translate: 0 -50%;
    rotate: -90deg;
    z-index: 1;
  }

  ${TemperatureResult}.celsius-result::before {
    content: "C";
    position: absolute;
    top: 20px;
    left: 10%;
    color: #aaa;
  }

  ${TemperatureResult}.fahrenheit-result::before {
    content: "F";
    position: absolute;
    top: 20px;
    right: 10%;
    color: #aaa;
  }
`
