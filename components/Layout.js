import { AppBar, Typography, Toolbar, Container } from "@mui/material"
import Head from "next/head"
import React from "react"

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>NextJs Amazona</title>
      </Head>
      <AppBar position="static">
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
