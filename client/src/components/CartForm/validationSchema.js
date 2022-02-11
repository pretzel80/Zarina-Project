import * as yup from 'yup';
const isRequired = 'This field is required';
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email',
    )
    .required(isRequired),
  name: yup
    .string()
    .matches(
      /^[A-Za-z ]*$/,
      'Please enter valid name.Name can only contain Latin letters.',
    )
    .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g, '')
    .required(isRequired)
    .min(2, 'Enter min 2 characters'),
  selfPick: yup.bool(),
  secondName: yup
    .string()
    .matches(
      /^[A-Za-z ]*$/,
      'Please enter valid last name.Last name can only contain Latin letters.',
    )
    .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g, '')
    .required(isRequired)
    .min(2, 'Enter min 2 characters'),
  address: yup.string().when('selfPick', {
    is: false,
    then: yup.string().required(isRequired).min(2, 'Enter min 2 characters'),
  }),
  mobNumber: yup
    .number()
    .typeError('The phone number can only contain numbers!')
    .required(isRequired)
    .min(12, 'Enter min 12 characters of number'),
  deliveryKiev: yup.boolean().when('selfPick', {
    is: false,
    then: yup.boolean(),
  }),
  deliveryUkraine: yup.boolean().when('selfPick', {
    is: false,
    then: yup.boolean(),
  }),
  pickLoc: yup.boolean().when('selfPick', {
    is: true,
    then: yup.boolean(),
  }),
  firstPickAddress: yup.boolean().when('pickLoc', {
    is: true,
    then: yup.boolean(),
  }),
  secondPickAddress: yup.boolean().when('pickLoc', {
    is: true,
    then: yup.boolean(),
  }),
  thirdPickAddress: yup.boolean().when('pickLoc', {
    is: true,
    then: yup.boolean(),
  }),
  cardNumber: yup.string().when('creditCard', {
    is: true,
    then: yup
      .string()
      .matches(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/,
        'Not a valid card number. Example: xxxxxxxxxxxxxxxx',
      )
      .required('Card number is required')
      .min(16, 'Enter min 16 characters of card number'),
  }),
  cardHolder: yup.string().when('creditCard', {
    is: true,
    then: yup.string().required(isRequired).min(2, 'Enter min 2 characters'),
  }),
  cardDate: yup.string().when('creditCard', {
    is: true,
    then: yup
      .string()
      .typeError('Not a valid expiration date. Example: MM/YY')
      .max(5, 'Not a valid expiration date. Example: MM/YY')
      .matches(
        /([0-9]{2})\/([0-9]{2})/,
        'Not a valid expiration date. Example: MM/YY',
      )
      .required('Expiration date is required'),
  }),
  cardCode: yup.number().when('creditCard', {
    is: true,
    then: yup
      .number()
      .required(isRequired)
      .min(3, 'Enter min 3 characters of card number cvv'),
  }),
});

export default schema;
