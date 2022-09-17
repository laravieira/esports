import { ColorValue, Text, View } from 'react-native';
import { styles } from './styles';
import { THEME } from '../../theme';
import { ReactNode } from 'react';

interface Props {
    label: string,
    children: ReactNode,
    color?: ColorValue
}

export function DuoInfo({ label, children, color = THEME.COLORS.TEXT }: Props) {
    return (
        <View style={ styles.container }>
            <Text style={ styles.label }>{ label }</Text>
            <Text style={{ ...styles.value, color }}
                  numberOfLines={ 1 }>{ children }</Text>
        </View>
    );
}