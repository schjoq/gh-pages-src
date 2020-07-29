import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Header from "../components/header"

export default function Showcase() {
  return (
    <Layout pageTitle="Showcase">
      <Show cases={cases} />
    </Layout>
  )
}

const cases = [
  { src: "/showcase/airbnb.design-cereal.jpg", alt: "Airbnb" },
  { src: "/showcase/imdb.com.jpg", alt: "IMDb" },
  { src: "/showcase/spotify.com.jpg", alt: "Spotify" },
  { src: "/showcase/wish.com.jpg", alt: "Wish" },
  { src: "/showcase/www.target.com.jpg", alt: "Target" },
]

const Case = props => <Img src={props.src} alt={props.alt} />

const Img = styled.img`
  width: 360px;
`

function Wrapper(props) {
  const cases = props.cases.map(c => <Case src={c.src} alt={c.alt} />)
  return <div>{cases}</div>
}

const Show = styled(Wrapper)`
  display: flex;
`
