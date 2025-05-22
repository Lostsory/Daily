'use client';

import dynamic from 'next/dynamic';

const EditorComponent = dynamic(() => import('@/components/Editor'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">低代码编辑器</h1> */}
      <EditorComponent />
    </main>
  );
}
