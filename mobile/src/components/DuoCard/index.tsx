import { styles } from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import { DuoInfo } from '../DuoInfo';
import { THEME } from '../../theme';
import { GameController } from 'phosphor-react-native';

export interface AdsProps {
    id: string,
    name: string,
    yearsPlaying: number,
    weekDays: string[],
    useVoiceChannel: boolean,
    hourStart: string,
    hourEnd: string
}

interface Props {
    data: AdsProps;
    onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
    function parseAvailability(days: number, start: string, end: string) {
        let time = start.split(':');
        if(time[1] == "00")
            start = `${ time[0] }h`;

        time = end.split(':');
        if(time[1] == "00")
            end = `${ time[0] }h`;

        return (
            <>
                { `${ days } dias ` }
                <Text style={{ color: THEME.COLORS.CAPTION_300 }}>•</Text>
                { ` ${ start } - ${ end }` }
            </>);
    }

    return (
        <View style={ styles.container }>
            <DuoInfo label="Nome">{ data.name }</DuoInfo>
            <DuoInfo label="Tempo de jogo">
                { data.yearsPlaying + " " + (data.yearsPlaying == 1 ? 'ano' : 'anos') }
            </DuoInfo>
            <DuoInfo label="Disponibilidade">
                { parseAvailability(data.weekDays.length, data.hourStart, data.hourEnd) }
            </DuoInfo>
            <DuoInfo label="Chamada de áudio"
                     color={ data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT }>
                { data.useVoiceChannel ? "Sim" : "Não" }
            </DuoInfo>
            <TouchableOpacity style={ styles.button } onPress={ onConnect }>
                <GameController color={ THEME.COLORS.TEXT } size={ 20 }/>
                <Text style={ styles.buttonTitle }>Conectar</Text>
            </TouchableOpacity>
        </View>
    );
}