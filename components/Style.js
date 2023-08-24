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
      //borders
      borderBlack: {
        borderWidth: 1,
        borderColor: "#000000",
      },
      //background color
      backgroundWhite: {
        backgroundColor: '#fff',
      },
      //travel table
      travelTable: {
        flex: 1,
        width: width * 0.8,
        justifyContent: 'center', 
        alignSelf: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        margin: '2%',
        paddingBottom: "4%",
      },
      travelCellTitle: {
        justifyContent: 'center', 
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 2,
        backgroundColor: 'grey'
      },
      travelCellPhoto1: {
        flex: 1,
      },
      travelCellPhoto2: {
        backgroundColor: 'blue',
        flex: 1
      },
      
      
});

export default styles;