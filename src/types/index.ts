export interface Confession {
    id: string;
    text?: string;
    title: String,
    audioUrl?: string;
    creatorName: string;
    likes: ConfessionLike[];
    comments: ConfessionComment[];
    postedAt: string; // ISO date string
}

export interface ConfessionLike {
    id: string;
    creatorName: string;
    confessionId: string;
    confession: Confession;
    createdAt: string;
}

export interface ConfessionComment {
    id: string;
    creatorName: string;
    confessionId: string;
    confession: Confession;
    text: string;
    createdAt: string;
    comments: ConfessionCommentComment[];
    likes: ConfessionCommentLike[];
}

export interface ConfessionCommentLike {
    id: string;
    creatorName: string;
    commentId: string;
    comment: ConfessionComment;
    createdAt: string;
}

export interface ConfessionCommentComment {
    id: string;
    creatorName: string;
    commentId: string;
    comment: ConfessionComment;
    createdAt: string;
}
