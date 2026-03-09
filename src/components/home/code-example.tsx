'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Copy, Check, Info } from 'lucide-react';
import Image from 'next/image';

const codeExamples = {
  python: {
    code: `from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="http://localhost:8080/v1"
)

response = client.chat.completions.create(
    model="DeepSeek-V3.2",
    messages=[
        {"role": "user", "content": "Hello, who are you?"}
    ]
)

print(response.choices[0].message.content)`,
    language: 'python',
    title: 'example.py',
  },
  javascript: {
    code: `import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'your-api-key',
  baseURL: 'http://localhost:8080/v1',
});

const response = await client.chat.completions.create({
  model: 'DeepSeek-V3.2',
  messages: [{ role: 'user', content: 'Hello, who are you?' }],
});

console.log(response.choices[0].message.content);`,
    language: 'javascript',
    title: 'example.ts',
  },
  curl: {
    code: `curl http://localhost:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key" \\
  -d '{
    "model": "DeepSeek-V3.2",
    "messages": [
      {"role": "user", "content": "Hello, who are you?"}
    ]
  }'`,
    language: 'bash',
    title: 'Terminal',
  },
};

const tabs = [
  { id: 'python', label: 'Python' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'curl', label: 'cURL' },
] as const;

const tools = [
  {
    nameKey: 'githubCopilot',
    icon: '/icons/githubcopilot.svg',
  },
  {
    nameKey: 'rooCode',
    icon: '/icons/roocode.svg',
  },
  {
    nameKey: 'cline',
    icon: '/icons/cline.svg',
  },
  {
    nameKey: 'cherryStudio',
    icon: '/icons/cherrystudio.svg',
  },
];

export function CodeExample() {
  const t = useTranslations('home.codeExample');
  const [activeTab, setActiveTab] = useState<'python' | 'javascript' | 'curl'>('python');
  const [copied, setCopied] = useState(false);

  const currentCode = codeExamples[activeTab];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className={cn(
        'rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card'
      )}>
        <h3 className="text-xl lg:text-2xl font-medium tracking-tight mb-4">
          {t('title')}
        </h3>
        <p className="text-fd-muted-foreground mb-6">
          {t('subtitle')}
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool) => {
            return (
              <div
                key={tool.nameKey}
                className="flex items-center gap-3 p-3 rounded-xl bg-fd-muted/30 transition-all hover:bg-fd-muted/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Image
                    src={tool.icon}
                    alt={t(`tools.${tool.nameKey}.name`)}
                    width={28}
                    height={28}
                    className="size-7 object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-fd-foreground">
                    {t(`tools.${tool.nameKey}.name`)}
                  </h4>
                  <p className="text-xs text-fd-muted-foreground">
                    {t(`tools.${tool.nameKey}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-fd-primary/5 border border-fd-primary/20">
          <Info className="size-4 text-fd-primary shrink-0" />
          <p className="text-xs text-fd-muted-foreground">
            {t('moreComing')}
          </p>
        </div>
      </div>

      <div className={cn(
        'rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card overflow-hidden'
      )}>
        <div className="flex items-center justify-between border-b border-fd-border -mx-6 px-6 pb-4 mb-4">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'text-fd-primary'
                    : 'text-fd-muted-foreground hover:text-fd-accent-foreground'
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-fd-primary" />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-fd-muted-foreground">{currentCode.title}</span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-fd-muted transition-colors"
              title={copied ? 'Copied!' : 'Copy code'}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-fd-muted-foreground" />
              )}
            </button>
          </div>
        </div>
        <div className="overflow-auto max-h-[280px] -mx-2 px-2">
          <pre className="text-sm leading-relaxed">
            <code className="text-fd-foreground font-mono whitespace-pre">
              {currentCode.code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
