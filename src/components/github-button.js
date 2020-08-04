import React from "react"
import styled from "styled-components"
import GitHubMark from "../../static/GitHub-Mark-64px.png"

export default function GitHubButton(props) {
  return <Wrapper />
}

const repoURL = "https://github.com/schjoq/gh-pages-src/tree/master/src/pages/"

const Wrapper = styled(props => (
  <a
    className={props.className}
    target="_blank"
    rel="noreferrer"
    title="View page source"
    href={repoURL + (document.URL.split("/").pop() || "index.js")}
  >
    <img src={GitHubMark} alt="GitHub Logo" />
  </a>
))`
  position: absolute;
  top: -13px;
  right: 0;
  transition: 300ms top ease-out;

  &:hover {
    top: -5px;
    transition-duration: 300ms;
  }

  img {
    height: 48px;
    padding: 6px;
    rotate: 180deg;
  }
`
