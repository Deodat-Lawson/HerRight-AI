import { Suspense } from 'react';
import AIChat from '@/components/AIChat';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense>
        <AIChat />
      </Suspense>
    </div>
  );
}
