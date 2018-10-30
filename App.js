import Translate from './Translate';

import * as React from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import { Appbar } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';

export default function Main() {
    return (
        <PaperProvider>
            <Appbar.Header>
                <Appbar.Content title="Simple Translate" />
            </Appbar.Header>
            <Translate />
            <View style={styles.advertising}>

            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    advertising: {
        height: 70,
        backgroundColor: 'gray'
    }
});

AppRegistry.registerComponent('main', () => Main);