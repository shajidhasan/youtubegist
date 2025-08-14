export interface AppwriteDocument {
    $id: string;
    $collectionId: string;
    $databaseId: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $sequence: number;
}

export interface VideoMeta {
    title: string;
    description: string;
    channelId: string;
    author: string;
    transcript: string;
}

export interface SummaryData extends AppwriteDocument {
    title: string;
    summary: string;
    keyTakeaway: string;
    keyPoints: string[];
    coreTerms: string[]
    videoId: string;
    meta: string;
    hits?: number
}
