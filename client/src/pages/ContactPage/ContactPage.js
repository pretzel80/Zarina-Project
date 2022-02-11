import React from 'react';
import './ContactPage.scss';

import Inputs from '../../components/Inputs/Inputs';
// import Input from './components/Inputs/Input.js'
import Description from '../../components/Description/Description';
import Map from '../../components/GoogleMap/Map';

function ContactPage() {
  return (
    <div>
      <div>{/*Header*/}</div>
      <div className="App">
        <div className="sect1 width">
          <Description />
        </div>
        <div className="sect2 width">
          <Inputs />
        </div>
        <div class="break"></div>
        <div className="sect3 width">
          <Map />
        </div>
      </div>
      <div>{/*Footer*/}</div>
    </div>
  );
}

export default ContactPage;
