// styles.js
import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
const { width, height } = Dimensions.get('screen');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
      },
      //scroll container
      mainView: {
        flex: 1,
        width: width,
      },
      //flex
      flex1: {
        flex: 1
      },
      flex2: {
        flex: 2
      },
      flex3: {
        flex: 3
      },
      flex4: {
        flex: 4
      },
      flex5: {
        flex: 5
      },
      flex6: {
        flex: 6
      },
      flex7: {
        flex: 7
      },
      flex8: {
        flex: 8
      },
      flex9: {
        flex: 9
      },
      flex10: {
        flex: 10
      },
      alignStretch: {
        alignSelf: 'stretch'
      },
      flexRow: {
        flexDirection: 'row'
      },
      flexColumn: {
        flexDirection: 'column'
      },
      //justify content
      justifyBottom: {
        justifyContent: 'flex-end'
      },
      justifyVerticalCenter: {
        justifyContent: 'center'
      },
      justifyVerticalBottom: {
        justifyContent: 'flex-end'
      },
      justifyVerticalTop: {
        justifyContent: 'flex-start'
      },
      justifyHorizontalCenter: {
        alignItems: 'center'
      },
      //widths
      width: {
        width: width
      },
      width100: {
        width: '100%'
      },
      width80: {
        width: '80%'
      },
      width70: {
        width: '70%'
      },
      width50: {
        width: '50%'
      },
      width30: {
        width: '30%',
      },
      width20: {
        width: '20%'
      },
      //height
      height: {
        height
      },
      height100: {
        height: '100%'
      },
      height70: {
        height: '70%'
      },
      height50: {
        height: '50%'
      },
      height30: {
        height: '30%',
      },
      height25: {
        height: '25%'
      },
      heightVW2: {
        height: height*0.02
      },
      heightVW5: {
        height: height*0.05
      },
      heightVW9: {
        height: height*0.09
      },
      heightVW10: {
        height: height * 0.10
      },
      heightVW20: {
        height: height * 0.2
      },
      heightVW25: {
        height: height * 0.25
      },
      heightVW35: {
        height: height * 0.35
      },
      heightVW40: {
        height: height * 0.4
      },
      //padding
      paddingTop0: {
        paddingTop: 0
      },
      paddingTop20: {
        paddingTop: 20
      },
      paddingBottom0: {
        paddingBottom: 0
      },
      paddingLeft0: {
        paddingLeft: 0
      },
      paddingRight0: {
        paddingRight: 0
      },
      paddingUpDown5: {
        paddingTop: 5,
        paddingBottom: 5,
      },
      paddingLeftVW10: {
        paddingLeft: width*0.1
      },
      //margin
      marginBottom0: {
        marginBottom: 0
      },
      marginBottom5: {
        marginBottom: 5
      },
      marginTop0: {
        marginTop: 0
      },
      marginTop5: {
        marginTop: 5
      },
      marginLeftRight10: {
        marginLeft: 10,
        marginRight: 10
      },
      //borders
      borderBlack: {
        borderWidth: 1,
        borderColor: "#000000",
      },
      borderGreyLight: {
        borderWidth: 1,
        borderColor: "#cccccc",
      },
      borderBlackTopBottom: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000000",
      },
      borderBlackBottom: {
        borderBottomWidth: 1,
        borderColor: "#000000",
      },
      borderBlackTop: {
        borderTopWidth: 1,
        borderColor: "#000000",
      },
      //background color
      backgroundWhite: {
        backgroundColor: '#fff',
      },
      backgroundBlack: {
        backgroundColor: '#000000',
      },
      backgroundBeige: {
        backgroundColor: '#faf0e6'
      },
      //border
      borderRadiusTop: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        overflow: 'hidden'
      },
      borderRadiusBottom: {
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        overflow: 'hidden',
      },
      //image object fit
      objectFitContain: {
        objectFit: 'contain'
      },
      objectFitFill: {
        objectFit: 'fill'
      },
      objectFitCover: {
        objectFit: 'cover'
      },
      //font
      font20: {
        fontSize: 20,
      },
      font15: {
        fontSize: 15,
      },
      fontWeightBold: {
        fontWeight: 'bold'
      },
      colorDarkGrey: {
        color: 'darkgrey'
      },
      //travel table
      travelTable: {
        flex: 1,
        width: width * 0.9,
        justifyContent: 'center', 
        alignSelf: 'center',
      },
      travelHeader: {
        color: 'black',
        fontSize: 25,
        marginBottom: '3%',
        width: '90%',

      },
      travelCellImage: {
        flex:1,
        height: (width*0.9) /2,
        padding: 0,
        margin: 0
      },
      travelCellTitle: {
        justifyContent: 'center', 
      },
      //profile
      profilePic: {
        height: width / 3, 
        width: width / 3, 
        borderRadius: 180
      }
      
});

export default styles;