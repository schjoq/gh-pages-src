import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import "normalize.css"
import { Helmet } from "react-helmet"
import GitHubButton from "../components/github-button"

export default function BaseLayout(props) {
  return (
    <Wrapper {...props}>
      <Helmet>
        <title>{props.titleText || "Demos"}</title>
      </Helmet>
      <Header>
        <StyledLink to="/">Home</StyledLink>
        <GitHubButton />
      </Header>
      <main>{props.children}</main>
    </Wrapper>
  )
}

const Header = styled.header`
  margin-bottom: 1.6em;
  position: relative;
`

const Wrapper = styled.div`
  font-family: Helvetica, Roboto, Arial, sans-serif;
  font-size: 17px;
  color: #333;
  margin: 0 auto;
  max-width: 760px;

  p {
    margin: 0 0 1em;
    line-height: 1.6em;
  }

  main a {
    color: inherit;
  }

  main a:hover {
    color: cornflowerblue;
  }

  a:hover {
    text-decoration-line: underline;
  }

  header a[href="/"]:hover {
    text-decoration: none;
  }

  a:focus {
    outline: 3px solid cornflowerblue;
    outline-offset: 2px;
  }
`

const StyledLink = styled(props => <Link {...props} />)`
  text-decoration: none;
  color: inherit;
  font-size: 1.2em;
  display: inline-block;
  font-weight: bold;
  line-height: 2em;
`
