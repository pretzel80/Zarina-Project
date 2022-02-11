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
  ReferenceInput,
  SelectInput,
  TextInput,
  DeleteButton,
  DateInput,
  SimpleList,
} from "react-admin";

const FilterTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

const filterFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput
    source="type"
    label="type"
    reference="filters"
    allowEmpty
  >
    <SelectInput optionText="type" />
  </ReferenceInput>,
];

export const FilterList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List {...props} filters={filterFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          tertiaryText={(record) => record.type}
        />
      ) : (
        <Datagrid>
          {/* <TextField source="id" /> */}
          <TextField source="name" />
          <TextField source="type" />
          <EditButton basePath="/filters" />
          <DeleteButton basePath="/filters" />
        </Datagrid>
      )}
    </List>
  );
};

export const FilterEdit = (props) => (
  <Edit title={<FilterTitle />} {...props}>
    <SimpleForm>
      <TextInput source="id" disabled/>
      <TextInput source="name" />
      <TextInput source="type" />
      <DateInput source="date" />
    </SimpleForm>
  </Edit>
);

export const FilterCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" disabled/>
      <TextInput source="name" />
      <TextInput source="type" />
      <DateInput source="date" />
    </SimpleForm>
  </Create>
);
