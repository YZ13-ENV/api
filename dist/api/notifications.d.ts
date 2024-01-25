import { DocNotification, Notification } from '../types/notifications';
export declare const notifications: {
    push: (message: string, receiver: string, link?: string) => Promise<DocNotification | null>;
    patch: (id: string, notId: string, notification: Partial<Notification>) => Promise<DocNotification | null>;
    delete: (id: string, notId: string) => Promise<boolean>;
    all: (id: string) => Promise<DocNotification[]>;
};
