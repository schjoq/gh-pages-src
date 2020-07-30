import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import "normalize.css"
import { Helmet } from "react-helmet"

export default function BaseLayout(props) {
  return (
    <Wrapper>
      <Helmet>
        <title>{props.titleText || "Demos"}</title>
      </Helmet>
      <Header>
        <StyledLink to="/">Home</StyledLink>
      </Header>
      <main>{props.children}</main>
    </Wrapper>
  )
}

const Header = styled.header`
  margin-bottom: 1.6em;
`

const Wrapper = styled.div`
  font-family: Helvetica, Roboto, Arial, sans-serif;
  font-size: 17px;
  color: #333;
  margin: 0 auto;
  max-width: 960px;

  p {
    margin: 0 0 1em;
    line-height: 1.6em;
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
