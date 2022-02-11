import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: 'white',
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)',
    }}>
    {text}
  </div>
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 50.44219802323213,
      lng: 30.52025648607762,
    },
    zoom: 15,
  };

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyA0KBFxH8S8v1bHjD38azPx3KCMoZDI3x8' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}>
        <AnyReactComponent
          lat={50.44219802323213}
          lng={30.52025648607762}
          text={'Center'}
        />
      </GoogleMapReact>
    );
  }
}

export default SimpleMap;
