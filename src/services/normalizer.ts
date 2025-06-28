interface NormalizedData {
    id: string;
    timestamp: string;
    value: number;
    unit: string;
    location?: string;
}

export function normalizeDeviceData(devicePayload: any): NormalizedData | null {
    try {
        if (devicePayload?.type === 'thermi') {
            return {
                id: devicePayload.deviceId,
                timestamp: devicePayload.ts || new Date().toISOString(),
                value: Number(devicePayload.temp),
                unit: 'C',
                location: devicePayload.location || 'unknown'
            };
        }

        return null;
    } catch (error) {
        console.error('Normalization failed:', (error as Error).message);
        return null;
    }
}