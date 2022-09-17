import { FlatList, Image } from 'react-native';

import logo from './../../assets/logo-nlw-esports.png';
import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { GAME } from '../../routes/app.routes';

export function Home() {
    const [games, setGames] = useState<GameCardProps[]>([]);
    const navigation = useNavigation();

    useEffect(fetchGames, []);

    function onGameBannerPress(game: GameCardProps) {
        navigation.navigate(GAME, game);
    }

    function onFetchGames(games: GameCardProps[]) {
        setGames(games);
    }

    function fetchGames() {
        fetch('http://192.168.0.168/games')
            .then(response => response.json())
            .then(onFetchGames);
    }

    function renderGameCard(item: GameCardProps) {
        return <GameCard data={ item } onPress={ () => onGameBannerPress(item) }/>;
    }

    return (
        <SafeAreaView style={ styles.container } >
            <Image source={ logo } style={ styles.logo }/>
            <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..."/>
            <FlatList data={ games }
                      renderItem={ ({item}) => renderGameCard(item) }
                      keyExtractor={ item => item.id }
                      showsHorizontalScrollIndicator={ false }
                      contentContainerStyle={ styles.contentList }
                      horizontal/>
        </SafeAreaView>
    );
}