import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import "normalize.css"

export default function BaseLayout({ children }) {
  return (
    <Wrapper>
      <header>
        <StyledLink to="/">Home</StyledLink>
      </header>
      <main>{children}</main>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-family: Helvetica, Roboto, Arial, sans-serif;
  font-size: 17px;
  color: #333;
  margin: 0 auto;
  max-width: 960px;
`

const StyledLink = styled(props => <Link {...props} />)`
  text-decoration: none;
  color: inherit;
  font-size: 1.2em;
  display: inline-block;
  font-weight: bold;
  margin: 0.6em 0 1.5em;
`
