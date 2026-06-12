"use client";

import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProject } from "@/hooks/useProject";

interface Message {
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

export default function AICoFounderChat() {
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
      const res = await fetch(`http://localhost:5000/api/projects/${project.id}/cofounder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">AI Co-Founder</h2>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Expert Advisor Online</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
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
                  msg.role === "assistant" ? "bg-indigo-600" : "bg-slate-700"
                )}>
                  {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                  msg.role === "assistant" 
                    ? "bg-white/5 text-slate-200 border border-white/10" 
                    : "bg-indigo-600 text-white"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex gap-4 max-w-[80%] mr-auto">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed bg-white/5 text-slate-400 border border-white/10 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                  Advisor is thinking...
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-white/5 border-t border-white/5">
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
                className="shrink-0 bg-slate-900/50 border-white/10 text-slate-300 hover:text-white hover:bg-white/10 rounded-full text-xs"
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
              className="bg-slate-950/50 border-white/10 text-white placeholder:text-slate-500 h-12 pr-12 rounded-xl focus-visible:ring-indigo-600"
            />
            <Button 
              onClick={handleSend}
              disabled={sending}
              className="absolute right-1 top-1 bottom-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] text-slate-500 text-center mt-3 flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Advice based on {project.name} market data and current trends.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
