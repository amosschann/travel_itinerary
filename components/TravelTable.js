import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import styles from '../components/Style';


export default function TravelTable ({ prop }) {
    return (
        <TableView style={styles.travelTable}>
            <Section
            key="item"
            header="test"
            hideSeparator
            separatorTintColor="#000000"
            style={{backgroundColor: "blue"}}
        />
            <View style={styles.rowContainer}>
            <Cell
                key="travelTableCellPhoto1"
                contentContainerStyle={styles.travelCellPhoto1}
                cellContentView={
                    <View >
                    <Text>Photo 1</Text>
                    </View>
                }
            />
            <Cell
                key="travelTableCellPhoto2"
                contentContainerStyle={styles.travelCellPhoto2}
                cellContentView={
                    <View >
                    <Text>Photo 2</Text>
                    </View>
                }
            />
            </View>
            <Cell
                key="travelTableCell"
                contentContainerStyle={styles.travelCellTitle}
                cellContentView={
                    <View >
                    <Text>Name of travel</Text>
                    </View>
                }
            />
        </TableView>
    );
};