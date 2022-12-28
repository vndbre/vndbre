import type { FC } from 'react';
import { Layout } from 'src/components/Layout/Layout';
import { VnPage } from '../../components/VnPage/VnPage';
import { VnReleases } from '../../components/VnReleases/VnReleases';

/** Vn Releases page. */
const VnReleasesPage: FC = () => (
  <Layout>
    <VnPage>
      <VnReleases />
    </VnPage>
  </Layout>
);

export default VnReleasesPage;
