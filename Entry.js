import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, SafeAreaView, ScrollView } from 'react-native';
import Formy from './Formy';
import GLOBAL from './global';

export default class Entry extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        const navigation = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgoundColor: 'powderblue' }}>
                <Formy />
            </SafeAreaView>
        )
    }
    
}

const styles = StyleSheet.create({
    
    
})

    

