import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function RandomProverbPage() {
  return (
    <Layout titleText="Random proverb">
      <ul>
        TODO
        <li>Add transition</li>
        <li>Polish the button</li>
      </ul>
      <p>
        Inspired by something similar for Latin proverbs on top of{" "}
        <a href="http://www.wheelockslatin.com/">Wheelock's Latin.com</a>.
      </p>
      <RandomProverb />
    </Layout>
  )
}

const proverbs = [
  {
    text: "Wer fremde Sprachen nicht kennt, weiss nichts von seiner eigenen.",
    author: "Goethe",
  },
  {
    text: "Apprendre une langue, c'est vivre de nouveau.",
    author: "French proverb",
  },
  { text: "Nosce te ipsum.", author: "Greek proverb" },
  { text: "Mens sana in corpore sano.", author: "Juvenal" },
  { text: "Vitia erunt, donec homines.", author: "Tacitus" },
  { text: "Si tardus eris, errabis.", author: "Tibullus" },
  { text: "Dominus dat sapientiam.", author: "Proverbs" },
  {
    text: "Humanum amare est, humanum autem ignoscere est.",
    author: "Plautus",
  },
]

function getRandomProverb() {
  return proverbs[Math.floor(Math.random() * proverbs.length)]
}

class RandomProverbWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      proverb: getRandomProverb(),
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      proverb: getRandomProverb(),
    })
  }

  render() {
    return (
      <div className={this.props.className}>
        <Proverb {...this.state.proverb} />
        <Button onClick={this.handleClick} />
      </div>
    )
  }
}

const RandomProverb = styled(RandomProverbWrapper)`
  padding: 1em 0 1em 2ch;

  blockquote {
    margin: 3em 0 4em;
    max-width: 50ch;
    min-height: 6em;
  }

  footer {
    font-style: italic;
    text-align: right;
    margin-right: 6ch;
  }

  footer::before {
    content: "-";
  }

  button {
    padding: 8px 8px;
    border: 1px solid;
    border-radius: 2px;
    color: #666;
    cursor: pointer;
    background-color: #fff;
  }

  button:hover {
    background-color: #eee;
  }
`

const Proverb = ({ text, author }) => (
  <blockquote>
    <p>{text}</p>
    <footer>{author}</footer>
  </blockquote>
)

function Button(props) {
  return <button {...props}>Get a new one</button>
}
