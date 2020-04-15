import * as React from 'react';
import { View, TouchableOpacity, Text, TextInput, FlatList, StyleSheet, Dimensions, ScrollView, Button} from 'react-native';
import GLOBAL from './global';

const width = Dimensions.get('window').width;

export default class Formy extends React.Component {
   

    constructor(props) {
        super(props);
        this.state = {
            computer_state: 0,
            entry_type: 0,
            household_size: 0,
            age: 0,
            fever: 0,
            temp: 0,
            cough: 0,
            nasal_congestion: 0,
            respiratory_problems: 0,
            digestive_problems: 0,
            muscular_soreness: 0,
            fatigue: 0,
            sore_throat: 0,
            other_symptoms: '',
            underlying_health_conditions: '',
            isolation_level: 0,
            recent_travel_destination: '',
            recent_travel_date: ''
        }
    }
    

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'column', width: width }}>

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Are you using a public or personal device?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button1Style(this.state.computer_state)
                            } onPress={() => {
                                if (this.state.computer_state == 0) {
                                    this.setState({ computer_state: 1 })
                                } else if (this.state.computer_state == 1) {
                                    this.setState({computer_state: 0})
                                } else if (this.state.computer_state == 2) {
                                    /*nothing*/
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Public / shared </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button2Style(this.state.computer_state)} onPress={() => {
                                if (this.state.computer_state == 0) {
                                    this.setState({ computer_state: 2 })
                                } else if (this.state.computer_state == 1) {/*nothing*/
                                } else if (this.state.computer_state == 2) {
                                    this.setState({computer_state: 0})
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Personal</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Who are you entering data for?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button1Style(this.state.entry_type)
                            } onPress={() => {
                                if (this.state.entry_type == 0) {
                                    this.setState({ entry_type: 1 })
                                } else if (this.state.entry_type == 1) {
                                    this.setState({ entry_type: 0 })
                                } else if ((!this.state.entry_type == 0) && (!this.state.entry_type == 1)) {
                                    /*nothing*/
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Myself</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button2Style(this.state.entry_type)} onPress={() => {
                                if (this.state.entry_type == 0) {
                                    this.setState({ entry_type: 2 })
                                } else if ((!this.state.entry_type == 0) && (!this.state.entry_type == 2)) {
                                    /*nothing*/
                                } else if (this.state.entry_type == 2) {
                                    this.setState({ entry_type: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Member of household, or group</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button3Style(this.state.entry_type)} onPress={() => {
                                if (this.state.entry_type == 0) {
                                    this.setState({ entry_type: 3 })
                                } else if ((!this.state.entry_type == 0) && (!this.state.entry_type == 3) ) {
                                   /*nothing*/
                                } else if (this.state.entry_type == 3) {
                                    this.setState({ entry_type: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Other person</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Shelter group, or household size?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <TextInput
                                style={this.textInputStyle(this.state.household_size)}
                                onChangeText={
                                    (val) => {
                                        if (val == "") {
                                            this.setState({
                                                household_size: 0
                                            })
                                        } else {
                                            this.setState({
                                                household_size: val
                                            })
                                        }
                                    }}
                                maxLength={3}
                            />

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Age?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <TextInput
                                style={this.textInputStyle(this.state.age)}
                                onChangeText={
                                    (val) => {
                                        if (val == "") {
                                            this.setState({
                                                age: 0
                                            })
                                        } else {
                                            this.setState({
                                                age: val
                                            })
                                        }
                                    }}
                                maxLength={3}
                            />

                        </View>
                    </View>

                    <View style={{alignItems: 'flex-start' }}> 
                        <Text style={{ fontSize: 20}}>Symptoms</Text>
                    </View>

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Fever?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button1Style(this.state.fever)
                            } onPress={() => {
                                if (this.state.fever == 0) {
                                    this.setState({ fever: 1 })
                                } else if (this.state.fever == 1) {
                                    this.setState({ fever: 0 })
                                } else if ((!this.state.fever == 0) && (!this.state.fever == 1)) {
                                    /*nothing*/
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button2Style(this.state.fever)} onPress={() => {
                                if (this.state.fever == 0) {
                                    this.setState({ fever: 2 })
                                } else if ((!this.state.fever == 0) && (!this.state.fever == 2)) {
                                    /*nothing*/
                                } else if (this.state.fever == 2) {
                                    this.setState({ fever: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button3Style(this.state.fever)} onPress={() => {
                                if (this.state.fever == 0) {
                                    this.setState({ fever: 3 })
                                } else if ((!this.state.fever == 0) && (!this.state.fever == 3)) {
                                    /*nothing*/
                                } else if (this.state.fever == 3) {
                                    this.setState({ fever: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Don't know</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <View>
                        {this.renderTemp(this.state.fever)}
                    </View>

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Cough?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button1Style(this.state.cough)
                            } onPress={() => {
                                if (this.state.cough == 0) {
                                    this.setState({ cough: 1 })
                                } else if (this.state.cough == 1) {
                                    this.setState({ cough: 0 })
                                } else if ((!this.state.cough == 0) && (!this.state.cough == 1)) {
                                    /*nothing*/
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button2Style(this.state.cough)} onPress={() => {
                                if (this.state.cough == 0) {
                                    this.setState({ cough: 2 })
                                } else if ((!this.state.cough == 0) && (!this.state.cough == 2)) {
                                    /*nothing*/
                                } else if (this.state.cough == 2) {
                                    this.setState({ cough: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button3Style(this.state.cough)} onPress={() => {
                                if (this.state.cough == 0) {
                                    this.setState({ cough: 3 })
                                } else if ((!this.state.cough == 0) && (!this.state.cough == 3)) {
                                    /*nothing*/
                                } else if (this.state.cough == 3) {
                                    this.setState({ cough: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Don't know</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Nasal Congestion?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button1Style(this.state.nasal_congestion)
                            } onPress={() => {
                                if (this.state.nasal_congestion == 0) {
                                    this.setState({ nasal_congestion: 1 })
                                } else if (this.state.nasal_congestion == 1) {
                                    this.setState({ nasal_congestion: 0 })
                                } else if ((!this.state.nasal_congestion == 0) && (!this.state.nasal_congestion == 1)) {
                                    /*nothing*/
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button2Style(this.state.nasal_congestion)} onPress={() => {
                                if (this.state.nasal_congestion == 0) {
                                    this.setState({ nasal_congestion: 2 })
                                } else if ((!this.state.nasal_congestion == 0) && (!this.state.nasal_congestion == 2)) {
                                    /*nothing*/
                                } else if (this.state.nasal_congestion == 2) {
                                    this.setState({ nasal_congestion: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button3Style(this.state.nasal_congestion)} onPress={() => {
                                if (this.state.nasal_congestion == 0) {
                                    this.setState({ nasal_congestion: 3 })
                                } else if ((!this.state.nasal_congestion == 0) && (!this.state.nasal_congestion == 3)) {
                                    /*nothing*/
                                } else if (this.state.nasal_congestion == 3) {
                                    this.setState({ nasal_congestion: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Don't know</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Respiratory Problems?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button1Style(this.state.respiratory_problems)
                            } onPress={() => {
                                if (this.state.respiratory_problems == 0) {
                                    this.setState({ respiratory_problems: 1 })
                                } else if (this.state.respiratory_problems == 1) {
                                    this.setState({ respiratory_problems: 0 })
                                } else if ((!this.state.respiratory_problems == 0) && (!this.state.respiratory_problems == 1)) {
                                    /*nothing*/
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button2Style(this.state.respiratory_problems)} onPress={() => {
                                if (this.state.respiratory_problems == 0) {
                                    this.setState({ respiratory_problems: 2 })
                                } else if ((!this.state.respiratory_problems == 0) && (!this.state.respiratory_problems == 2)) {
                                    /*nothing*/
                                } else if (this.state.respiratory_problems == 2) {
                                    this.setState({ respiratory_problems: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button3Style(this.state.respiratory_problems)} onPress={() => {
                                if (this.state.respiratory_problems == 0) {
                                    this.setState({ respiratory_problems: 3 })
                                } else if ((!this.state.respiratory_problems == 0) && (!this.state.respiratory_problems == 3)) {
                                    /*nothing*/
                                } else if (this.state.respiratory_problems == 3) {
                                    this.setState({ respiratory_problems: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Don't know</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Digestive Problems?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button1Style(this.state.digestive_problems)
                            } onPress={() => {
                                if (this.state.digestive_problems == 0) {
                                    this.setState({ digestive_problems: 1 })
                                } else if (this.state.digestive_problems == 1) {
                                    this.setState({ digestive_problems: 0 })
                                } else if ((!this.state.digestive_problems == 0) && (!this.state.digestive_problems == 1)) {
                                    /*nothing*/
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button2Style(this.state.digestive_problems)} onPress={() => {
                                if (this.state.digestive_problems == 0) {
                                    this.setState({ digestive_problems: 2 })
                                } else if ((!this.state.digestive_problems == 0) && (!this.state.digestive_problems == 2)) {
                                    /*nothing*/
                                } else if (this.state.digestive_problems == 2) {
                                    this.setState({ digestive_problems: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button3Style(this.state.digestive_problems)} onPress={() => {
                                if (this.state.digestive_problems == 0) {
                                    this.setState({ digestive_problems: 3 })
                                } else if ((!this.state.digestive_problems == 0) && (!this.state.digestive_problems == 3)) {
                                    /*nothing*/
                                } else if (this.state.digestive_problems == 3) {
                                    this.setState({ digestive_problems: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Don't know</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Muscular Soreness?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button1Style(this.state.muscular_soreness)
                            } onPress={() => {
                                if (this.state.muscular_soreness == 0) {
                                    this.setState({ muscular_soreness: 1 })
                                } else if (this.state.muscular_soreness == 1) {
                                    this.setState({ muscular_soreness: 0 })
                                } else if ((!this.state.muscular_soreness == 0) && (!this.state.muscular_soreness == 1)) {
                                    /*nothing*/
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button2Style(this.state.muscular_soreness)} onPress={() => {
                                if (this.state.muscular_soreness == 0) {
                                    this.setState({ muscular_soreness: 2 })
                                } else if ((!this.state.muscular_soreness == 0) && (!this.state.muscular_soreness == 2)) {
                                    /*nothing*/
                                } else if (this.state.muscular_soreness == 2) {
                                    this.setState({ muscular_soreness: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button3Style(this.state.muscular_soreness)} onPress={() => {
                                if (this.state.muscular_soreness == 0) {
                                    this.setState({ muscular_soreness: 3 })
                                } else if ((!this.state.muscular_soreness == 0) && (!this.state.muscular_soreness == 3)) {
                                    /*nothing*/
                                } else if (this.state.muscular_soreness == 3) {
                                    this.setState({ muscular_soreness: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Don't know</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Fatigue?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button1Style(this.state.fatigue)
                            } onPress={() => {
                                if (this.state.fatigue == 0) {
                                    this.setState({ fatigue: 1 })
                                } else if (this.state.fatigue == 1) {
                                    this.setState({ fatigue: 0 })
                                } else if ((!this.state.fatigue == 0) && (!this.state.fatigue == 1)) {
                                    /*nothing*/
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button2Style(this.state.fatigue)} onPress={() => {
                                if (this.state.fatigue == 0) {
                                    this.setState({ fatigue: 2 })
                                } else if ((!this.state.fatigue == 0) && (!this.state.fatigue == 2)) {
                                    /*nothing*/
                                } else if (this.state.fatigue == 2) {
                                    this.setState({ fatigue: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button3Style(this.state.fatigue)} onPress={() => {
                                if (this.state.fatigue == 0) {
                                    this.setState({ fatigue: 3 })
                                } else if ((!this.state.fatigue == 0) && (!this.state.fatigue == 3)) {
                                    /*nothing*/
                                } else if (this.state.fatigue == 3) {
                                    this.setState({ fatigue: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Don't know</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Sore Throat?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button1Style(this.state.sore_throat)
                            } onPress={() => {
                                if (this.state.sore_throat == 0) {
                                    this.setState({ sore_throat: 1 })
                                } else if (this.state.sore_throat == 1) {
                                    this.setState({ sore_throat: 0 })
                                } else if ((!this.state.sore_throat == 0) && (!this.state.sore_throat == 1)) {
                                    /*nothing*/
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button2Style(this.state.sore_throat)} onPress={() => {
                                if (this.state.sore_throat == 0) {
                                    this.setState({ sore_throat: 2 })
                                } else if ((!this.state.sore_throat == 0) && (!this.state.sore_throat == 2)) {
                                    /*nothing*/
                                } else if (this.state.sore_throat == 2) {
                                    this.setState({ sore_throat: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button3Style(this.state.sore_throat)} onPress={() => {
                                if (this.state.sore_throat == 0) {
                                    this.setState({ sore_throat: 3 })
                                } else if ((!this.state.sore_throat == 0) && (!this.state.sore_throat == 3)) {
                                    /*nothing*/
                                } else if (this.state.sore_throat == 3) {
                                    this.setState({ sore_throat: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Don't know</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Other Symptoms?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <TextInput
                                multiline
                                style={this.textInputStyles(this.state.other_symptoms)}
                                onChangeText={
                                    (val) => {
                                        if (!val == "") {
                                            this.setState({
                                                other_symptoms: val
                                            })
                                        } else {
                                            this.setState({
                                                other_symptoms: ''
                                            })
                                        }
                                    }}
                                maxLength={300}
                            />

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Underlying Health Conditions?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <TextInput
                                multiline
                                style={this.textInputStyles(this.state.underlying_health_conditions)}
                                onChangeText={
                                    (val) => {
                                        if (!val == "") {
                                            this.setState({
                                                underlying_health_conditions: val
                                            })
                                        } else {
                                            this.setState({
                                                underlying_health_conditions: ''
                                            })
                                        }
                                    }}
                                maxLength={300}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Current isolation level?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button1Style(this.state.isolation_level)
                            } onPress={() => {
                                if (this.state.isolation_level == 0) {
                                    this.setState({ isolation_level: 1 })
                                } else if (this.state.isolation_level == 1) {
                                    this.setState({ isolation_level: 0 })
                                } else if ((!this.state.isolation_level == 0) && (!this.state.isolation_level == 1)) {
                                    /*nothing*/
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Complete isolation</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button2Style(this.state.isolation_level)} onPress={() => {
                                if (this.state.isolation_level == 0) {
                                    this.setState({ isolation_level: 2 })
                                } else if ((!this.state.isolation_level == 0) && (!this.state.isolation_level == 2)) {
                                    /*nothing*/
                                } else if (this.state.isolation_level == 2) {
                                    this.setState({ isolation_level: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>Not isolated, but social distancing</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
                            <TouchableOpacity style={this.button3Style(this.state.isolation_level)} onPress={() => {
                                if (this.state.isolation_level == 0) {
                                    this.setState({ isolation_level: 3 })
                                } else if ((!this.state.isolation_level == 0) && (!this.state.isolation_level == 3)) {
                                    /*nothing*/
                                } else if (this.state.isolation_level == 3) {
                                    this.setState({ isolation_level: 0 })
                                }
                            }}>
                                <Text style={{ color: 'white' }}>None</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Most Recent Travel Destination?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <TextInput
                                multiline
                                style={this.textInputStyles(this.state.recent_travel_destination)}
                                onChangeText={
                                    (val) => {
                                        if (!val == "") {
                                            this.setState({
                                                recent_travel_destination: val
                                            })
                                        } else {
                                            this.setState({
                                                recent_travel_destination: ''
                                            })
                                        }
                                    }}
                                maxLength={300}
                            />

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', margin: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Most Recent Travel Date?</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <TextInput
                                placeholder={'MMDDYY'}
                                style={this.textInputStyles(this.state.recent_travel_date)}
                                onChangeText={
                                    (val) => {
                                        if (!val == "") {
                                            this.setState({
                                                recent_travel_date: val
                                            })
                                        } else {
                                            this.setState({
                                                recent_travel_date: ''
                                            })
                                        }
                                    }}
                                maxLength={6}
                                minLength={6}
                            />

                        </View>
                    </View>
                </View>

                <View style={styles.submitFrame}>
                    <TouchableOpacity style={styles.submitButton} onPress={() =>
                        this.submit().then(GLOBAL.navigationStation.navigate('Home')).catch(error => console.log(error))
                    }>
                        <Text style={{ fontSize: 16, color: 'white' }}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

    button1Style(var_state) {
        if (var_state == 0) {
            return (
                styles.unselected
            )
        } else if (var_state == 1) {
            return (
                styles.selectedButton
            )
        } else if ((var_state ==2) || (var_state == 3)) {
            return (
                styles.otherSelectedButton
            )
        }
    }

    button2Style(var_state) {
        if (var_state == 0) {
            return (
                styles.unselected
            )
        } else if ((var_state == 1) || (var_state == 3)) {
            return (
                styles.otherSelectedButton
            )
        } else if (var_state == 2) {
            return (
                styles.selectedButton
            )
        }
    }

    button3Style(var_state) {
        if (var_state == 0) {
            return (
                styles.unselected
            )
        } else if ((var_state == 1) || (var_state == 2)) {
            return (
                styles.otherSelectedButton
            )
        } else if (var_state == 3) {
            return (
                styles.selectedButton
            )
        }
    }

    textInputStyle(inputState) {
        if (inputState == 0) {
            return (
                styles.inputWaiting
            )
        } else {
            return (
                styles.inputSubmittedValidated
            )
        }
    }
    /**
     *
     * don't forget there are two of these similar functions.
     *
     * */
    textInputStyles(inputState) {
        if (inputState == 0) {
            return (
                styles.inputWaiting
            )
        } else {
            return (
                styles.inputSubmittedValidated
            )
        }
    }

    renderTemp(val) {
        if (val == 1) {
            return (
                <View style={{ flexDirection: 'row', margin: 12 }}>
                    <View style={{ flex: 1 }}>
                        <Text>Temperature?</Text>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <TextInput
                            style={this.textInputStyle(this.state.temp)}
                            onChangeText={
                                (val) => {
                                    if (val == "") {
                                        this.setState({
                                            temp: 0
                                        })
                                    } else {
                                        this.setState({
                                            temp: val
                                        })
                                    }
                                    4443
                                }}
                            maxLength={3}
                        />

                    </View>
                </View>
            )
        } else {
            return (null);
        }
    }
    validate(val) {
    }

    
   

    /**submission function */
    async submit() {
        /*process computer state*/ 
        var computerState;
        if (this.state.computer_state == 1) {
            computerState = true
        } else {
            computerState = false
        }

        var tracedIP = GLOBAL.ip.concat("_");
        var timestamped = new Date().getTime();
        var id = tracedIP.concat(timestamped);

        const ip = {
            ip_address: tracedIP,
            timestamp: timestamped,
            entry_id: id,
            public_computer: computerState
        }

        const location = {
            entry_id: id,
            lat_long: GLOBAL.lat_long
        }

        const entry = {
            entry_id: id,
            entry_type: this.state.entry_type,
            household_size: this.state.household_size,
            age: this.state.age,
            fever: this.state.fever,
            temp: this.state.temp,
            cough: this.state.cough,
            nasal_congestion: this.state.nasal_congestion,
            respiratory_problems: this.state.respiratory_problems,
            digestive_problems: this.state.digestive_problems,
            muscular_soreness: this.state.muscular_soreness,
            fatigue: this.state.fatigue,
            sore_throat: this.state.sore_throat,
            other_symptoms: this.state.other_symptoms,
            underlying_health_conditions: this.state.underlying_health_conditions,
            isolation_level: this.state.isolation_level,
            recent_travel_destination: this.state.recent_travel_destination,
            recent_travel_date: this.state.recent_travel_date
        }
       
        try {
            fetch('https://vector-source-api.herokuapp.com/ips', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json'
                },
                method: 'post',
                body: JSON.stringify(ip),
            })
        } catch (error) {
            console.log(error)
        }

        
        try {
            fetch('https://vector-source-api.herokuapp.com/locations', {
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(location),
            })
        } catch (error) {
            console.log(error)
        }

        try {
            fetch('https://vector-source-api.herokuapp.com/entries', {
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(entry),
            })
        } catch (error) {
            console.log(error)
        }
    }/*end of submit*/
}
const styles = StyleSheet.create({
    unselected: {
        padding: 8, backgroundColor: 'steelblue', borderRadius: 4
    },
    selectedButton: {
        padding: 8, backgroundColor: 'skyblue', borderRadius: 4
    },
    otherSelectedButton: {
        padding: 8, backgroundColor: '#ddd', borderRadius: 4
    },
    textInpnutSM: {

    },
    textInputLG: {

    },
    inputWaiting: {
        padding: 5,
        borderColor: 'steelblue',
        borderRadius: 4,
        borderWidth: 2
    },
    inputSubmittedValidated: {
        padding: 5,
        borderColor: 'skyblue',
        borderRadius: 4,
        borderWidth: 2
    },

    submitFrame: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 80
    },

    submitButton: {
        padding: 10,
        backgroundColor: 'maroon',
        borderRadius: 5
    }


})