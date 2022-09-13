import { ImageBackground, ImageSourcePropType, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../../theme';

export interface GameCardProps {
    id: String;
    name: String;
    ads: Number;
    cover: ImageSourcePropType
}

interface Props extends TouchableOpacityProps {
    data: GameCardProps;
}

export function GameCard({data, ...rest}: Props) {
    return (
        <TouchableOpacity style={ styles.container } { ...rest }>
            <ImageBackground style={ styles.cover } source={ data.cover }>
                <LinearGradient style={ styles.footer } colors={ THEME.COLORS.FOOTER }>
                    <Text style={ styles.name }>{ data.name }</Text>
                    <Text style={ styles.ads }>{ data.ads + ' anúncios' }</Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
}