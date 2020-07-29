import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import "normalize.css"
import BaseLayout from "./base-layout"
import { Helmet } from "react-helmet"
import Header from "../components/header"

export default function Layout(props) {
  return (
    <>
      <Helmet>
        <title>{props.pageTitle || "Demos"}</title>
      </Helmet>

      <BaseLayout>
        <Header headerText={props.pageTitle} />
        {props.children}
      </BaseLayout>
    </>
  )
}
