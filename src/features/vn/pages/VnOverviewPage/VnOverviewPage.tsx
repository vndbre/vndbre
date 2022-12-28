import type { FC } from 'react';
import { Layout } from 'src/components/Layout/Layout';
import { VnOverview } from '../../components/VnOverview/VnOverview';
import { VnPage } from '../../components/VnPage/VnPage';

/** Vn Overview page. */
const VnOverviewPage: FC = () => (
  <Layout>
    <VnPage>
      <VnOverview />
    </VnPage>
  </Layout>
);

export default VnOverviewPage;
