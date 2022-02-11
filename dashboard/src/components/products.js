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
  BooleanInput
} from "react-admin";
import MyUrlField from "./MyUrlField";

const ProductTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

const productFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <BooleanInput source="is_enabled" />,
  <ReferenceInput
    source="material"
    label="Material"
    reference="products"
    allowEmpty
  >
    <SelectInput optionText="material" />
  </ReferenceInput>,
  <ReferenceInput
    source="categories"
    label="Categories"
    reference="products"
    allowEmpty
  >
    <SelectInput optionText="categories" />
  </ReferenceInput>,
];

export const ProductList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List {...props} filters={productFilters} filter={{ is_enabled: true }}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          tertiaryText={(record) => record.currentPrice}
        />
      ) : (
        <Datagrid>
          {/* <TextField source="id" /> */}
          {/* <TextField source="itemNo" /> */}
          <TextField source="name" />
          <TextField source="currentPrice" />
          {/* <TextField source="previousPrice" /> */}
          <TextField source="categories" />
          <TextField source="quantity" />
          <TextField source="enabled" />
          {/* <TextField source="color" /> */}
          {/* <TextField source="sizes" /> */}
          {/* <TextField source="productUrl" /> */}
          <TextField source="brand" />
          {/* <TextField source="manufacturer" /> */}
          {/* <TextField source="manufacturerCountry" /> */}
          {/* <TextField source="seller" /> */}
          {/* <DateField source="date" /> */}
          {/* <TextField source="description" /> */}
          <TextField source="collections" />
          <TextField source="material" />
          <MyUrlField source="imageUrls" />
          <EditButton basePath="/products" />
          <DeleteButton basePath="/products" />
        </Datagrid>
      )}
    </List>
  );
};

export const ProductEdit = (props) => (
  <Edit title={<ProductTitle />} {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="itemNo" disabled />
      <TextInput source="enabled" />
      <TextInput source="name" />
      <TextInput source="currentPrice" />
      <TextInput source="previousPrice" />
      <TextInput source="categories" />
      <TextInput source="imageUrls" />
      <TextInput source="quantity" />
      <TextInput source="color" />
      <TextInput source="sizes" />
      <TextInput source="productUrl" />
      <TextInput source="brand" />
      <TextInput source="manufacturer" />
      <TextInput source="manufacturerCountry" />
      <TextInput source="seller" />
      <DateInput source="date" />
      <TextInput source="description" multiline />
      <TextInput source="collections" />
      <TextInput source="material" />
    </SimpleForm>
  </Edit>
);

export const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="enabled" />
      <TextInput source="name" />
      <TextInput source="currentPrice" />
      <TextInput source="previousPrice" />
      <TextInput source="categories" />
      <TextInput source="imageUrls" />
      <TextInput source="quantity" />
      <TextInput source="color" />
      <TextInput source="sizes" />
      <TextInput source="productUrl" />
      <TextInput source="brand" />
      <TextInput source="manufacturer" />
      <TextInput source="manufacturerCountry" />
      <TextInput source="seller" />
      <DateInput source="date" />
      <TextInput source="description" multiline />
      <TextInput source="collections" />
      <TextInput source="material" />
    </SimpleForm>
  </Create>
);
