import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Layout } from '../../../components/Layout/Layout';
import type { TabItem } from '../../../components/Tabs/Tabs';
import { Vn } from '../../../features/vn';

/** Vn releases page. */
const VnReleasesPage: NextPage = () => {
  const router = useRouter();

  const activeTabName = router.route.split('/').at(-1) as TabItem['name'];

  const handleTabChange = useCallback((tabName: TabItem['name']) => {
    router.push({
      pathname: `./${tabName}`,
      query: { id: router.query.id },
    });
  }, [router.query.id]);

  return (
    <Layout>
      <Vn
        activeTabName={activeTabName}
        onTabChange={handleTabChange}
      >
        releases

      </Vn>
    </Layout>
  );
};

export default VnReleasesPage;
