import { FlatList, Image, View } from 'react-native';

import logo from './../../assets/logo-nlw-esports.png';
import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { GameCard } from '../../components/GameCard';
import { GAMES } from '../../utils/games';


export function Home() {
    // @ts-ignore
    const renderGameCard = ({ item }) => {
        return <GameCard data={ item }/>;
    }

    return (
        <View style={ styles.container } >
            <Image source={ logo } style={ styles.logo }/>
            <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..."/>
            <FlatList data={ GAMES }
                      renderItem={ renderGameCard }
                      keyExtractor={ item => item.id }
                      showsHorizontalScrollIndicator={ false }
                      contentContainerStyle={ styles.contentList }
                      horizontal/>
        </View>
    );
}