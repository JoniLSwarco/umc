import { client } from './mqtt/client';
import { normalizeDeviceData } from './services/normalizer';

client.on('message', (topic, message) => {
    try {
        const raw = JSON.parse(message.toString());
        const normalized = normalizeDeviceData(raw);

        if (normalized) {
            client.publish(process.env.MQTT_PUB_TOPIC || 'test/v1', JSON.stringify(normalized));
            console.log('Published normalized data:', normalized);
        } else {
            console.warn('Received unprocessable message on topic', topic);
        }
    } catch (err) {
        console.error('Invalid JSON message:', err);
    }
});