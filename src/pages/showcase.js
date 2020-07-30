import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function ShowcasePage() {
  return (
    <Layout titleText="Showcase">
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

const Case = props => <Img {...props} />

const Img = styled.img`
  width: 360px;
`

function Wrapper(props) {
  const cases = props.cases.map(c => (
    <Case key={c.src} src={c.src} alt={c.alt} />
  ))
  return <div className={props.className}>{cases}</div>
}

const Show = styled(Wrapper)`
  display: flex;
`
