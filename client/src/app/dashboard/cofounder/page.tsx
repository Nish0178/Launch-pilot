"use client";

import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProject } from "@/hooks/useProject";
import { useAuth } from "@clerk/nextjs";

interface Message {
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

export default function AICoFounderChat() {
  const { getToken } = useAuth();
  const { project } = useProject();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      setMessages([
        {
          role: "assistant",
          content: `Hello! I'm your AI Co-Founder. I've analyzed your '${project.name}' concept in the ${project.industry} space. How can I help you move forward today? I can discuss pricing, market risks, or even help you refine your customer acquisition strategy.`,
          timestamp: new Date(),
        }
      ]);
    }
  }, [project]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!project) return null;

  const handleSend = async () => {
    if (!input.trim() || sending) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      const token = await getToken();
      
      const res = await fetch(`http://localhost:5000/api/projects/${project.id}/cofounder`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          currentMessage: input
        })
      });

      if (!res.ok) {
        throw new Error("Chat failed");
      }

      const data = await res.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I hit a snag compiling my advice. Let's try again in a moment.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto bg-zinc-50/50 border border-zinc-200 rounded-2xl overflow-hidden backdrop-blur-xl">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
              <Bot className="w-6 h-6 text-zinc-900" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900">AI Co-Founder</h2>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Expert Advisor Online</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-zinc-900">
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0" ref={scrollRef}>
          <div className="space-y-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-4 max-w-[80%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.role === "assistant" ? "bg-amber-500" : "bg-zinc-700"
                )}>
                  {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                  msg.role === "assistant" 
                    ? "bg-zinc-50 text-zinc-800 border border-zinc-200" 
                    : "bg-amber-500 text-zinc-900"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex gap-4 max-w-[80%] mr-auto">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed bg-zinc-50 text-zinc-500 border border-zinc-200 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                  Advisor is thinking...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-200">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-none">
            {[
              "Why is my risk score high?",
              "What competitors are my biggest threat?",
              "How can I improve my investor score?",
              "What if I target another country?",
              "Which revenue model is best?"
            ].map((q) => (
              <Button
                key={q}
                variant="outline"
                size="sm"
                className="shrink-0 bg-zinc-50/50 border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-full text-xs"
                onClick={() => {
                  setInput(q);
                }}
              >
                {q}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask your AI Co-Founder anything..."
              className="bg-zinc-500 border-zinc-200 text-zinc-900 placeholder:text-zinc-500 h-12 pr-12 rounded-xl focus-visible:ring-amber-500"
            />
            <Button 
              onClick={handleSend}
              disabled={sending}
              className="absolute right-1 top-1 bottom-1 bg-amber-500 hover:bg-amber-600 rounded-lg px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] text-zinc-500 text-center mt-3 flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Advice based on {project.name} market data and current trends.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
