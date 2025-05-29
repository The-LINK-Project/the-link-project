'use client';

import dynamic from 'next/dynamic';

const ConsolePage = dynamic(() => import('@/components/ConsolePage'), {
  ssr: false,
  loading: () => <p>Loading console...</p>,
});

export default function ClientDashboard() {
  return <ConsolePage />;
}