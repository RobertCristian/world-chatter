import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Map, TileLayer, Marker, Tooltip} from 'react-leaflet'

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 46.7712,
            lng: 23.6236,
            zoom: 5
        }
    }

    render() {
        const defaultMapPosition = [this.state.lat, this.state.lng];
        const {
            currentPos,
            markers,
            mapClickHandler,
            mapMarkerClickHandler
        } = this.props;

        return (
            <div className="map_container">
                <Map center={defaultMapPosition} zoom={this.state.zoom} onClick={mapClickHandler}>
                    <TileLayer url="http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png"/>
                    {markers && markers.map((marker) => {
                        return <Marker color="red" onClick={mapMarkerClickHandler} id={marker.id} key={marker.id}
                                       position={marker.position}>
                            <Tooltip>
                                <span className="d-block mb-2">Chat name: {marker.name}</span>
                                <span
                                    className="d-block mb-2">Lat: {marker.position.lat.toFixed(2)} Lng: {marker.position.lng.toFixed(2)}</span>
                                <span className="d-block mb-2">Total Messages: {marker.messagesCount}</span>
                            </Tooltip>
                        </Marker>
                    })}
                    {currentPos && <Marker position={currentPos}/>}
                </Map>
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('app'));
