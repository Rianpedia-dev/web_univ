'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ChatVisibilityContextType {
    isChatVisible: boolean;
    setIsChatVisible: (visible: boolean) => void;
    isChatOpen: boolean;
    setIsChatOpen: (open: boolean) => void;
    toggleChatVisibility: () => void;
}

const ChatVisibilityContext = createContext<ChatVisibilityContextType | undefined>(undefined);

export function ChatVisibilityProvider({ children }: { children: React.ReactNode }) {
    const [isChatVisible, setIsChatVisible] = useState<boolean>(true);
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('unpal-chat-visible');
        if (saved !== null) {
            setIsChatVisible(saved === 'true');
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('unpal-chat-visible', isChatVisible.toString());
        }
    }, [isChatVisible, isInitialized]);

    const toggleChatVisibility = () => setIsChatVisible(prev => !prev);

    return (
        <ChatVisibilityContext.Provider value={{
            isChatVisible,
            setIsChatVisible,
            isChatOpen,
            setIsChatOpen,
            toggleChatVisibility
        }}>
            {children}
        </ChatVisibilityContext.Provider>
    );
}

export function useChatVisibility() {
    const context = useContext(ChatVisibilityContext);
    if (context === undefined) {
        throw new Error('useChatVisibility must be used within a ChatVisibilityProvider');
    }
    return context;
}
