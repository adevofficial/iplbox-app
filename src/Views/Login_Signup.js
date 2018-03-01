import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
    Container, Header,
    Content, Tab, Tabs,
    Form, Item, Label,
    Input, Button, Body,
    Title, Left, Right,
    H1
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Icons, LogoSvg } from "./../Assets";

const styles = StyleSheet.create({ btnText: { color: "white", fontSize: 20, fontWeight: "bold", padding: 5 } });

export default () => {
    return (
        <Container>
            <Grid style={{ backgroundColor: "#3f51b5", height: 20 }}>
                <Col></Col>
                <Col>
                    <View style={{ paddingTop: 20, alignItems: 'center' }}>
                        <Image source={Icons.AlexaIPL} style={{ width: 200, height: 200 }} />
                        <H1 style={{ padding: 15, fontWeight: "bold", color: "white" }}>IPL Box</H1>
                    </View>
                </Col>
                <Col></Col>
            </Grid>

            <Tabs style={{ backgroundColor: "#154360" }} initialPage={0}>
                <Tab heading="Login">
                    <Form>
                        <Item><Input placeholder="Username" /></Item>
                        <Item><Input placeholder="Password" /></Item>
                    </Form>
                    <Button style={{ margin: 15 }} full rounded primary><Text style={styles.btnText}> Login </Text></Button>
                </Tab>
                <Tab heading="Signup">
                    <Form>
                        <Item><Input placeholder="Username" /></Item>
                        <Item><Input placeholder="Password" /></Item>
                        <Item><Input placeholder="Re-Password" /></Item>
                    </Form>
                    <Button style={{ margin: 15 }} full rounded primary>
                        <Text style={styles.btnText}> Signup </Text>
                    </Button>

                </Tab>
            </Tabs>
        </Container>
    );
};