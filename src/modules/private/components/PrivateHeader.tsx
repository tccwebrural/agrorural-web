import MenuIcon from "@mui/icons-material/Menu";
import {
  Badge,
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
import { useNotification } from "providers/NotificationProvider";
import React, { ReactElement, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logoPequena from "../../../assets/logoPequena.png";
import { useAuth } from "../../../providers/AuthProvider";
import { PRIVATE_ROUTES } from "../routes/PrivateRoutes";
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

  const notifyProvider = useNotification();

  useEffect(() => {
    notifyProvider.getNotification().then((_) => {});
  }, []);

  return (
    <>
      <Box id="headerMin">
        <div id="logoPequena-header">
          <img src={logoPequena} alt="Erro..." />
        </div>
      </Box>
      <Box id="header">
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div id="logoPequena-header">
              <img src={logoPequena} alt="Erro..." />
            </div>
          </Box>

          <Toolbar>
            {/* MOBILE */}

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

            <Box>
              {PRIVATE_ROUTES.filter((page) => page.showHeaderBtn).map(
                (page) => (
                  <Link
                    id="linkHeader"
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

              <Link
                id="linkHeader"
                key="Notify Vaccine"
                component={NavLink}
                to="cattle/NotifyVaccine"
                color="black"
                underline="none"
                variant="button"
                sx={{ fontSize: "large", marginLeft: "2rem" }}
              >
                <Badge
                  badgeContent={notifyProvider.getQtyNotification()}
                  color="error"
                  max={99}
                >
                  Notificações
                </Badge>
              </Link>
            </Box>
          </Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button sx={{ color: " black" }} onClick={() => auth.logout()}>
              Sair
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default Header;
/**
 *  <Fragment>
                  <Link
                    key="my-profile"
                    component={NavLink}
                    to="private/my-profile"
                  >
                    Meu perfil {userEmail}
                  </Link>
                  <Button onClick={() => auth.logout()}>Sair</Button>
                </Fragment>
 */
