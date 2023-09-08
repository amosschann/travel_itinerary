import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import styles from '../components/Style';


export default function TravelTable ({ props }) {
    let image1, image2;
    if (props.type === "default1") {
        image1 = require('../assets/travelphoto1.jpg');
        image2 = require('../assets/travelphoto2.jpg');
    } else if (props.type === "default2") {
        image1 = require('../assets/travelphoto3.jpeg');
        image2 = require('../assets/travelphoto4.jpg');
    }

    function header() {
        if (props.header) {
            return(
                <View style={[styles.flexRow, styles.paddingUpDown5]}>
                    <View style={[styles.flex3, styles.justifyVerticalCenter]}>
                        <Text style={[styles.travelHeader, styles.colorDarkBlue]}>{props.headerTitle}</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigate('TravelsScreen', { navigateType: props.navigateType })}>
                        <View style={[styles.flex1, styles.justifyVerticalCenter]}>
                            <Text style={styles.colorDarkBlue}> View All → </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
            );
        }
    }

    return (
        <TableView style={[styles.travelTable]}>
            
                <Section
                    headerComponent={header()}
                    hideSurroundingSeparators={true}
                    roundedCorners={true}
                >
                    <TouchableOpacity style={[styles.borderRadiusTop, styles.borderRadiusBottom]} onPress={() => props.navigate('ItineraryScreen', { travelid: 'palceholder' })}>
                        <Cell
                            contentContainerStyle={[styles.flexRow, styles.paddingLeft0, styles.paddingRight0]}
                            cellContentView={
                                <>
                                    <Image source={image1} style={styles.travelCellImage} resizeMode="cover"/>
                                    <Image source={image2} style={styles.travelCellImage} resizeMode="cover"/>
                                </>
                            }
                        />
                        <Cell
                            contentContainerStyle={[styles.travelCellTitle, styles.backgroundDarkBlue]}
                            cellContentView={
                                <View style={styles.justifyHorizontalCenter}>
                                    <Text style={[styles.paddingUpDown5, styles.font20, styles.colorWhite]}>{props.tripName}</Text>
                                    <Text style={[styles.paddingUpDown5, styles.font15, styles.colorWhite]}>{props.tripLocation}</Text>
                                </View>
                            }
                        />
                    </TouchableOpacity>
                </Section>
        </TableView>
    );
};

