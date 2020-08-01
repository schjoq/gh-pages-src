import React from "react"
import "normalize.css"
import BaseLayout from "./base-layout"
import PageTitle from "../components/page-title"
import styled from "styled-components"

export default function Layout(props) {
  return (
    <LayoutWrapper {...props}>
      <PageTitle titleText={props.titleText} />
      {props.children}
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled(BaseLayout)`
  header a[href="/"]:hover {
    text-decoration-line: underline;
  }
`
