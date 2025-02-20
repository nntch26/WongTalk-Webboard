
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

export interface UserProfile {
    fullname: string;
    username: string;
    email: string;
    posts: Post[];
    image: string;
    createdAt: string;
}

export interface RegisterForm {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}