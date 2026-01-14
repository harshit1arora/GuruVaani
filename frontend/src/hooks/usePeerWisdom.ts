import { useState, useEffect } from 'react';

// Types
interface Response {
  id: string;
  content: string;
  author: string;
  location: string;
  helpfulCount: number;
  isHelpful: boolean;
  createdAt: string;
}

export interface Post {
  id: string;
  question: string;
  author: string;
  location: string;
  createdAt: string;
  responses: Response[];
  isExpanded: boolean;
  newResponse: string;
}

const STORAGE_KEY = 'shiksha-mitra-peer-wisdom';

// Mock data for initial load
const mockPosts: Post[] = [
  {
    id: "1",
    question: "Multigrade Class: How to teach English to Class 3 while Class 4 does math?",
    author: "Anita",
    location: "Uttar Pradesh",
    createdAt: "2 hours ago",
    responses: [
      {
        id: "1-1",
        content: "I use this rotating station method where I set up 3 activity stations. Class 3 does English worksheets at one station, Class 4 does math puzzles at another, and I work with a small group at the third. Every 15 minutes, they rotate.",
        author: "Sunita",
        location: "Jharkhand",
        helpfulCount: 42,
        isHelpful: false,
        createdAt: "1 hour ago"
      },
      {
        id: "1-2",
        content: "Try this peer teaching chart. I train my Class 4 students to be 'math buddies' who can help their peers while I focus on teaching English to Class 3. It builds leadership skills too!",
        author: "Rajesh",
        location: "Odisha",
        helpfulCount: 37,
        isHelpful: false,
        createdAt: "45 minutes ago"
      }
    ],
    isExpanded: false,
    newResponse: ""
  }
];

export const usePeerWisdom = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load posts from local storage on initial render
  useEffect(() => {
    const loadPosts = () => {
      try {
        const storedPosts = localStorage.getItem(STORAGE_KEY);
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
        } else {
          // If no posts in storage, use mock data
          setPosts(mockPosts);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mockPosts));
        }
      } catch (error) {
        console.error('Error loading posts from local storage:', error);
        setPosts(mockPosts);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Save posts to local storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      } catch (error) {
        console.error('Error saving posts to local storage:', error);
      }
    }
  }, [posts, isLoading]);

  // Add a new post
  const addPost = (question: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      question,
      author: "You",
      location: "Your Location",
      createdAt: "Just now",
      responses: [],
      isExpanded: false,
      newResponse: ""
    };
    setPosts([newPost, ...posts]);
  };

  // Toggle post expansion
  const togglePostExpansion = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, isExpanded: !post.isExpanded } : post
    ));
  };

  // Update new response text for a post
  const updateNewResponse = (postId: string, text: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, newResponse: text } : post
    ));
  };

  // Add a response to a post
  const addResponse = (postId: string, content: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      const newResponse: Response = {
        id: `${postId}-${Date.now()}`,
        content,
        author: "You",
        location: "Your Location",
        helpfulCount: 0,
        isHelpful: false,
        createdAt: "Just now"
      };
      
      setPosts(posts.map(p => 
        p.id === postId 
          ? { 
              ...p, 
              responses: [...p.responses, newResponse],
              newResponse: ""
            } 
          : p
      ));
    }
  };

  // Toggle helpful status of a response
  const toggleHelpful = (postId: string, responseId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          responses: post.responses.map(response => {
            if (response.id === responseId) {
              const newHelpfulCount = response.isHelpful 
                ? response.helpfulCount - 1 
                : response.helpfulCount + 1;
              return {
                ...response,
                isHelpful: !response.isHelpful,
                helpfulCount: newHelpfulCount
              };
            }
            return response;
          })
        };
      }
      return post;
    }));
  };

  return {
    posts,
    isLoading,
    addPost,
    togglePostExpansion,
    updateNewResponse,
    addResponse,
    toggleHelpful
  };
};
