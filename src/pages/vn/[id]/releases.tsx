import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { type NextPage } from 'next';
import { Router, useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Layout } from '../../../components/Layout/Layout';
import type { TabItem } from '../../../components/Tabs/Tabs';
import { Vn } from '../../../features/vn';

/** Get server side props. */
export const getServerSideProps: GetServerSideProps = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  const data = await response.json();
  return { props: { data } };
};

/** Vn Releases page. */
const VnReleasesPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
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

  const [isLoading, setIsLoading] = useState(false);

  Router.events.on('routeChangeStart', () => setIsLoading(true));
  Router.events.on('routeChangeComplete', () => setIsLoading(false));
  Router.events.on('routeChangeError', () => setIsLoading(false));

  return (
    <Layout>
      <Vn
        activeTabName={activeTabName}
        onTabChange={handleTabChange}
      >
        {isLoading ? (
          <div>loading</div>
        ) : (
          <>
            <div>Releases</div>
            <Button onClick={() => setClickCount(count => count + 1)}>
              clicked
              {' '}
              {clickCount}
            </Button>
            <div>
              <code>{JSON.stringify(data, null, 2)}</code>
            </div>
          </>
        )}
      </Vn>
    </Layout>
  );
};

export default VnReleasesPage;
