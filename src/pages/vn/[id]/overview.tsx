import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Layout } from '../../../components/Layout/Layout';
import type { TabItem } from '../../../components/Tabs/Tabs';
import { Vn } from '../../../features/vn';

/** Get server side props. */
export const getServerSideProps: GetServerSideProps = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return { props: { data } };
};

/** Vn overview page. */
const VnOverviewPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  const router = useRouter();

  const activeTabName = router.route.split('/').at(-1) as TabItem['name'];

  const handleTabChange = useCallback((tabName: TabItem['name']) => {
    router.push({
      pathname: `./${tabName}`,
      query: { id: router.query.id },
    });
  }, [router.query.id]);

  const [clickCount, setClickCount] = useState(0);

  console.log(data);

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
        <div>
          <code>{JSON.stringify(data, null, 2)}</code>
        </div>
      </Vn>
    </Layout>
  );
};

export default VnOverviewPage;
