import { connect, MqttClient } from 'mqtt';
import dotenv from 'dotenv';
dotenv.config();

const client: MqttClient = connect(process.env.MQTT_HOST || 'mqtt://localhost', {
    port: Number(process.env.MQTT_PORT || '1883'),
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
});

client.on('connect', () => {
    console.log('UMC connected to MQTT broker');
    client.subscribe(process.env.MQTT_SUB_TOPIC || 'test/v1', (err) => {
        if (err) {
            console.error('Subscription error:', err);
        } else {
            console.log(`Subscribed to topic: ${process.env.MQTT_SUB_TOPIC}`);
        }
    });
});

export { client };