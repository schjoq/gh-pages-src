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
  { to: "large-img", title: "Large image" },
  { to: "opening-menu", title: "Opening menu on hover" },
  { to: "product-list", title: "Product list" },
  { to: "random-proverb", title: "Random proverb" },
  { to: "sliding-temp-converter", title: "Sliding temperature converter" },
]

/* const PageListItem = styled(props => (
 *   <li key={props.to} className={props.className}>
 *   <Link to={props.to}>{props.title}</Link>
 *   </li>
 * )) */

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

/* const StyledPageListItem = styled(PageListItem)`
 *   color: aqua;
 *   font-size: 40px;
 * ` */

const PageList = styled(props => (
  <ul className={props.className}>
    {props.pages.map(page => (
      <PageListItem {...page} />
    ))}
  </ul>
))`
  padding: 0;
  margin: 0;
  list-style-type: none;
`
