import Head from "next/head"
import Image from "next/image"
import Layout from "../components/Layout"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </Layout>
  )
}
