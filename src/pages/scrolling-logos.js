import React from "react"
import styled, { keyframes } from "styled-components"
import Layout from "../components/layout"

export default function ScrollingLogos() {
  return (
    <Layout titleText="Scrolling Logos">
      <p>
        Trying to recreate what I saw on{" "}
        <a href="https://styled-components.com/">styled-components.com</a>.
      </p>
      <Show logos={logos} />{" "}
    </Layout>
  )
}

const logos = [
  { src: "/auto-logos/audi.png", alt: "Audi Logo", imgSize: "large" },
  { src: "/auto-logos/benz.png", alt: "Benz Logo", imgSize: "large" },
  { src: "/auto-logos/bmw.png", alt: "BMW Logo", imgSize: "large" },
  { src: "/auto-logos/ford.png", alt: "Ford Logo", imgSize: "large" },
  { src: "/auto-logos/honda.png", alt: "Honda Logo", imgSize: "small" },
  { src: "/auto-logos/hyundai.png", alt: "Hyundai Logo", imgSize: "small" },
  { src: "/auto-logos/nissan.png", alt: "Nissan Logo", imgSize: "large" },
  { src: "/auto-logos/suzuki.png", alt: "Suzuki Logo", imgSize: "small" },
  {
    src: "/auto-logos/volkswagen.png",
    alt: "Volkswagen Logo",
    imgSize: "large",
  },
]

const Logo = styled(props => (
  <img className={props.className} src={props.src} alt={props.alt} />
))`
  height: ${props => (props.imgSize === "large" ? "64px" : "36px")};
`

function Wrapper(props) {
  const logos = props.logos.map(logo => (
    <Logo key={logo.src} src={logo.src} alt={logo.alt} imgSize={logo.imgSize} />
  ))
  return (
    <div className={props.className}>
      <div>{logos}</div>
      <div>{logos}</div>
    </div>
  )
}

const scroll1 = keyframes`
  0% {
    translate: 0;
  }
  100% {
    translate: 200%;
  }
`

const scroll2 = keyframes`
  0% {
    translate: -100%;
  }
  100% {
    translate: 100%;
  }
`

const Show = styled(Wrapper)`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 3em;
  width: 100%;
  overflow: hidden;
  height: 100px;
  box-shadow: 0px 0px 1px 0px #999;

  div {
    display: flex;
    align-items: center;
  }

  div:last-child {
    animation: 20s ${scroll1} linear infinite;
  }

  div:first-child {
    animation: 20s ${scroll2} linear calc(20s * -1 / 2) infinite;
  }

  img {
    margin-right: 30px;
  }

  img:last-child {
    margin-right: 120px;
  }
`
