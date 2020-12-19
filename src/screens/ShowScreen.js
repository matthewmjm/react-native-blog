import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';

const ShowScreen = ( {navigation }) => {
    const { state } = useContext();

    const blogPost = state.find(() => blogPost.id === navigation.getParm('id'))
    // navigation.getParam('id');
    return (
        <View>
            <Text>{blogPost.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ShowScreen;