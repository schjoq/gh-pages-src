import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function OpeningMenuPage() {
  return (
    <Layout titleText="Opening Menu on Hover">
      <p>How to align the icons nicely? And make the menu open and close?</p>
      <OpeningMenuList menuTitle="Get" items={items} />
    </Layout>
  )
}

const OpeningMenuItem = styled(props => (
  <li key={props.bgURL} className={props.className}>
    <a href={props.URL}>{props.text}</a>
  </li>
))`
  background-image: url(${props => props.bgURL});
`

/* const OpeningMenuItem = styled(MenuItemWrapper)`
 * `
 *  */
function OpeningMenuListWrapper(props) {
  const items = props.items.map(item => (
    <OpeningMenuItem key={item.bgURL} {...item} />
  ))
  return (
    <div className={props.className}>
      <span>{props.menuTitle}</span>
      <ul>{items}</ul>
    </div>
  )
}

const OpeningMenuList = styled(OpeningMenuListWrapper)`
  color: tomato;
  border: 2px solid #999;
  margin: 0;
  padding: 0.5em 1em;

  ul {
    margin: 1em 0 0;
    padding: 0;
  }

  ul li {
    font-weight: 400;
    list-style: none;
    font-size: 1em;
    width: 20px;
    height: 24px;
    margin: 16px 15px;
    background-size: 24px;
    background-repeat: no-repeat;
    padding-left: 44px;
  }

  a {
    color: #666;
    text-decoration: none;
    font-weight: 300;
  }

  a:hover {
    width: 98px;
  }
`

const items = [
  {
    bgURL: "/browser-logos/edge.png",
    text: "Edge",
    URL: "https://www.microsoft.com/en-us/edge",
  },
  {
    bgURL: "/browser-logos/chrome.png",
    text: "Chrome",
    URL: "https://www.google.com/chrome/",
  },
  {
    bgURL: "/browser-logos/firefox.png",
    text: "Firefox",
    URL: "https://www.mozilla.org/en-US/firefox/",
  },
  {
    bgURL: "/browser-logos/safari.png",
    text: "Safari",
    URL: "https://www.apple.com/safari/",
  },
]
