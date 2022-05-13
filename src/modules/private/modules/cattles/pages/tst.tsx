import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Coronavirus from "@mui/icons-material/Coronavirus";

import { alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect } from "react";
import { VacineModel } from "../../vacine/models/VacineModel";
import { CattleHelper } from "../helpers/CattleHelper";
import { VacineHelper } from "../../vacine/helpers/VacineHelpers";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { useNavigate, useParams } from "react-router-dom";
import { CattleModel } from "../models/CattleModel";
import toast from "react-hot-toast";

export function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem>
      </Menu>
    </div>
  );
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [initialValues, setInitialValues] = useState<CattleModel>({
    identifier: 0,
    weigth: 0,
    name: "",
    type: 1,
    birthday: "",
    sex: 1,
    qtyChildren: 0,
  });
  const [vacines, setVacines] = useState<VacineModel[]>([]);
  const [vacinesInput, setVacinesInput] = useState<VacineModel>();
  const cattleHelper = CattleHelper();
  const vacineHelper = VacineHelper();
  const loadingHelper = useGlobalLoading();
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("id da pag" + id);

  const getAllVacines = () => {
    if (id) {
      vacineHelper.getAllVacines(id).then(setVacines);
    }
  };

  const getCattle = () => {
    loadingHelper.startLoading();
    if (id) {
      cattleHelper.getCattleById(id).then((cattle?: CattleModel) => {
        if (cattle) {
          setInitialValues(cattle);
        } else {
          //TODO: Volta para listagem
          toast.error("VACA NAO ENCONTRADA");
        }
        loadingHelper.stopLoading();
      });
    } else {
      //TODO: Volta para listagem
      loadingHelper.stopLoading();
    }
  };
  useEffect(() => {
    getAllVacines();
    getCattle();
  }, []);
  return (
    <>
      {vacines.map((vacine) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                <Coronavirus />
              </Avatar>
            }
            action={<CustomizedMenus />}
          />

          <CardMedia>
            <Coronavirus />
          </CardMedia>

          <CardContent>
            <h3>Nome da vacina</h3>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <EditIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Vacina Titulo: </Typography>
              <Typography paragraph>Informações aleatórias</Typography>
              <Typography paragraph>Lorem num sei das quantas</Typography>
              <Typography paragraph>Mais lorem</Typography>
              <Typography>Esqueci do lorem</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </>
  );
}
