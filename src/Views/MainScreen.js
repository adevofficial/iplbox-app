import React, { Component } from 'react';

import { AppRegistry, StyleSheet, Image, BackHandler } from 'react-native';
import {
    Text, View, Container, Button,
    Header, Footer, Content, Body,
    Left, Right, Card, CardItem,
    Thumbnail, Toast, Fab
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Ionicons';

window.navigator.userAgent = 'react-native';
import Moment from 'react-moment';
import isEmpty from "lodash/isEmpty";
import { Icons, Logo } from "./../Assets";

export default class MainScreen extends Component {

    constructor(props) {
        super(props);

        this.getData();
        this.state = {
            logsList: [],
            active: 'true',
            showToast: 'false'
        };
        this.LogData = [
            // {
            //     timestamp: "1000",
            //     answer: "Alexa",
            //     query_text: "What is your lovers name",
            //     response_time: "1000"
            // }
        ];
    }

    getData = () => {
        setTimeout(() => {
            fetch("https://bot.defect94.hasura-app.io/logs")
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((response) => {
                    if (!isEmpty(this.LogData)) {
                        if (response.timestamp !== this.LogData[0].timestamp && !isEmpty(response.timestamp))
                            this.LogData.unshift(response);
                    } else {
                        this.LogData.unshift(response);
                    }

                    this.setState({ logsList: this.LogData });
                    this.getData();
                }).catch((err) => {
                    this.getData();
                });
        }, 1000);
    }


    render() {
        let { state } = this;
        return (
            <Container>
                <Header style={{ marginTop: 24, backgroundColor: '#154360' }} >
                    <Left>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }} >
                            IPLBox
                        </Text>
                    </Left>
                    <Body />
                    <Right />
                </Header>
                <Content>
                    {state.logsList.map((singleQuery, i) => (
                        <Card style={{ margin: 20 }} key={i}>
                            <CardItem >
                                <Left>
                                    <Thumbnail source={Icons.User} style={styles.title_thumbnail} />
                                    <Text style={styles.title_text} >
                                        Query
                                </Text>
                                </Left>
                                <Body />
                                <Right style={styles.time_style} >
                                    <Thumbnail source={Icons.Time} style={styles.time_thumbnail} />
                                    <Text style={styles.time_text} > {singleQuery.timestamp} </Text>
                                </Right>
                            </CardItem>
                            <CardItem style={styles.answer_item} >
                                <Text style={styles.answer_text} >
                                    {singleQuery.query_text}
                                </Text>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={Icons.AlexaIPL} style={styles.title_thumbnail} />
                                    <Text style={styles.title_text}> Response </Text>
                                </Left>
                                <Body />
                                <Right style={styles.time_style}>
                                    <Thumbnail source={Icons.Time} style={styles.time_thumbnail} />
                                    <Text style={styles.time_text} > {singleQuery.timestamp}</Text>
                                </Right>
                            </CardItem>
                            <CardItem style={styles.answer_item} >
                                <Text style={styles.answer_text} >
                                    {singleQuery.answer}
                                </Text>
                            </CardItem>
                            <CardItem >
                                <Left>
                                    <Thumbnail source={Icons.ResponseTime} style={styles.title_thumbnail} />
                                    <Text style={styles.title_text} >
                                        Response Time :
                                </Text>
                                    <Text style={styles.answer_text} > {singleQuery.response_time} seconds  </Text>
                                </Left>
                            </CardItem>
                        </Card>
                    ))}


                </Content>
                <View style={{ flex: 1 }}>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        style={{ backgroundColor: '#154360' }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="ios-cube-outline" />
                        <Button style={{ backgroundColor: '#154360' }} onPress={() => {
                            this.setState({ logsList: [] });
                            console.log('Array Cleared')
                        }}   >
                            <Icon name="ios-close-circle-outline" color="white" />

                        </Button>
                    </Fab>
                </View>

            </Container>
        );
    }
}
const styles = StyleSheet.create({

    title_thumbnail: { width: 15, height: 15 },
    title_text: { fontSize: 15, fontWeight: 'bold' },
    time_style: { flexDirection: 'row', justifyContent: 'flex-end' },
    time_thumbnail: { width: 10, height: 10, marginRight: 5 },
    time_text: { fontSize: 10 },
    answer_item: { paddingTop: 0 },
    answer_text: { fontSize: 16 },
    error_text: { fontSize: 16, color: 'red' }
});

