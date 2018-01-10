// Generated by https://quicktype.io

export interface Card {
    number:              number;
    name:                string;
    actions_collections: ActionsCollection[];
}

export interface ActionsCollection {
    type:         number;
    mono_actions: MonoAction[];
}

export interface MonoAction {
    drop:     boolean;
    resource: number;
}

// Converts JSON strings to/from your types
export module Convert {
    export function toCard(json: string): Card[] {
        return JSON.parse(json);
    }

    export function cardtopLevelToJson(value: Card[]): string {
        return JSON.stringify(value, null, 2);
    }
}