import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function LargeImgPage() {
  return (
    <Layout titleText="Large Image">
      <p>How to center the image?</p>
      <Img src={`/showcase/airbnb.design-cereal.jpg`} alt="Airbnb" />
    </Layout>
  )
}

const Img = styled.img`
  width: 360px;
  width: 99vw;
  margin-left: -184px;
`
