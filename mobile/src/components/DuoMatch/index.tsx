import { styles } from './styles';
import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCopping, setCopping] = useState<boolean>(false);

    async function onDiscordCopy() {
        setCopping(true);
        await Clipboard.setStringAsync(discord);
        Alert.alert('Tag copiada.', 'Tag do Discord copiada, agora é só adicionar e jogar!');
        setCopping(false);
    }

    return (
        <Modal transparent
               animationType="fade"
               statusBarTranslucent
               { ...rest }>
            <View style={ styles.container }>
                <View style={ styles.content }>
                    <TouchableOpacity style={ styles.close } onPress={ onClose }>
                        <Entypo name="cross"
                                size={ 24 }
                                color={ THEME.COLORS.CAPTION_500 }/>
                    </TouchableOpacity>
                    <CheckCircle color={ THEME.COLORS.SUCCESS }
                                 weight="bold"
                                 size={ 64 }/>
                    <Heading title="Let's Play!"
                             subtitle="Agora é só começar a jogar!"
                             style={ styles.heading }/>
                    <Text style={ styles.label }>Adicione no Discord</Text>
                    <TouchableOpacity style={ styles.button }
                                      disabled={ isCopping }
                                      onPress={ onDiscordCopy }>
                        <Text style={ styles.text }>
                            { isCopping ? <ActivityIndicator color={ THEME.COLORS.PRIMARY }/> : discord }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}