import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Task } from "./Task.jsx";


import { Meteor } from "meteor/meteor";

import { styled } from "@mui/material/styles";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button, Chip, List, Stack, Typography } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export const TodoBody = () => {
    const [hideCompleted, setHideCompleted] = useState(false);

    const hideCompletedFilter = { isChecked: { $ne: true } };
   
    
    const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
      const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
   
      const handler = Meteor.subscribe('tasks');
  
      if (!handler.ready()) {
        return { ...noDataAvailable, isLoading: true };
      }
      const tasks = TasksCollection.find(
        hideCompleted ? hideCompletedFilter : {},
        {
          sort: { createdAt: -1 },
        }
      ).fetch();
      const pendingTasksCount = TasksCollection.find(hideCompletedFilter).count();
  
      return { tasks, pendingTasksCount };
    });
  
    const Demo = styled("div")(({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
    }));
    const deleteTask = (_id) => Meteor.call("tasks.remove", _id);
  
    const toggleChecked = ({ _id, isChecked }) => {
      Meteor.call("tasks.setIsChecked", _id, !isChecked);
    };
  
    
    const pendingTasksTitle = `${
      pendingTasksCount ? ` (${pendingTasksCount})` : ""
    }`;
  
    {isLoading && <div className="loading">loading...</div>}
  
  return (
    <>
      <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ textAlign: "center", width: "400px", margin: "auto" }}
        >
          <Typography
            sx={{ mt: 4, mb: 2, textAlign: "center" }}
            variant="h5"
            component="div"
          >
            ToDo List
          </Typography>
          <Button
            variant="outlined"
            color={hideCompleted ? "error" : "success"}
            onClick={() => {
              setHideCompleted(!hideCompleted);
            }}
            startIcon={hideCompleted?  <RemoveRedEyeIcon /> : <VisibilityOffIcon/>}
          >
            {hideCompleted ? "Show All" : "Hide Completed Tasks"}
          </Button>
        </Stack>
        <Demo>
          <List dense={false} sx={{ width: "600px", margin: "auto" }}>
            {tasks.map((task) => (
              <Task
                key={task._id}
                task={task}
                onCheckboxClick={toggleChecked}
                onDeleteClick={deleteTask}
              />
            ))}
          </List>
        </Demo>
        <Typography
          sx={{ width: "600px", margin: "auto", textAlign: "end" }}
          variant="h6"
          component="div"
        >
        <Chip label={ "Pending tasks"+
          pendingTasksTitle} color="primary" />
        
        </Typography>
    </>
  )
}
