import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function ProductListPage() {
  return (
    <Layout titleText="Product list">
      <ProductList productItems={productItems} />
    </Layout>
  )
}

const ProductList = styled(ProductListWrapper)`
  display: flex;
  flex-wrap: wrap;

  li {
    display: inline-block;
    width: 300px;
    height: 300px;
  }

  img {
    width: 200px;
  }
`

function ProductListWrapper(props) {
  const productItems = props.productItems.map(item => (
    <ProductListItem key={item.name} {...item} />
  ))
  return <ul className={props.className}>{productItems}</ul>
}

const imgDir = "/labour-and-wait/"

const ProductListItem = props => (
  <li>
    <span>{props.name}</span>
    <span>{props.price}</span>
    <img src={imgDir + props.img} alt={"Photo of " + props.name} />
    <span>{props.inStock ? "In Stock" : "Out of Stock"}</span>
  </li>
)

const productItems = [
  {
    name: "Enamel ladle set",
    price: 15,
    img: "white_ennamel_ladle_set.webp",
    inStock: 1,
  },
  {
    name: "Enamel utensil jar",
    price: 34,
    img: "enamel_utensil_jar.webp",
    inStock: 1,
  },
  {
    name: "Japanese pot stand",
    price: 16,
    img: "japanese_pot_stand.webp",
    inStock: 1,
  },
  { name: "Wall clock", price: 75, img: "wall_clock.webp", inStock: 0 },
  {
    name: "Marbled enamel mug burgundy",
    price: 9,
    img: "marbled_enamel_mug_burgundy.webp",
    inStock: 1,
  },
  {
    name: "Marbled enamel plate burgundy",
    price: 12,
    img: "marbled_enamel_plate_burgundy.webp",
    inStock: 0,
  },
  {
    name: "Marbled enamel bowl burgundy",
    price: 9,
    img: "marbled_enamel_bowl_burgundy.webp",
    inStock: 1,
  },
  { name: "Japanese apron", price: 40, img: "japanese_apron.webp", inStock: 1 },
  {
    name: "Re-engineered brown betty teapot",
    price: 38,
    img: "re-engineered_brown_betty_teapot.webp",
    inStock: 1,
  },
  {
    name: "Japanese kettle",
    price: 110,
    img: "japanese_kettle.webp",
    inStock: 1,
  },
]
