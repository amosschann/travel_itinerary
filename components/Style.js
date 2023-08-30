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
        marginBottom: '50px',
        width: width,
      },
      //scroll container
      scrollView: {
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
      flexRow: {
        flexDirection: 'row'
      },
      //justify content
      justifyBottom: {
        justifyContent: 'flex-end'
      },
      justifyVerticalCenter: {
        justifyContent: 'center'
      },
      justifyHorizontalCenter: {
        alignItems: 'center'
      },
      //widths
      width100: {
        width: '100%'
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
      //height
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
      heightVW2: {
        height: height*0.02
      },
      //padding
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
      //borders
      borderBlack: {
        borderWidth: 1,
        borderColor: "#000000",
      },
      //background color
      backgroundWhite: {
        backgroundColor: '#fff',
      },
      //border
      borderRadiusTop: {
        borderTopRightRadius: '20px',
        borderTopLeftRadius: '20px',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        overflow: 'hidden'
      },
      borderRadiusBottom: {
        borderBottomRightRadius: '20px',
        borderBottomLeftRadius: '20px',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        overflow: 'hidden',
      },
      //font
      font20: {
        fontSize: 20,
      },
      font15: {
        fontSize: 15,
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
      
});

export default styles;