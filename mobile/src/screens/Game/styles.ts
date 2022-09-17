import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 32,
        marginTop: 28,
        justifyContent: 'space-between'
    },
    logo: {
        width: 72,
        height: 40
    },
    sideSpace: {
        width: 20,
        height: 20
    },
    cover: {
        width: 348,
        height: 180,
        borderRadius: 8,
        marginTop: 32,
        marginHorizontal: 16
    },
    adsListWrapper: {
        width: '100%'
    },
    adsList: {
        paddingLeft: 32,
        paddingRight: 32,
        alignItems: 'flex-start'
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    empty: {
        width: '55%',
        textAlign: 'center',
        color: THEME.COLORS.CAPTION_300,
        fontSize: THEME.FONT_SIZE.SM,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
    }
});