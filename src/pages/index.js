import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"

export default function Home() {
  return (
    <Layout>
      <StyledPageListItem to="/" title="Casa" />
      <PageList pages={pages} />
    </Layout>
  )
}

const pages = [
  { to: "scrolling-logos", title: "Scrolling Logos" },
  { to: "showcase", title: "Showcase" },
]

function PageListItem(props) {
  return (
    <li id={props.to}>
      <Link to={props.to}>{props.title}</Link>
    </li>
  )
}

const StyledPageListItem = styled(PageListItem)`
  color: aqua;
  font-size: 40px;
`

const PageList = styled(props => (
  <ul>
    {props.pages.map(page => (
      <StyledPageListItem {...page} />
    ))}
  </ul>
))`
  font-size: 80px;
`

/* function PageList(props) {
 *   const pages = props.pages.map(page => (
 *     <li id={page.to}>
 *       <Link to={page.to}>{page.title}</Link>
 *     </li>
 *   ))
 *   return <ul>{pages}</ul>
 * } */
