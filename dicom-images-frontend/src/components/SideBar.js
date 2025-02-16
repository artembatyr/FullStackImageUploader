import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';


const SideBar = ({openSideBar}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

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
                        boxSizing: 'border-box',
                    },
                    '& .MuiBackdrop-root': {
                        backgroundColor: '#F5F5F5', 
                        zIndex: -1, 
                    },
                }}
            >
                <List>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/"
                        onClick={() => setSelectedIndex(0)}
                        sx={{ backgroundColor: selectedIndex === 0 ? "lightgray" : "transparent", padding: 2, paddingLeft: 3.5 }}
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/upload"
                        onClick={() => setSelectedIndex(1)}
                        sx={{ backgroundColor: selectedIndex === 1 ? "lightgray" : "transparent", padding: 2, paddingLeft: 3.5 }}
                    >
                        <ListItemIcon>
                            <FileUploadIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/demo"
                        onClick={() => setSelectedIndex(2)}
                        sx={{ backgroundColor: selectedIndex === 2 ? "lightgray" : "transparent", padding: 2, paddingLeft: 3.5 }}
                    >
                        <ListItemIcon>
                            <ViewInArIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/view"
                        onClick={() => setSelectedIndex(3)}
                        sx={{ backgroundColor: selectedIndex === 3 ? "lightgray" : "transparent", padding: 2, paddingLeft: 3.5 }}
                    >
                        <ListItemIcon>
                            <OpenInFullIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/demo"
                        onClick={() => setSelectedIndex(4)}
                        sx={{ backgroundColor: selectedIndex === 4 ? "lightgray" : "transparent", padding: 2, paddingLeft: 3.5 }}
                    >
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
