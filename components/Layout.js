import { AppBar, Typography, Toolbar, Container } from "@mui/material"
import Head from "next/head"
import React from "react"
import useStyles from "../utils/styles"

const Layout = ({ children }) => {
  const classes = useStyles()
  return (
    <div>
      <Head>
        <title>NextJs Amazona</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>CocoZona</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>
        <Typography>All rights reserved</Typography>
      </footer>
    </div>
  )
}

export default Layout
