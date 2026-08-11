export interface UserNotification {
  titleKey: string;
  titleParam?: Record<string, unknown>;
  messageKey?: string;
  messageParam?: Record<string, unknown>;
}
