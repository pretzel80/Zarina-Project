import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  EditButton,
  DeleteButton,
} from 'react-admin';
import MyUrlField from './MyUrlField';

export const CustomerList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="isAdmin" />
      <TextField source="enabled" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="login" />
      <EmailField source="email" />
      <TextField source="password" />
      <TextField source="telephone" />
      <TextField source="gender" />
      <TextField source="avatarUrl" />
      <TextField source="customerNo" />
      <DateField source="date" />
      <EditButton basePath="/customers" />
      <DeleteButton basePath="/customers" />
    </Datagrid>
  </List>
);
