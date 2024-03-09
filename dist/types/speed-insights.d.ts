import { DocData } from "./common";
export type DeviceType = "desktop" | "mobile";
export type MetricApp = {
    name: string;
};
export type Metric = {
    id: string;
    name: string;
    navigationType: string;
    rating: string;
    value: number;
    delta?: number;
    entries?: object[];
};
export type SpeedInsight = {
    path: string;
    createdAt: number;
    type: DeviceType;
    metric: Metric;
};
export type DocSpeedInsight = DocData<SpeedInsight>;
