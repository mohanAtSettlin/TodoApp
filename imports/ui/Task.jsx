import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  Divider,
  FormControlLabel,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

export const Task = ({ task, onCheckboxClick ,onDeleteClick }) => {
  return (
    <>
    <ListItem sx={{backgroundColor:"black" ,mt:"10px"}}
      secondaryAction={
        <IconButton edge="end" color="error" aria-label="delete" onClick={()=>{
          onDeleteClick(task._id)
        }}>
          <DeleteIcon  />
        </IconButton>
      }
      >
      <ListItemAvatar>
        <FormControlLabel
          control={
            <Checkbox
            checked={!!task.isChecked}
            onClick={() => onCheckboxClick(task)}
            readOnly
            />
          }
          />
      </ListItemAvatar>
      <ListItemText primary={task.text} sx={{textDecorationLine: task.isChecked && 'line-through',color: task.isChecked &&'red' }} />
    </ListItem>
     <Divider />
     </>
  );
};
