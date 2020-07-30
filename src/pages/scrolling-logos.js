import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function ScrollingLogos() {
  return (
    <Layout titleText="Scrolling Logos">
      <p>Animate the logos!</p>
      <Show logos={logos} />{" "}
    </Layout>
  )
}

const logos = [
  { src: "/auto-logos/audi.png", alt: "Audi Logo" },
  { src: "/auto-logos/benz.png", alt: "Benz Logo" },
  { src: "/auto-logos/bmw.png", alt: "BMW Logo" },
  { src: "/auto-logos/ford.png", alt: "Ford Logo" },
  { src: "/auto-logos/honda.png", alt: "Honda Logo" },
  { src: "/auto-logos/hyundai.png", alt: "Hyundai Logo" },
  { src: "/auto-logos/nissan.png", alt: "Nissan Logo" },
  { src: "/auto-logos/suzuki.png", alt: "Suzuki Logo" },
  { src: "/auto-logos/volkswagen.png", alt: "Volkswagen Logo" },
]

const Logo = props => <Img {...props} />

const Img = styled.img`
  height: 40px;
`

function Wrapper(props) {
  const logos = props.logos.map(c => (
    <Logo key={c.src} src={c.src} alt={c.alt} />
  ))
  return <div className={props.className}>{logos}</div>
}

const Show = styled(Wrapper)`
  display: flex;
`
