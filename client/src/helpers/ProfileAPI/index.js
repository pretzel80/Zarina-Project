import axios from 'axios';
export const fetchUserData = (token, setUser, setFetchedOrders) => dispatch => {
  axios
    .get(`${process.env.REACT_APP_HOST}/customers/customer`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
    .then(loggedInCustomer => {
      axios
        .get(`${process.env.REACT_APP_HOST}/orders`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then(res => {
          dispatch(setFetchedOrders(res.data));
          dispatch(setUser(loggedInCustomer.data));
        });
    });
};
export const cancelOrder =
  (token, id, letterSubject, subscriberMail) => dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `${token}`);
    myHeaders.append('Content-Type', 'application/json');
    const parameters = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify({
        subscriberMail,
        letterSubject,
        letterHtml: '<h1></h1>',
      }),
    };

    fetch(`${process.env.REACT_APP_HOST}/orders/cancel/${id}`, parameters).then(
      res => {
        console.log(res);
        // dispatch(setFetchedOrders(res.data));
        // dispatch(setUser(loggedInCustomer.data));
      },
    );
  };
