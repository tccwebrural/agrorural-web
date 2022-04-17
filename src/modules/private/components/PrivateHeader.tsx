import React, { Fragment, ReactElement } from "react";
import {
  Box,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { APP_TITLE, ROOT_THEME } from "../../../constants";
import { PRIVATE_ROUTES } from "../routes/PrivateRoutes";
import { useAuth } from "../../../providers/AuthProvider";

const Header = (props: any): ReactElement => {
  const auth = useAuth();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: ROOT_THEME.palette.primary.main,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* MOBILE */}
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              {APP_TITLE}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {PRIVATE_ROUTES.filter((page) => page.showHeaderBtn).map(
                  (page) => (
                    <Link
                      key={page.key}
                      component={NavLink}
                      to={`private/${page.path}`}
                      color="black"
                      underline="none"
                      variant="button"
                    >
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page.title}</Typography>
                      </MenuItem>
                    </Link>
                  )
                )}
              </Menu>
            </Box>
            {/* WEB */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              {APP_TITLE}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginLeft: "1rem",
                }}
              >
                {PRIVATE_ROUTES.filter((page) => page.showHeaderBtn).map(
                  (page) => (
                    <Link
                      key={page.key}
                      component={NavLink}
                      to={`private/${page.path}`}
                      color="black"
                      underline="none"
                      variant="button"
                      sx={{ fontSize: "large", marginLeft: "2rem" }}
                    >
                      {page.title}
                    </Link>
                  )
                )}
              </Box>
              {auth.user ? (
                <Fragment>
                  <Link
                    key="my-profile"
                    component={NavLink}
                    to="private/my-profile"
                  >
                    Meu perfil ({auth.user.email})
                  </Link>
                  <Button onClick={() => auth.logout()}>Sair</Button>
                </Fragment>
              ) : (
                <Link key="sign-in" component={NavLink} to="/sign-in">
                  Entrar
                </Link>
              )}
            </Box>
          </Toolbar>
        </Container>
      </Box>
    </>
  );
};

export default Header;
