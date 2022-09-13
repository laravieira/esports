import { ImageBackground, StatusBar } from 'react-native';
import { styles } from './styles';
import React from 'react';
import image from '../../assets/background-galaxy.png';

interface Props {
    children: React.ReactNode;
}

export function Background({ children }: Props) {
    return (
        <ImageBackground source={ image } defaultSource={ image } style={ styles.container }>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
            { children }
        </ImageBackground>
    );
}