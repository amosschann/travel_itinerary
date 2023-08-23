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
      
      
});

export default styles;