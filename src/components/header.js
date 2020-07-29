import React from "react"
import styled from "styled-components"

export default function Header(props) {
  return <Wrapper>{props.headerText}</Wrapper>
}

const Wrapper = styled.h1`
  font-size: 1.8em;
  margin: 0 0 1.2em;
`
