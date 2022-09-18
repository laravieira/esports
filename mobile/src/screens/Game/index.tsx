import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GameCardProps } from '../../components/GameCard';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import logo from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { AdsProps, DuoCard } from '../../components/DuoCard';
import { useEffect, useState } from 'react';
import { DuoMatch } from '../../components/DuoMatch';


export function Game() {
    const [ads, setAds] = useState<AdsProps[]>([]);
    const [discord, setDiscord] = useState<string>('');
    const route = useRoute();
    const navigation = useNavigation();
    const game = route.params as GameCardProps;

    useEffect(fetchAds, []);

    function fetchAds() {
        fetch(`http://192.168.0.168/games/${ game.id }/ads`)
            .then(response => response.json())
            .then(setAds)
    }

    async function onConnectDuo(id: string) {
        await fetch(`http://192.168.0.168/ads/${ id }/discord`)
            .then(response => response.json())
            .then(({ discord }) => setDiscord(discord))
    }

    function renderDouCard(ad: AdsProps) {
        return (
            <DuoCard data={ ad } onConnect={ () => onConnectDuo(ad.id) }/>
        );
    }

    function renderEmptyList() {
        return (
            <Text style={ styles.empty }>Não há anúncios publicados para esse jogo.</Text>
        );
    }

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.header }>
                <TouchableOpacity onPress={ navigation.goBack }>
                    <Entypo name="chevron-thin-left"
                            color={ THEME.COLORS.CAPTION_300 }
                            size={ 20 }/>
                </TouchableOpacity>
                <Image source={ logo } style={ styles.logo }/>
                <View style={ styles.sideSpace }/>
            </View>
            <Image source={{ uri: game.bannerUrl }} style={ styles.cover } resizeMode="cover"/>
            <Heading title={ game.title } subtitle="Conecte-se e comece a jogar!"/>

            <FlatList data={ ads }
                      renderItem={ ({ item }) => renderDouCard(item) }
                      keyExtractor={ item => item.id }
                      style={ styles.adsListWrapper }
                      contentContainerStyle={ ads.length ? styles.adsList : styles.emptyContainer }
                      horizontal
                      showsHorizontalScrollIndicator={ false }
                      ListEmptyComponent={ renderEmptyList }/>

            <DuoMatch discord={ discord } visible={ !!discord.length } onClose={ () => setDiscord('') }/>
        </SafeAreaView>
    );
}