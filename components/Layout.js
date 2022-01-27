import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Link,
  CssBaseline,
} from "@mui/material"
import Head from "next/head"
import React from "react"
import useStyles from "../utils/styles"
import NextLink from "next/link"
import { ThemeProvider } from "@mui/styles"
import { createTheme } from "@mui/material/styles"

const Layout = ({ title, description, children }) => {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  })
  const classes = useStyles()
  return (
    <div>
      <Head>
        <title>{title ? `${title} - NextJs Amazona` : "NextJs Amazona"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>CocoZona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <NextLink href="/cart" passHref>
                <Link>Cart</Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All rights reserved</Typography>
      </footer>
    </div>
  )
}

export default Layout
