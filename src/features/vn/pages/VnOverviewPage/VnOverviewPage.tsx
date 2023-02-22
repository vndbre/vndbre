import { Layout } from 'src/components/Layout/Layout';
import { type NextPage } from 'next';

import { VnPage } from '../../components/VnPage/VnPage';
import { VnOverview } from '../../components/VnOverview/VnOverview';

/** Vn Overview page. */
export const VnOverviewPage: NextPage = () => (
  <Layout>
    <VnPage>
      <VnOverview />
    </VnPage>
  </Layout>
);
