
export interface Topic {
    _id: string;
    name: string;
    description: string;
    icon: string;
}


export interface User{
    _id: string;
    fullname: string;
    
}

export interface Post{
    _id: string;
    title: string;
    content: string;
    userId: User;
    topicId: Topic;
    commentCount: number;
    likes: number;
    createdAt: string;
    time: string,
    createdPost: string
}


