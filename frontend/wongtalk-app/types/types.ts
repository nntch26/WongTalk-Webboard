
export interface Topic {
    _id: string;
    name: string;
    description: string;
    icon: string;
}


export interface Post{
    data: any;
    _id: string;
    title: string;
    content: string;
    userId: User;
    topicId: Topic;
    commentCount: number;
    likes: number;
    createdAt: string;
    time: string,
}


export interface User {
    _id?: string;
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


// โพส ส่ง api
export interface PostData {
    title: string;
    content: string;
    topicId: string;
}

// คอมเม้น ส่ง api
export interface CommentData {
    content: string;
    postId: string;
}


// คอมเม้น
export interface Comment{
    _id : string,
    postId: Topic;
    userId : User
    content : string,
    createdAt: string;
   
}

// // เวลาคอมเม้น
// export interface CommentPack {
//     comment: Comment;
//     // timeComents: string;
// }

export interface PostDetail{
    Post: Post[];
    allComments: Comment[]
}

export interface UpdatePost {
    title: string;
    content: string;
}



// กำหนด type ของ props ที่ต้องใช้
// followButton.tsx
export interface FollowButtonProps {
    topicId: string;
    onFollowChange: (topicId: string) => void;
}

// profileHeadeer.tsx
export interface ProfileHeaderProps {
    profile?: User | null;
    onLogout: () => void;
    isShow: boolean;
    setIsShow: (show: boolean) => void;
}

// profileTab.tsx
export interface ProfileTabsProps {
    mypost: boolean;
    setMyPost: (value: boolean) => void;
}

// topicList.tsx
export interface TopicListProps {
    topics: Topic[];
    selectedTopic: string | null;
    handleSelect: (e: React.MouseEvent, topicId: string) => void;
    handleUnfollow: (topicId: string, e: React.MouseEvent) => Promise<void>;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
}

