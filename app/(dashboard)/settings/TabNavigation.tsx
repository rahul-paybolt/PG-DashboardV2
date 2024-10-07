import { useRouter } from 'next/router';

const TabNavigation = () => {
  const router = useRouter();
  const { tab } = router.query;

  const handleTabClick = (tabName: string) => {
    router.push(`/settings?tab=${tabName}`);
  };

  return (
    <div>
      <button onClick={() => handleTabClick('profile')} className={tab === 'profile' ? 'active' : ''}>Profile</button>
      <button onClick={() => handleTabClick('api-reference')} className={tab === 'api-reference' ? 'active' : ''}>API Reference</button>
      <button onClick={() => handleTabClick('transactions')} className={tab === 'transactions' ? 'active' : ''}>Transactions</button>
      {/* Add more tabs as needed */}
    </div>
  );
};

export default TabNavigation;