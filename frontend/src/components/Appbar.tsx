import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";

const UserProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleMyBlog = () => {
    navigate("/blog/myblog");
  };

  return (
    <div>
      <div onClick={handleClick}>
        <svg className="w-10 h-10 mt-1 cursor-pointer text-gray-200 dark:text-gray-700 me-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
      </div>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleMyBlog}>
          <Typography variant="body1">My Blog</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserProfileMenu;

export const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-between px-96 py-10">
        <div className="font-bold text-xl">Medium</div>
        <div className="flex flex-col justify-center text-center">
          <div className="flex justify-center text-center">
            <div
              onClick={() => {
                navigate("/blogs");
              }}
              className="pt-3 pr-4 mr-6 cursor-pointer"
            >
              blogs
            </div>
            <div
              onClick={() => {
                navigate("/blog/create");
              }}
              className="pt-2 pr-4 mr-6 cursor-pointer">
              <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-7 rounded-full">
                Post
              </button>
            </div>
            <div>
              <UserProfileMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
