import * as React from "react";
import { useMediaQuery } from "@material-ui/core";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  DeleteButton,
  DateInput,
  SimpleList,
} from "react-admin";
import MyUrlField from "./MyUrlField";

const SlideTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const SlideList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          tertiaryText={(record) => record.description}
        />
      ) : (
        <Datagrid>
          <TextField source="title" />
          <TextField source="description" />
          <MyUrlField source="imageUrl" />
          <EditButton basePath="/slides" />
          <DeleteButton basePath="/slides" />
        </Datagrid>
      )}
    </List>
  );
};

export const SlideEdit = (props) => (
  <Edit title={<SlideTitle />} {...props}>
    <SimpleForm>
      <TextInput source="customId" disabled/>
      <TextInput source="title" />
      <TextInput source="imageUrl" />
      <TextInput source="description" multiline />
      <TextInput source="htmlContent" />
      <DateInput source="date" />
    </SimpleForm>
  </Edit>
);

export const SlideCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="customId" disabled/>
      <TextInput source="title" />
      <TextInput source="imageUrl" />
      <TextInput source="description" multiline />
      <TextInput source="htmlContent" />
      <DateInput source="date" />
    </SimpleForm>
  </Create>
);
