import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Layout } from '../../../../components/Layout/Layout';
import type { TabItem } from '../../../../components/Tabs/Tabs';
import { Vn } from '../../../../features/vn';

/** Vn page. */
const VnPage: NextPage = () => {
  const router = useRouter();

  const handleTabChange = useCallback((tabName: TabItem['name']) => {
    router.push({
      pathname: '',
      query: { id: router.query.id, tabName },
    });
  }, [router.query.id]);

  return (
    <Layout>
      <Vn onTabChange={handleTabChange}>
        {router.query.tabName}
      </Vn>
    </Layout>
  );
};

export default VnPage;
