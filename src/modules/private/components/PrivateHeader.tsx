import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { Fragment, ReactElement, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { APP_TITLE, ROOT_THEME } from "../../../constants";
import { useAuth } from "../../../providers/AuthProvider";
import { PRIVATE_ROUTES } from "../routes/PrivateRoutes";
import logoPequena from "../../../assets/logoPequena.png";
import "../styles/PrivateHeader.css";

const Header = (props: any): ReactElement => {
  const auth = useAuth();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState("");

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    const loadUserData = async () => {
      const user = await auth.getUser();
      if (user) {
        setUserEmail(user.email);
      }
    };
    loadUserData();
  }, [auth.userState]);

  return (
    <>
      <Box id="header">
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div id="logoPequena-header">
            <img src={logoPequena} alt="Erro..." />
          </div>

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
              {}
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
                      to={page.path}
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
                      to={page.path}
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
              <Fragment>
                <Link
                  key="my-profile"
                  component={NavLink}
                  to="private/my-profile"
                >
                  Meu perfil {userEmail}
                </Link>
                <Button onClick={() => auth.logout()}>Sair</Button>
              </Fragment>
            </Box>
          </Toolbar>
        </Container>
      </Box>
    </>
  );
};

export default Header;
