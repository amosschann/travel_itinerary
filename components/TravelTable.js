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
                <View style={styles.flexRow}>
                    <View style={[styles.flex3, styles.justifyVerticalCenter]}>
                        <Text style={styles.travelHeader}>{props.headerTitle}</Text>
                    </View>
                    <View style={[styles.flex1, styles.justifyVerticalCenter]}>
                        <TouchableOpacity onPress={() => props.navigate('TravelsScreen', { navigateType: props.navigateType })}>
                            <Text> View All → </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    return (
        <TableView style={styles.travelTable}>
            <TouchableOpacity onPress={() => props.navigate('ItineraryScreen', { travelid: 'palceholder' })}>
                <Section
                key={props.key}
                headerComponent={header()}
                hideSurroundingSeparators={true}
                style={{borderRadius: '10px'}}
                >
                    <Cell
                        key="travelTableCellPhoto"
                        contentContainerStyle={[styles.flexRow, styles.paddingLeft0, styles.paddingRight0, styles.borderRadiusTop]}
                        cellContentView={
                            <>
                                <Image source={image1} style={styles.travelCellImage} resizeMode="cover"/>
                                <Image source={image2} style={styles.travelCellImage} resizeMode="cover"/>
                            </>
                        }
                    />
                    <Cell
                        key="travelTableCellName"
                        contentContainerStyle={[styles.travelCellTitle, styles.borderRadiusBottom]}
                        cellContentView={
                            <View style={styles.justifyHorizontalCenter}>
                                <Text style={[styles.paddingUpDown5, styles.font20]}>{props.tripName}</Text>
                                <Text style={[styles.paddingUpDown5, styles.font15]}>{props.tripLocation}</Text>
                            </View>
                        }
                    />
                </Section>
            </TouchableOpacity>
        </TableView>
    );
};

