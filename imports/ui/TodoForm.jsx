import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {  useFormik } from "formik";
import * as yup from "yup";
import { TasksCollection } from '/imports/api/TasksCollection';
import {Meteor} from 'meteor/meteor'

const validationSchema = yup.object({
  task: yup
    .string("Add a task")
    .trim("Cannot be Empty")
    .max(20)
    .required("Cannot be Empty"),
});
export const TodoForm = () => {
  const formik = useFormik({
    initialValues: {
      task: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value) => {
      Meteor.call('tasks.insert', value.task);
      formik.resetForm()
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}> 
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <TextField
          required
          id="task"
          type="task"
          value={formik.values.task}
          onChange={formik.handleChange}
          error={formik.touched.task && Boolean(formik.errors.task)}
          helperText={formik.touched.task && formik.errors.task}
          label="Add Task"
          name="task"
          autoComplete="task"
        />
        <Button variant="contained" color="primary" size="large" type="submit" startIcon={<AddIcon size="large" />}>
          Add
        </Button>
      </Stack>
    </form>
  );
};
