import { DocSpeedInsight, SpeedInsight } from '../types/speed-insights';
export declare const speed_insights: {
    getAll: (appId: string) => Promise<DocSpeedInsight[]>;
    getRange: (appId: string, start: number, end: number) => Promise<DocSpeedInsight[]>;
    upload: (appId: string, metric: SpeedInsight) => Promise<any>;
    uploadBatch: (appId: string, metrics: SpeedInsight[]) => Promise<any>;
    delete: (appId: string, metricId: string) => Promise<any>;
    deleteBatch: (appId: string, metrics: string[]) => Promise<any>;
};
