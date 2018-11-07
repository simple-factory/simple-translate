import Translate from './Translate';

import * as React from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import { Appbar } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export default function Main() {
    return (
        <PaperProvider theme={theme}>
            <Appbar.Header>
                <Appbar.Content title="심플번역" />
            </Appbar.Header>
            <Translate />
            <View style={styles.advertising}>

            </View>
        </PaperProvider>
    );
}

const theme = {
    ...DefaultTheme,
    roundness: 0,
    colors: {
        ...DefaultTheme.colors,
        primary: '#125cdb'
    }
};

const styles = StyleSheet.create({
    advertising: {
        height: 70,
        backgroundColor: 'gray'
    }
});

AppRegistry.registerComponent('main', () => Main);