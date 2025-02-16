import React from "react";
import { Drawer, List, ListItem, ListItemIcon } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';


const SideBar = ({openSideBar}) => {
    return (
        <>
            <Drawer
                anchor="left" 
                open={openSideBar}
                ModalProps={{
                keepMounted: true,
                }}
                sx={{
                position: "absolute",
                top: "64px",
                width: 90,
                flexShrink: 0,
                zIndex: -10,
                '& .MuiDrawer-paper': {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 90,
                    padding: 2,
                    boxSizing: 'border-box',
                    // zIndex: 100,
                },
                '& .MuiBackdrop-root': {
                    backgroundColor: 'transparent', 
                    zIndex: -1, 
                },
                }}
            >
                <List>
                <ListItem button>
                    <ListItemIcon>
                    <DashboardIcon />
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                    <FileUploadIcon />
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                    <ViewInArIcon />
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                    <OpenInFullIcon />
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                    <WindowOutlinedIcon />
                    </ListItemIcon>
                </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default SideBar;
