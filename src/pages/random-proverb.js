import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function RandomProverbPage() {
  return (
    <Layout titleText="Random proverb">
      <p>Add transition. Style the button.</p>
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
  return proverbs[Math.round(Math.random() * proverbs.length)]
}

class RandomProverb extends React.Component {
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
      <div>
        <Proverb {...this.state.proverb} />
        <Button onClick={this.handleClick} />
      </div>
    )
  }
}

const Proverb = ({ text, author }) => (
  <blockquote>
    <p>{text}</p>
    <footer>{author}</footer>
  </blockquote>
)

function Button(props) {
  return <button {...props}>Get a new one</button>
}
