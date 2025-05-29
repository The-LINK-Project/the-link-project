import dynamic from 'next/dynamic';
const ConsolePage = dynamic(() => import('@/components/ConsolePage'), {
    ssr: false,
  });
  
const Dashboard = () => {
  return (
    <div>
        <ConsolePage></ConsolePage>
    </div>
  )
}

export default Dashboard