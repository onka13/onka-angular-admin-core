/**
 * Page Type
 */
export type OnkaPageType = 'list' | 'detail' | 'edit' | 'create' | 'none';

/**
 * Page status
 */
export type OnkaPageStatus = 'loading' | 'no-data' | 'done' | '';

export type MessageType = 'success' | 'info' | 'error' | 'warning';

export type OnkaOption = { key: string; label: any }