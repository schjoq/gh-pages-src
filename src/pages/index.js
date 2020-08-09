import React from "react"
import { Link } from "gatsby"
import BaseLayout from "../components/base-layout"
import styled from "styled-components"

export default function Home() {
  return (
    <BaseLayout>
      <PageList pages={pages} />
    </BaseLayout>
  )
}

const pages = [
  { to: "scrolling-logos", title: "Scrolling logos" },
  { to: "showcase", title: "Showcase" },
  { to: "sticky-bg", title: "Sticky Backgrounds" },
  { to: "product-list", title: "Product list" },
  { to: "random-proverb", title: "Random proverb" },
  { to: "sliding-temp-converter", title: "Sliding temperature converter" },
  { to: "comparing-2-img", title: "Comparing 2 images" },
]

const PageListItem = styled(props => (
  <li key={props.to} className={props.className}>
    <Link to={props.to}>{props.title}</Link>
  </li>
))`
  a {
    color: inherit;
    font-size: 1.4em;
    text-decoration: none;
    line-height: 1.4em;
    display: block;
    margin-bottom: 0.4em;
  }
  a:hover,
  a:focus {
    color: cornflowerblue;
    text-decoration: solid underline 2px;
  }
`

const PageList = styled(props => (
  <ul className={props.className}>
    {props.pages.map(page => (
      <PageListItem to={props.to} {...page} />
    ))}
  </ul>
))`
  padding: 0;
  margin: 0;
  list-style-type: none;
  max-width: max-content;
`
