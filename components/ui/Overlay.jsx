import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Overlay() {
    return (
        <View style={styles.container}>
            <View style={styles.transparentBox} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.4
    },
    transparentBox: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        opacity: 0.4,
        borderRadius: 10
    },
});