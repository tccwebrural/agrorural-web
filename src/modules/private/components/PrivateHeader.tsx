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
import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { APP_TITLE, ROOT_THEME } from "../../../constants";
import { useAuth } from "../../../providers/AuthProvider";
import { PRIVATE_ROUTES } from "../routes/PrivateRoutes";
import logoPequena from "../../../assets/logoPequena.png";
import "../styles/PrivateHeader.css";
import MailIcon from "@mui/icons-material/Mail";
import { useNotification } from "providers/NotificationProvider";
import { trackPromise } from "react-promise-tracker";

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

    const [notifications, setNotifications] = useState<any[]>([]);
    const notifyProvider = useNotification();
    var [contador, setContador] =useState(0);

    useEffect(() => {
       trackPromise(
      notifyProvider.getNotification().then((notify) => {
        setNotifications(notify);
          for(contador=0; contador <= notify.length; contador++){
            setContador(contador)
          }
        })
       )
    }, []);
    
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

                <Badge badgeContent={contador} color="error" max={99}>
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
