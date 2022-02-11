import axios from 'axios';

const getData = url => {
  return axios.get(url).then(response => {
    const allPersons = response.data.result;
    console.log(allPersons);
  });
};

export default getData;
