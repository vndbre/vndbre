import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Layout } from '../../../components/Layout/Layout';
import type { TabItem } from '../../../components/Tabs/Tabs';
import { Vn } from '../../../features/vn';

/** Vn overview page. */
const VnOverviewPage: NextPage = () => {
  const router = useRouter();

  const activeTabName = router.route.split('/').at(-1) as TabItem['name'];

  const handleTabChange = useCallback((tabName: TabItem['name']) => {
    router.push({
      pathname: `./${tabName}`,
      query: { id: router.query.id },
    });
  }, [router.query.id]);

  const [clickCount, setClickCount] = useState(0);

  return (
    <Layout>
      <Vn
        activeTabName={activeTabName}
        onTabChange={handleTabChange}
      >
        <div>overview</div>
        <Button onClick={() => setClickCount(count => count + 1)}>
          clicked
          {' '}
          {clickCount}
        </Button>
      </Vn>
    </Layout>
  );
};

export default VnOverviewPage;
