import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, PermissionsAndroid } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Entry from './Entry';
import GLOBAL from './global';
import publicIP from 'react-native-public-ip';
import Geolocation from '@react-native-community/geolocation';
import mapStyle from './mapStyle.json';

const width = Dimensions.get('window').width;
console.disableYellowBox = true;


export default class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            /**user state variables*/
            permissionState: false,
            region: {
                latitude: 0.0,
                longitude: 0.0,
                latitudeDelta: 0.222,
                longitudeDelta: 0.0421
            },
            user_location: 'unknown',

            /*database state variables*/
            db_ips_state: [],
            db_locations_state: [],
            db_entries_state: [],

            markers: []


            
        }
    }

    componentDidMount() {
        var that = this;

        publicIP()
            .then(ip => {
                GLOBAL.ip = ip;
            }).catch(error => {
                console.log(error);
            });


        GLOBAL.navigationStation = this.props.navigation;

        if (Platform.OS === 'ios') {
            this.callLocation(that);
        } else {
            async function requestLocationPermission() {
                try {
                    const granted = await PermissionAndroid.request(
                        PermissionAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                        'title': 'Location Access Required',
                        'message': 'This App needs to access your location'
                    }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        this.setState({
                            permissionState: true
                        })
                    }
                } catch (error) {

                    alert('error', error);
                    console.log(error)
                }

            }
            requestLocationPermission();
        }

        return (
            Promise.all([
                fetch('https://vector-source-api.herokuapp.com/ips'),
                fetch('https://vector-source-api.herokuapp.com/locations'),
                fetch('https://vector-source-api.herokuapp.com/entries')
            ]).then(([ips, locations, entries]) => {
                return Promise.all([
                    ips.json(),
                    locations.json(),
                    entries.json()
                ])
            }).then(([ips, locations, entries]) => {

                this.setState({
                    db_ips_state: ips,
                    db_locations_state: locations,
                    db_entries_state: entries
                })
            }).catch((error) => {
                console.log(error)
            })
        )

    }


    callLocation(that) {
        Geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                that.setState({ region: { latitude: currentLatitude, longitude: currentLongitude } });
                that.setState({ user_location: 'found' });
                GLOBAL.user_location = currentLongitude;
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        that.watchID = Geolocation.watchPosition((position) => {
            //console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            const currentLatitude = JSON.stringify(position.coords.latitude);
            /*that.setState({ region: { latitude: currentLatitude, longitude: currentLongitude } });
            that.setState({user_location: 'updated'})*/
            that.setState({ currentLongitude: currentLongitude });
            that.setState({ currentLatitude: currentLatitude });

            var lat_long = currentLatitude + ", " + currentLongitude;
            GLOBAL.lat_long = lat_long;

        });
    }
    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
    }

    onRegionChange(region) {
        this.setState = {
            regionState: region
        };
    }
    locationAccessible() {
        if (this.state.permissionState || this.state.user_location == 'found') {
            return (
                <TouchableOpacity style={{ padding: 10, backgroundColor: 'steelblue', borderRadius: 5 }}
                    onPress={() => this.props.navigation.navigate(Entry, { latitude: this.state.region.latitude, longitude: this.state.region.longitude})}>
                    <Text style={{ color: 'white', fontSize: 20 }}> + </Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={{ padding: 10, backgroundColor: 'steelblue', borderRadius: 5 }}
                    onPress={() => this.requestLocationPermission}>
                    <Text style={{ color: 'white', fontSize: 12 }}> Permit access to location </Text>
                </TouchableOpacity>
            )
        }
    }

    /** {this.state.db_ips_state.map(entry => {
                        console.log(entry);
                        this.renderMarker(entry);
                    })}*/
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView style={{ flex: 10 }}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                    showsUserLocation={false}
                >
                        {this.state.db_ips_state.map(entry => {
                            return (
                                this.renderMarker(entry)
                            )
                        })}
                      
                
                </MapView>
                <View style={styles.nav_overlay}>
                    {this.locationAccessible()}
                </View>


            </View>
        )
    }

    

    renderMarker(entry) {

        var now = new Date().getTime();

        var loggedTimeStamp = entry['timestamp'];

        var fourteenDayLimit = 1000 * 60 * 60 * 24 * 14;
        var threshold = now - fourteenDayLimit;
        if (loggedTimeStamp > threshold) {
            //then continue processing and rendering the data...
            //console.log("entry is within 14 days");

            var entryID = entry['entry_id'];
            //look into the lcations and entries for this entry_id

            var entry_latlong = {};
            const entryData = {};
            var symptom_ranking = 0;

            var iso_level = '';

            //console.log('location state : ' + this.state.location_state);
            //console.log('entry state : ' + this.state.entry)

            /*get corresponding location data from location table*/
            this.state.db_locations_state.forEach(entry_location => {
                //console.log(entry_location);
                if (entry_location['entry_id'] == entryID) {
                    var latlong = entry_location['lat_long'];
                    var latlong_split = latlong.split(',');
                    var lat = parseFloat(latlong_split[0]);
                    var long = parseFloat(latlong_split[1]);

                    entry_latlong = { latitude : lat, longitude : long}
                }

            })
            //console.log('entry lat long : ' + entry_latlong.toString());

            this.state.db_entries_state.forEach(ent => {
                //console.log(ent);

                if (ent['entry_id'] == entryID) {
                    console.log(ent['entry_id']);

                    if (ent['fever'] == '1') {
                        symptom_ranking = symptom_ranking + 1;
                    }
                    if (ent['cough'] == '1') {
                        symptom_ranking = symptom_ranking + 1;
                    }
                    if (ent['nasal_congestion'] == '1') {
                        symptom_ranking = symptom_ranking + 1;
                    }
                    if (ent['respiratory_problems'] == '1') {
                        symptom_ranking = symptom_ranking + 1;
                    }
                    if (ent['digestive_problems'] == 1) {
                        symptom_ranking = symptom_ranking + 1;
                    }
                    if (ent['muscular_soreness'] == 1) {
                        symptom_ranking = symptom_ranking + 1;
                    }
                    if (ent['fatigue'] == 1) {
                        symptom_ranking = symptom_ranking + 1;
                    }
                    if (ent['sore_throat'] == 1) {
                        symptom_ranking = symptom_ranking + 1;
                    }
                    if (!ent['other_symptoms'] == '') {
                        symptom_ranking = symptom_ranking + 1;
                    }

                    if (ent['isolation_level'] == 1) {
                        iso_level = '1';
                    } else if (ent['isolation_level'] == 2) {
                        iso_level = '2';
                    } else if (ent['isolation_level'] == 3) {
                        iso_level = '3';
                    } else if (ent['isolation_level'] == 0) {
                        iso_level = '1';
                    }



                } else {
                }

            })

            var millisAgo = now - loggedTimeStamp;
            var singleDay = 1000 * 60 * 60 * 24;
            var days = millisAgo / singleDay;


            var entry_radius = '';
            var entry_fill_color = '';
            var strokeColor = '';
            var strokeWidth = 1;
            var time_diff = Math.floor(days);
            var time_diff_opacity_level = '';


            if (symptom_ranking == 1) {
                entry_radius = '25'
            } else if (symptom_ranking == 2) {
                entry_radius = '35'
            } else if (symptom_ranking == 3) {
                entry_radius = '45'
            } else if (symptom_ranking == 4) {
                entry_radius = '55'
            } else if (symptom_ranking == 5) {
                entry_radius = '65'
            } else if (symptom_ranking == 6) {
                entry_radius = '75'
            } else if (symptom_ranking == 7) {
                entry_radius = '85'
            } else if (symptom_ranking == 8) {
                entry_radius = '95'
            } else if (symptom_ranking == 9) {
                entry_radius = '105'
            }

            console.log('entry_radius : ' + entry_radius);

            if (time_diff == 0) {
                time_diff_opacity_level = '0.8)';
            } else if (time_diff == 1) {
                time_diff_opacity_level = '0.754)';
            } else if (time_diff == 2) {
                time_diff_opacity_level = '0.708)';
            } else if (time_diff == 3) {
                time_diff_opacity_level = '0.662)';
            } else if (time_diff == 4) {
                time_diff_opacity_level = '0.616)';
            } else if (time_diff == 5) {
                time_diff_opacity_level = '0.57)';
            } else if (time_diff == 6) {
                time_diff_opacity_level = '0.524)';
            } else if (time_diff == 7) {
                time_diff_opacity_level = '0.478)';
            } else if (time_diff == 8) {
                time_diff_opacity_level = '0.432)';
            } else if (time_diff == 9) {
                time_diff_opacity_level = '0.386)';
            } else if (time_diff == 10) {
                time_diff_opacity_level = '0.34)';
            } else if (time_diff == 11) {
                time_diff_opacity_level = '0.294)';
            } else if (time_diff == 12) {
                time_diff_opacity_level = '0.248)';
            } else if (time_diff == 13) {
                time_diff_opacity_level = '0.202)';
            } else if (time_diff == 14) {
                time_diff_opacity_level = '0.156)';
            }

            if (iso_level == 3) {
                strokeColor = 'crimson';
                strokeWidth = 1;
                entry_fill_color = 'rgba(220, 20, 60,'.concat(time_diff_opacity_level);
            } else if (iso_level == 2) {
                strokeColor = 'steelblue';
                strokeWidth = 1;
                entry_fill_color = 'rgba(220, 20, 60,'.concat(time_diff_opacity_level);

            } else if (iso_level == 1) {
                strokeColor = 'steelblue';
                strokeWidth = 3;
                entry_fill_color = 'rgba(220, 20, 60,'.concat(time_diff_opacity_level);
            }

            //then render...

            console.log('entry_latlong : ' + entry_latlong);
            console.log('entry radius : ' + entry_radius);
            console.log('strokeWidth : ' + strokeWidth);
            console.log('stroke color : ' + strokeColor);
            console.log('fill color : ' + entry_fill_color);

            return (


                <MapView.Circle
                    center={entry_latlong}
                    radius={entry_radius}
                    strokeWidth={1}
                    strokeColor={strokeColor}
                    fillColor={entry_fill_color}
                />

            )

        } else {
            return null
        }


        

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nav_overlay: {
        width: width,
        flex: 1,
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'flex-start' 
    },
    marker: {
        backgroundColor: 'crimson',
        padding: 5,
        borderRadius : 5

    }
})


/**this is just a container for the rendering variables for isol-levels, symptom states, and time



/*<MapView.Circle
                        center={{ latitude: 40.7610, longitude: -111.8940 }}
                        radius='105'
                        strokeWidth={1}
                        strokeColor={'crimson'}
                        fillColor={'rgba(220, 20, 60,.8)'}
                    />
                    <MapView.Circle
                        center={{ latitude: 40.7610, longitude: -111.8940 }}
                        radius='95'
                        strokeWidth={1}
                        strokeColor={'crimson'}
                        fillColor={'rgba(220, 20, 60,.72)'}
                    />
                    <MapView.Circle
                        center={{ latitude: 40.7615, longitude: -111.8943 }}
                        radius='85'
                        strokeWidth={1}
                        strokeColor={'crimson'}
                        fillColor={'rgba(220, 20, 60,.64)'}
                    />
                    <MapView.Circle
                        center={{ latitude: 40.7620, longitude: -111.8945 }}
                    radius='75'
                        strokeWidth={1}
                        strokeColor={'crimson'}
                        fillColor={'rgba(220, 20, 60,.56)'}
                    />
                    <MapView.Circle
                        center={{ latitude: 40.7626, longitude: -111.8947 }}
                        radius='65'
                        strokeWidth={1}
                        strokeColor={'crimson'}
                        fillColor={'rgba(220, 20, 60,.48)'}
                    />
                    <MapView.Circle
                        center={{ latitude: 40.7632, longitude: -111.8949 }}
                        radius='55'
                        strokeWidth={3}
                        strokeColor={'steelblue'}
                        fillColor={'rgba(70, 30, 80,.4)'}
                    />
                    <MapView.Circle
                        center={{ latitude: 40.7638, longitude: -111.8951 }}
                        radius='45'
                        strokeWidth={1}
                        strokeColor={'crimson'}
                        fillColor={'rgba(220, 20, 60,.32)'}
                    />
                    <MapView.Circle
                        center={{ latitude: 40.7645, longitude: -111.8953 }}
                        radius='35'
                        strokeWidth={1}
                        strokeColor={'crimson'}
                        fillColor={'rgba(220, 20, 60,.24)'}
                    />
                    <MapView.Circle
                        center={{ latitude: 40.7650, longitude: -111.8955 }}
                        radius='25'
                        strokeWidth={1}
                        strokeColor={'steelblue'}
                        fillColor={'rgba(70, 30, 80,.16)'}
                    />



*/


/**
this is the original embedded javascript inside of the mapview tag in the render, return statements


                    /*this.state.db_ips_state.map(entry => {
                        this.renderMarker(entry);
                        //console.log(entry);
                    })}

                    <MapView.Circle
                        center={{ latitude: 40.7610, longitude: -111.8940 }}
                        radius='95'
                        strokeWidth={1}
                        strokeColor={'crimson'}
                        fillColor={'rgba(220, 20, 60,.72)'}
                    />*/

