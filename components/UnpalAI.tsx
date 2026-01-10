'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageCircle,
    X,
    Send,
    ThumbsUp,
    ThumbsDown,
    Bot,
    User,
    Loader2,
    Sparkles
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

// Generate unique session ID
function generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Komponen untuk menampilkan pesan
function ChatMessage({
    message,
    onFeedback
}: {
    message: { id: string; role: string; parts: Array<{ type: string; text?: string }> };
    onFeedback?: (messageId: string, rating: number) => void;
}) {
    const isUser = message.role === 'user';
    const [feedbackGiven, setFeedbackGiven] = useState<number | null>(null);

    // Extract text from parts
    const content = message.parts
        .map(part => {
            if (part.type === 'text') return part.text || '';
            return '';
        })
        .join('');

    const handleFeedback = (rating: number) => {
        if (onFeedback && !feedbackGiven) {
            onFeedback(message.id, rating);
            setFeedbackGiven(rating);
        }
    };

    if (!content) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "flex gap-3 p-3 rounded-lg",
                isUser
                    ? "bg-primary/10 ml-8"
                    : "bg-muted/50 mr-8"
            )}
        >
            {/* Avatar */}
            <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
            )}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="text-xs font-medium mb-1 text-muted-foreground">
                    {isUser ? 'Anda' : 'Pal'}
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                    {isUser ? (
                        <p className="whitespace-pre-wrap">{content}</p>
                    ) : (
                        <ReactMarkdown
                            components={{
                                ul: ({ children }) => (
                                    <ul className="list-disc pl-4 space-y-1">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal pl-4 space-y-1">{children}</ol>
                                ),
                                li: ({ children }) => (
                                    <li className="text-sm">{children}</li>
                                ),
                                p: ({ children }) => (
                                    <p className="mb-2 last:mb-0">{children}</p>
                                ),
                                strong: ({ children }) => (
                                    <strong className="font-semibold text-foreground">{children}</strong>
                                ),
                                a: ({ href, children }) => (
                                    <a href={href} className="text-primary underline hover:no-underline" target="_blank" rel="noopener noreferrer">
                                        {children}
                                    </a>
                                ),
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    )}
                </div>

                {/* Feedback buttons for assistant messages */}
                {!isUser && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">Apakah jawaban ini membantu?</span>
                        <button
                            onClick={() => handleFeedback(2)}
                            disabled={feedbackGiven !== null}
                            className={cn(
                                "p-1 rounded hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors",
                                feedbackGiven === 2 && "bg-green-100 dark:bg-green-900/30 text-green-600"
                            )}
                            title="Membantu"
                        >
                            <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                            onClick={() => handleFeedback(1)}
                            disabled={feedbackGiven !== null}
                            className={cn(
                                "p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors",
                                feedbackGiven === 1 && "bg-red-100 dark:bg-red-900/30 text-red-600"
                            )}
                            title="Tidak membantu"
                        >
                            <ThumbsDown className="w-3 h-3" />
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// Initial welcome message
const WELCOME_MESSAGE = {
    id: 'welcome',
    role: 'assistant' as const,
    parts: [
        {
            type: 'text' as const,
            text: 'Halo! 👋 Saya **Pal**, asisten virtual kampus. Saya siap membantu Anda dengan informasi seputar:\n\n- 📚 Program studi & fakultas\n- 📝 Pendaftaran mahasiswa baru\n- 💰 Biaya pendidikan & beasiswa\n- 📅 Event & kegiatan kampus\n- 🏢 Fasilitas kampus\n\nAda yang bisa saya bantu hari ini?',
        },
    ],
};

// Komponen utama UnpalAI
export function UnpalAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [sessionId] = useState(() => generateSessionId());
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat',
            body: { sessionId },
        }),
    });

    // Add welcome message to display
    const displayMessages = [WELCOME_MESSAGE, ...messages];

    // Determine loading state
    const isLoading = status === 'submitted' || status === 'streaming';

    // Scroll to bottom saat ada pesan baru
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input saat panel dibuka
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Handle feedback
    const handleFeedback = useCallback(async (messageId: string, rating: number) => {
        try {
            await fetch('/api/chat', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messageId, rating }),
            });
        } catch (error) {
            console.error('Failed to submit feedback:', error);
        }
    }, []);

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            sendMessage({ text: input });
            setInput('');
        }
    };

    // Handle keyboard shortcuts
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim() && !isLoading) {
                sendMessage({ text: input });
                setInput('');
            }
        }
    };

    // Quick action buttons
    const quickActions = [
        { label: 'Program Studi', query: 'Apa saja program studi yang tersedia?' },
        { label: 'Biaya Kuliah', query: 'Berapa biaya kuliah di kampus ini?' },
        { label: 'Beasiswa', query: 'Apa saja beasiswa yang tersedia?' },
        { label: 'Pendaftaran', query: 'Bagaimana cara mendaftar sebagai mahasiswa baru?' },
    ];

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-6 right-6 z-50",
                    "w-14 h-14 rounded-full",
                    "bg-gradient-to-br from-amber-400 via-orange-500 to-red-500",
                    "text-white shadow-lg shadow-orange-500/30",
                    "flex items-center justify-center",
                    "hover:scale-110 active:scale-95 transition-transform",
                    "focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2",
                    isOpen && "hidden"
                )}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                aria-label="Buka chat dengan Pal"
            >
                <MessageCircle className="w-6 h-6" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300" />
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={cn(
                            "fixed z-50",
                            "bottom-6 right-6",
                            "w-[380px] max-w-[calc(100vw-48px)]",
                            "h-[600px] max-h-[calc(100vh-100px)]",
                            "bg-background/95 backdrop-blur-xl",
                            "border border-border/50 rounded-2xl",
                            "shadow-2xl shadow-black/20",
                            "flex flex-col overflow-hidden"
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Pal - UnpalAI</h3>
                                    <p className="text-xs text-white/80">Asisten Virtual Kampus</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                                aria-label="Tutup chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {displayMessages.map((message) => (
                                <ChatMessage
                                    key={message.id}
                                    message={message}
                                    onFeedback={message.role === 'assistant' && message.id !== 'welcome' ? handleFeedback : undefined}
                                />
                            ))}

                            {/* Loading indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-3 p-3 rounded-lg bg-muted/50 mr-8"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm text-muted-foreground">Pal sedang mengetik...</span>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions (show only for initial state) */}
                        {messages.length === 0 && (
                            <div className="px-4 pb-2">
                                <div className="flex flex-wrap gap-2">
                                    {quickActions.map((action) => (
                                        <button
                                            key={action.label}
                                            onClick={() => {
                                                setInput(action.query);
                                                setTimeout(() => inputRef.current?.focus(), 0);
                                            }}
                                            className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Form */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
                            <div className="flex gap-2">
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ketik pertanyaan Anda..."
                                    rows={1}
                                    disabled={status !== 'ready'}
                                    className={cn(
                                        "flex-1 resize-none",
                                        "px-4 py-2.5 rounded-xl",
                                        "bg-muted/50 border border-border/50",
                                        "text-sm placeholder:text-muted-foreground",
                                        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                                        "disabled:opacity-50 disabled:cursor-not-allowed",
                                        "transition-all"
                                    )}
                                    style={{
                                        minHeight: '44px',
                                        maxHeight: '120px',
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className={cn(
                                        "flex-shrink-0 w-11 h-11 rounded-xl",
                                        "bg-gradient-to-br from-amber-400 to-orange-500",
                                        "text-white",
                                        "flex items-center justify-center",
                                        "hover:opacity-90 active:scale-95",
                                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
                                        "transition-all"
                                    )}
                                    aria-label="Kirim pesan"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Send className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <p className="text-[10px] text-muted-foreground text-center mt-2">
                                Tekan Enter untuk mengirim, Shift+Enter untuk baris baru
                            </p>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
