import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import { Layout } from '../../../../components/Layout/Layout';
import type { TabItem } from '../../../../features/vn/components/VnHeaderTabs/VnHeaderTabs';
import { Vn } from '../../../../features/vn/components/VnPage/VnPage';

/** Vn page. */
const VnPage: NextPage = () => {
  const router = useRouter();

  const activeTabName = router.query.tabName as TabItem['name'];

  const handleTabChange = useCallback((tabName: TabItem['name']) => {
    router.push({
      pathname: '',
      query: { id: router.query.id, tabName },
    });
  }, [router.query.id]);

  const [clickCount, setClickCount] = useState(0);

  return (
    <Layout>
      <Vn
        activeTabName={activeTabName}
        onTabChange={handleTabChange}
      >
        {router.query.tabName === 'overview' ? (
          <>
            <div>overview</div>
            <Button onClick={() => setClickCount(count => count + 1)}>
              clicked
              {' '}
              {clickCount}
            </Button>
          </>
        ) : (
          <div>{router.query.tabName}</div>
        )}

      </Vn>
    </Layout>
  );
};

export default VnPage;
