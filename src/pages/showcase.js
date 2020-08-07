import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function ShowcasePage() {
  return (
    <Layout titleText="Showcase">
      <p>
        Trying to recreate what I saw on{" "}
        <a href="https://styled-components.com/">styled-components.com</a>.
      </p>
      <Show cases={cases} />
    </Layout>
  )
}

const cases = [
  {
    src: "/showcase/airbnb.design-cereal.jpg",
    alt: "Airbnb",
    labelText: "Airbnb",
  },
  { src: "/showcase/imdb.com.jpg", alt: "IMDb", labelText: "IMDb" },
  { src: "/showcase/spotify.com.jpg", alt: "Spotify", labelText: "Spotify" },
  { src: "/showcase/wish.com.jpg", alt: "Wish", labelText: "Wish" },
  { src: "/showcase/www.target.com.jpg", alt: "Target", labelText: "Target" },
]

const Case = styled(props => (
  <div className={props.className}>
    <img src={props.src} alt={props.alt} />
    <span>{props.labelText}</span>
  </div>
))`
  width: 360px;

  img {
    width: 100%;
  }
`

function Wrapper(props) {
  const cases = props.cases.map(c => (
    <Case key={c.src} src={c.src} alt={c.alt} labelText={c.labelText} />
  ))
  return <div className={props.className}>{cases}</div>
}

const Show = styled(Wrapper)`
  display: flex;
  height: 300px;
  align-items: center;
  position: absolute;
  left: 2vw;
  width: 96vw;
  --img-scale-level-1: 1.6;
  --img-scale-level-2: 1.3;
  --img-scale-level-3: 1;

  span {
    position: absolute;
    color: #333;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 10px 20px, rgba(0, 0, 0, 0.1) 0px 5px 12px;
    bottom: 0;
    font-weight: bold;
    background-color: white;
    padding: 6px 12px;
    opacity: 0;
    transition: 240ms opacity ease-in-out;
  }

  ${Case}:hover span {
    opacity: 1;
  }

  img {
    border-radius: 8px;
  }

  ${Case} {
    cursor: pointer;
    transition: 240ms scale ease-in-out;
  }

  ${Case}:nth-child(3) {
    scale: var(--img-scale-level-1);
    z-index: 3;
  }

  ${Case}:nth-child(3):hover {
    scale: calc(1.1 * var(--img-scale-level-1));
  }

  ${Case}:nth-child(2),
  ${Case}:nth-child(4) {
    scale: var(--img-scale-level-2);
    z-index: 2;
  }

  ${Case}:nth-child(2):hover,
  ${Case}:nth-child(4):hover {
    scale: calc(1.1 * var(--img-scale-level-2));
  }

  ${Case}:nth-child(1),
  ${Case}:nth-child(5) {
    scale: var(--img-scale-level-3);
    z-index: 1;
  }

  ${Case}:nth-child(1):hover,
  ${Case}:nth-child(5):hover {
    scale: calc(1.08 * var(--img-scale-level-3));
  }

  ${Case}:nth-child(3) span {
    left: 50%;
    translate: -50% 50%;
  }

  ${Case}:nth-child(1) span,
  ${Case}:nth-child(2) span {
    left: 0;
    translate: 0 50%;
  }

  ${Case}:nth-child(4) span,
  ${Case}:nth-child(5) span {
    right: 0;
    translate: 0 50%;
  }
`
