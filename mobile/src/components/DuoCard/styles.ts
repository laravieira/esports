import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        width: 200,
        backgroundColor: THEME.COLORS.SHAPE,
        borderRadius: 8,
        padding: 20,
        marginRight: 16,
    },
    cover: {
        width: 240,
        height: 320,
        justifyContent: 'flex-end',
        borderRadius: 8,
        overflow: 'hidden'
    },
    footer: {
        width: '100%',
        height: 102,
        padding: 16,
        justifyContent: 'flex-end',
        bottom: -1
    },
    name: {
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.BOLD
    },
    ads: {
        color: THEME.COLORS.CAPTION_300,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.REGULAR
    },
    button: {
        width: '100%',
        height: 36,
        borderRadius: 6,
        backgroundColor: THEME.COLORS.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTitle: {
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.SM,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        marginLeft: 8
    }
});