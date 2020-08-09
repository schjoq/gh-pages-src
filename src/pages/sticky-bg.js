import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function StickyBgPage() {
  return (
    <Layout titleText="Sticky Backgrounds">
      <Filler>Two sticky background images follow...</Filler>
      <StickyImg bgImg={`/showcase/spotify.com.jpg`} />
      <StickyImg bgImg={`/showcase/airbnb.design-cereal.jpg`} />
      <Filler>... and this is the end.</Filler>{" "}
    </Layout>
  )
}

const Filler = styled.div`
  font-size: 84px;
  height: 48vh;
  display: flex;
  align-items: center;
`

const StickyImg = styled.div`
  height: 60vh;
  background-attachment: fixed;
  background-image: url(${props => props.bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
