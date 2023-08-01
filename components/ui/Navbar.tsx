import { FC, useContext } from "react"
import {AppBar, Toolbar, Typography, IconButton} from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from "@/context/ui";
import NextLink from "next/link";


export const Navbar: FC = () => {

  const {openSideMenu} = useContext(UIContext)


  return (
    <AppBar position="sticky">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={openSideMenu}
            >
                <MenuOutlinedIcon />
            </IconButton>
            <NextLink href="/" passHref>
                <Typography variant="h6" color="white">OpenJira</Typography>
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}
