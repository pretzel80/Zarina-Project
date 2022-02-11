import * as React from "react";
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
  DateField,
  DateInput,
} from "react-admin";

const CartTitle = ({ record }) => {
  return <span>Cart {record ? `"${record.title}"` : ""}</span>;
};

const cartFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="id" label="User" reference="users" allowEmpty>
    <SelectInput optionText="name" />
  </ReferenceInput>,
];

export const CartList = (props) => {
  return (
    <List {...props} filters={cartFilters}>
      <Datagrid>
        {/* <TextField source="id" /> */}
        <TextField source="customerId.firstName" />
        <TextField source="customerId.lastName" />
        <TextField source="customerId.telephone" />
        <TextField source="products" />
        <DateField source="date" />
        <EditButton basePath="/cart" />
        <DeleteButton basePath="/cart" />
      </Datagrid>
    </List>
  );
};

export const CartEdit = (props) => (
  <Edit title={<CartTitle />} {...props}>
    <SimpleForm>
      <TextInput source="id" disabled/>
      <TextInput source="customerId" />
      <TextInput source="products" />
      <DateInput source="date" />
    </SimpleForm>
  </Edit>
);

export const CartCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="customerId" />
      <TextInput source="products" />
      <DateInput source="date" />
    </SimpleForm>
  </Create>
);
