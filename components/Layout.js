import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Link,
  CssBaseline,
  ThemeProvider,
  Switch,
  Badge,
  Button,
} from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Head from "next/head"
import React, { useContext, useState } from "react"
import useStyles from "../utils/styles"
import NextLink from "next/link"
import { createTheme } from "@mui/material/styles"
import { Store } from "../utils/Store"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

const Layout = ({ title, description, children }) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { state, dispatch } = useContext(Store)
  const { darkMode, cart, userInfo } = state
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" })
    const newDarkMode = !darkMode
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF")
  }
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
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  })
  const classes = useStyles()

  const loginClickHandler = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const loginClickCloseHandler = () => {
    setAnchorEl(null)
  }
  const logoutClickHandler = () => {
    setAnchorEl(null)
    dispatch({ type: "USER_LOGOUT" })
    Cookies.remove("userInfo")
    Cookies.remove("cartItems")
    router.push("/")
  }
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
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  {" "}
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(event) => loginClickHandler(event)}
                  >
                    {userInfo.name}
                  </Button>{" "}
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={loginClickCloseHandler}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
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
