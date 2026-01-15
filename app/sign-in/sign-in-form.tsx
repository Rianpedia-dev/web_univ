"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { signIn, authClient } from "@/lib/auth-client";
import { Loader2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SignInFormProps {
    universityName?: string;
    universityLogo?: string;
}

export default function SignInForm({ universityName, universityLogo }: SignInFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn.email({
                email,
                password,
            });

            if (result.error) {
                console.error("Sign in result error details:", result.error);
                setError(result.error.message || "Sign in failed");
            } else {
                const { data: sessionData, error: sessionError } = await authClient.getSession();

                if (sessionError) {
                    console.error("Get session error:", sessionError);
                    setError("Failed to get session after login. Please refresh.");
                    return;
                }

                const user = sessionData?.user as any;
                if (user?.role === "adminstaff") {
                    router.push("/dashboardAdminStaff");
                } else if (user?.role === "admin") {
                    router.push("/dashboardAdmin");
                } else {
                    router.push("/");
                }
            }
        } catch (err: any) {
            console.error("Sign in catch error:", err);
            setError(err?.message || "An unexpected error occurred during sign in");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
                <CardHeader className="text-center space-y-4 pt-8">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl p-0.5"
                    >
                        <div className="w-full h-full rounded-[1.4rem] bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                            {universityLogo ? (
                                <img
                                    src={universityLogo}
                                    alt={universityName || "Logo"}
                                    className="w-16 h-16 object-contain"
                                />
                            ) : (
                                <ShieldCheck className="w-12 h-12 text-blue-600" />
                            )}
                        </div>
                    </motion.div>
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
                            Admin Login
                        </CardTitle>
                        <CardDescription className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {universityName || "Portal Administrator"}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="pb-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <Alert variant="destructive" className="border-red-500/50 bg-red-50 dark:bg-red-900/20">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@university.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                                className="h-12 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 bg-gray-50/50 dark:bg-gray-900/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-gray-500">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                className="h-12 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 bg-gray-50/50 dark:bg-gray-900/50"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/25 transition-all duration-300 active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Verifikasi...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5" />
                                    <span>Masuk ke Dashboard</span>
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700/50">
                        <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-900/20">
                            <p className="text-[10px] leading-relaxed text-amber-800 dark:text-amber-400 font-medium text-center uppercase tracking-widest">
                                Sistem Keamanan Terpadu
                            </p>
                            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
                                Akses hanya untuk staf dan pimpinan universitas yang berwenang.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
