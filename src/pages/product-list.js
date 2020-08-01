import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

export default function ProductListPage() {
  return (
    <Layout titleText="Product list">
      <ul>
        Todo
        <li>Remove the outlines</li>
        <li>Add dots after "Price"</li>
      </ul>
      <ProductList productItems={productItems} />
    </Layout>
  )
}

const imgDir = "/labour-and-wait/"

const ProductList = styled(ProductListWrapper)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  max-width: 800px;
  letter-spacing: 3px;
  margin: 0px 0 25px;
  outline: 1px dashed maroon;
  --gutter: 5.5%;

  li {
    display: flex;
    flex-direction: column;
    width: calc((100% - var(--gutter) * 2) / 3);
    outline: 1px solid sienna;
    margin-bottom: 28px;
  }

  div {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  img,
  .name,
  .add {
    cursor: pointer;
  }

  img {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }

  .name,
  .price,
  .add {
    display: block;
  }

  .name {
    font-size: 13px;
    font-weight: bold;
    font-height: 1.6em;
    line-height: 1.2em;
    text-transform: uppercase;
    margin: 0 32px 1.2em 0;
  }

  .price {
    font-size: 11px;
    color: red;
    text-align: right;
  }

  .price::before {
    content: "Price";
    position: absolute;
    left: 0;
    color: initial;
  }

  .add {
    position: absolute;
    top: -1px;
    right: 0;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-image: url(${imgDir + "add.svg"});
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #bb021e;
  }
`

function ProductListWrapper(props) {
  const productItems = props.productItems.map(item => (
    <ProductListItem key={item.name} {...item} />
  ))
  return <ul className={props.className}>{productItems}</ul>
}

const ProductListItem = props => (
  <li>
    <img src={imgDir + props.img} alt={"Photo of " + props.name} />
    <div>
      <span className="name">{props.name}</span>
      <span className="price">{"£" + parseFloat(props.price).toFixed(2)}</span>
      {props.inStock ? <span className="add"></span> : null}
    </div>
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
    name: "Japanese apron",
    price: 40,
    img: "japanese_apron.webp",
    inStock: 1,
  },
  {
    name: "Japanese kettle",
    price: 110,
    img: "japanese_kettle.webp",
    inStock: 1,
  },
  {
    name: "Japanese pot stand",
    price: 16,
    img: "japanese_pot_stand.webp",
    inStock: 1,
  },
  {
    name: "Marbled enamel bowl burgundy",
    price: 9,
    img: "marbled_enamel_bowl_burgundy.webp",
    inStock: 1,
  },
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
    name: "Re-engineered brown betty teapot",
    price: 38,
    img: "re-engineered_brown_betty_teapot.webp",
    inStock: 1,
  },
  {
    name: "Wall clock",
    price: 75,
    img: "wall_clock.webp",
    inStock: 0,
  },
]
