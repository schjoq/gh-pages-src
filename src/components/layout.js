import React from "react"
import "normalize.css"
import BaseLayout from "./base-layout"
import PageTitle from "../components/page-title"

export default function Layout(props) {
  return (
    <BaseLayout {...props}>
      <PageTitle titleText={props.titleText} />
      {props.children}
    </BaseLayout>
  )
}
