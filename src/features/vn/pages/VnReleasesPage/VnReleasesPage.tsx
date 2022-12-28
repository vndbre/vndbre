import type { FC } from 'react';
import { Layout } from '../../../../components/Layout/Layout';
import { VnReleases } from '../../components/VnReleases/VnReleases';
import { VnPage } from '../../components/VnPage/VnPage';

/** Vn Releases page. */
const VnReleasesPage: FC = () => (
  <Layout>
    <VnPage>
      <VnReleases />
    </VnPage>
  </Layout>
);

export default VnReleasesPage;
