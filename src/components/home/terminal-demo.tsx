'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const codeLines = [
  { type: 'command', content: 'curl http://localhost:8080/v1/chat/completions \\'},
  { type: 'command', content: '  -H "Content-Type: application/json" \\'},
  { type: 'command', content: '  -H "Authorization: Bearer sk-xxx" \\'},
  { type: 'command', content: '  -d \'{"model": "deepseek-chat", "messages": [{"role": "user", "content": "Hello!"}]}\'', delay: 500 },
  { type: 'response', content: '' },
  { type: 'response', content: '{"id":"chatcmpl-xxx","object":"chat.completion","created":1234567890,' },
  { type: 'response', content: '"model":"deepseek-chat","choices":[{"index":0,"message":{"role":"assistant",' },
  { type: 'response', content: '"content":"Hello! How can I help you today?"},"finish_reason":"stop"}]}' },
];

export function TerminalDemo() {
  const t = useTranslations('home.terminal');
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [currentLineChars, setCurrentLineChars] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (displayedLines >= codeLines.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = codeLines[displayedLines];
    const fullContent = currentLine.content;
    
    if (currentLineChars < fullContent.length) {
      const timer = setTimeout(() => {
        setCurrentLineChars(currentLineChars + 1);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedLines(displayedLines + 1);
        setCurrentLineChars(0);
      }, currentLine.delay || 100);
      return () => clearTimeout(timer);
    }
  }, [displayedLines, currentLineChars, codeLines]);

  return (
    <div className="mx-auto max-w-3xl mt-12">
      <div className="rounded-xl border border-fd-border bg-[#1e1e1e] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-fd-border/50">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-4 text-xs text-fd-muted-foreground/60 font-mono">Terminal — Chat2API</span>
        </div>
        <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto">
          {codeLines.slice(0, displayedLines + 1).map((line, index) => {
            const isCurrentLine = index === displayedLines;
            const displayContent = isCurrentLine 
              ? line.content.slice(0, currentLineChars)
              : line.content;
            
            return (
              <div key={index} className="flex">
                {line.type === 'command' ? (
                  <>
                    <span className="text-[#4ec9b0] mr-2 select-none">$</span>
                    <span className="text-[#d4d4d4]">{displayContent}</span>
                  </>
                ) : (
                  <span className="text-[#6a9955]">{displayContent}</span>
                )}
                {isCurrentLine && isTyping && (
                  <span className="inline-block w-2 h-4 bg-[#d4d4d4] ml-0.5 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
