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
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { ChatFloatingButton } from './ChatFloatingButton';
import { useChatVisibility } from './ChatVisibilityProvider';

// Generate unique session ID
function generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// ... inside the file, I'll replace the imports and the start of the function
// wait, I should do it in chunks or properly.

// Let's replace from line 20 down to the start of the function.

// Komponen untuk menampilkan pesan
function ChatMessage({
    message,
    onFeedback
}: {
    message: { id: string; role: string; content?: string; parts?: Array<{ type: string; text?: string }> };
    onFeedback?: (messageId: string, rating: number) => void;
}) {
    const isUser = message.role === 'user';
    const [feedbackGiven, setFeedbackGiven] = useState<number | null>(null);

    // Extract text from parts or content
    const content = message.content || (message.parts
        ? message.parts
            .map(part => {
                if (part.type === 'text') return part.text || '';
                return '';
            })
            .join('')
        : '');

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
                "flex gap-2 px-1 w-full",
                isUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            {/* Avatar */}
            <div className={cn(
                "flex-shrink-0 w-10 h-10 flex items-center justify-center overflow-hidden relative",
                "rounded-full"
            )}>
                {isUser ? (
                    <Image
                        src="/images/orng1.png"
                        alt="User"
                        fill
                        className="object-cover"
                    />
                ) : (
                    <Image
                        src="/images/robot.png"
                        alt="AI Robot"
                        fill
                        className="object-contain"
                    />
                )}
            </div>

            {/* Bubble Container */}
            <div className={cn(
                "flex flex-col max-w-[85%] min-w-0",
                isUser ? "items-end" : "items-start"
            )}>
                {/* Name Label */}
                <span className="text-[10px] font-semibold mb-1 text-muted-foreground px-1 uppercase tracking-wider">
                    {isUser ? 'Anda' : 'Campus Assistant'}
                </span>

                {/* Message Bubble */}
                <div className={cn(
                    "relative p-3 rounded-2xl text-sm shadow-sm w-full outline-none",
                    isUser
                        ? "bg-[#008080] text-white rounded-tr-none"
                        : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-foreground rounded-tl-none"
                )}>
                    {/* Tail SVG */}
                    <div className={cn(
                        "absolute top-0 w-2 h-2",
                        isUser
                            ? "right-[-8px] text-[#008080]"
                            : "left-[-8px] text-white dark:text-slate-900"
                    )}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                            {isUser ? (
                                <path d="M0 0 L8 0 L0 8 Z" />
                            ) : (
                                <path d="M8 0 L0 0 L8 8 Z" />
                            )}
                        </svg>
                        {!isUser && (
                            <div className="absolute top-[-1px] left-[-0.5px] w-[9px] h-[1px] bg-slate-100 dark:border-slate-800 -rotate-45 origin-top-left opacity-50" />
                        )}
                    </div>

                    <div className="prose prose-sm dark:prose-invert max-w-none break-words leading-relaxed overflow-wrap-anywhere">
                        {isUser ? (
                            <p className="whitespace-pre-wrap text-white">{content}</p>
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
                                    a: ({ href, children }) => {
                                        const isWhatsApp = href?.includes('wa.me');
                                        if (isWhatsApp) {
                                            return (
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all text-xs font-bold no-underline my-2 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                                                >
                                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                    </svg>
                                                    {children}
                                                </a>
                                            );
                                        }
                                        return (
                                            <a href={href} className="text-primary underline hover:no-underline" target="_blank" rel="noopener noreferrer">
                                                {children}
                                            </a>
                                        );
                                    },
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        )}
                    </div>

                    {/* Feedback buttons for assistant messages */}
                    {!isUser && (
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] text-muted-foreground italic">Bermanfaat?</span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleFeedback(2)}
                                    disabled={feedbackGiven !== null}
                                    className={cn(
                                        "p-1 rounded-md transition-all",
                                        feedbackGiven === 2
                                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
                                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
                                    )}
                                >
                                    <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={() => handleFeedback(1)}
                                    disabled={feedbackGiven !== null}
                                    className={cn(
                                        "p-1 rounded-md transition-all",
                                        feedbackGiven === 1
                                            ? "bg-red-100 text-red-600 dark:bg-red-900/30"
                                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
                                    )}
                                >
                                    <ThumbsDown className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div >
    );
}



// Komponen utama UnpalAI
export function UnpalAI({ contactPhone, campusName = "Kampus" }: { contactPhone?: string; campusName?: string }) {
    const { isChatVisible, setIsChatVisible, isChatOpen, setIsChatOpen } = useChatVisibility();
    const [mounted, setMounted] = useState(false);
    const [sessionId] = useState(() => generateSessionId());
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { messages, sendMessage, status, error: chatError } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat',
            body: { sessionId },
        }),
        onError: (err) => {
            console.error('Chat error:', err);
        },
    });

    // Initial welcome message dynamic
    const dynamicWelcomeMessage = {
        id: 'welcome',
        role: 'assistant' as const,
        parts: [
            {
                type: 'text' as const,
                text: `Selamat datang di **${campusName}**! 👋\n\nSaya asisten virtual yang siap membantu Anda memberikan informasi mengenai **${campusName}**, pendaftaran mahasiswa baru, Fakultas, Program Studi,fasilitas kampus,dll secara cepat.\n\nSilakan langsung ketik pertanyaan Anda di bawah ini untuk mulai berdiskusi.`,
            },
        ],
    };

    // Add welcome message to display
    const displayMessages = [dynamicWelcomeMessage, ...messages];

    // Determine loading state
    const isLoading = status === 'submitted' || status === 'streaming';


    // Scroll to bottom saat ada pesan baru
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input saat panel dibuka
    useEffect(() => {
        if (isChatOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isChatOpen]);

    // Handle feedback
    const handleFeedback = useCallback(async (messageId: string, rating: number) => {
        try {
            // Find the last user question before this assistant message
            const messageIndex = messages.findIndex(m => m.id === messageId);
            let userQuestion = '';
            if (messageIndex > 0) {
                for (let i = messageIndex - 1; i >= 0; i--) {
                    if (messages[i].role === 'user') {
                        const msg = messages[i] as unknown as { role: string; parts?: Array<{ type: string; text?: string }> };
                        userQuestion = msg.parts
                            ? msg.parts
                                .filter((part) => part.type === 'text')
                                .map((part) => part.text || '')
                                .join('')
                            : '';
                        break;
                    }
                }
            }

            await fetch('/api/chat', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messageId,
                    rating,
                    sessionId,
                    userQuestion,
                }),
            });
        } catch (error) {
            console.error('Failed to submit feedback:', error);
        }
    }, [sessionId, messages]);

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
                const form = e.currentTarget.closest('form');
                if (form) {
                    form.requestSubmit();
                }
            }
        }
    };

    if (!mounted || !isChatVisible) return null;

    return (
        <>
            {/* Floating Button */}
            <ChatFloatingButton
                onClick={() => setIsChatOpen(true)}
                isOpen={isChatOpen}
                onDismiss={() => setIsChatVisible(false)}
            />

            {/* Chat Panel */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={cn(
                            "fixed z-40",
                            "bottom-6 right-6",
                            "w-[380px] max-w-[calc(100vw-48px)]",
                            "h-[600px] max-h-[calc(100vh-100px)]",
                            "bg-background/95 backdrop-blur-xl",
                            "border border-white/20 shadow-2xl shadow-indigo-500/10",
                            "rounded-2xl flex flex-col overflow-hidden",
                            "dark:shadow-black/50"
                        )}
                    >
                        {/* Header Professional */}
                        <div className="flex items-center justify-between px-5 py-2 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white border-b border-white/10 relative overflow-hidden">

                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl translate-y-10 -translate-x-10"></div>

                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-14 h-14 flex items-center justify-center relative">
                                    <Image
                                        src="/images/robot.png"
                                        alt="AI Robot"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base tracking-tight text-white">AI Campus</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                        <p className="text-[10px] font-medium text-indigo-200 uppercase tracking-wider">Online Assistant</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 relative z-10">
                                {contactPhone && (
                                    <a
                                        href={`https://wa.me/${contactPhone.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-0.5 group/wa transition-transform hover:scale-105"
                                        aria-label="Hubungi WhatsApp"
                                        title="Hubungi Staf via WhatsApp"
                                    >
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 border border-emerald-400 text-white shadow-lg group-hover/wa:bg-white/10 group-hover/wa:border-white/20 transition-all">
                                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                        </div>
                                        <span className="text-[9px] font-bold uppercase tracking-tight text-white/80 group-hover/wa:text-white transition-colors">Staff</span>
                                    </a>
                                )}
                                <div className="w-[1px] h-5 bg-white/10 mx-0.5" />
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                                    aria-label="Tutup chat"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
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
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden relative">
                                        <Image
                                            src="/images/robot.png"
                                            alt="AI Robot"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm text-muted-foreground italic">Sedang mengetik...</span>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />

                            {/* Error state */}
                            {chatError && (
                                <div className="p-3 mb-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs text-center">
                                    <p>Maaf, terjadi kesalahan pada koneksi. Silakan coba lagi.</p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="mt-1 underline hover:no-underline"
                                    >
                                        Muat ulang halaman
                                    </button>
                                </div>
                            )}
                        </div>

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
                                    disabled={status === 'streaming' || status === 'submitted'}
                                    className={cn(
                                        "flex-1 resize-none",
                                        "px-4 py-3 rounded-2xl",
                                        "bg-white/50 dark:bg-slate-900/50",
                                        "border border-indigo-200/50 dark:border-indigo-800/30",
                                        "text-sm placeholder:text-muted-foreground/60",
                                        "focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
                                        "disabled:opacity-50 disabled:cursor-not-allowed",
                                        "transition-all duration-200 shadow-inner"
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
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
