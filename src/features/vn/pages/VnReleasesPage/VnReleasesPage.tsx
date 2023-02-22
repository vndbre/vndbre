import { Layout } from 'src/components/Layout/Layout';
import { type NextPage } from 'next';

import { VnPage } from '../../components/VnPage/VnPage';
import { VnReleases } from '../../components/VnReleases/VnReleases';

/** Vn Releases page. */
export const VnReleasesPage: NextPage = () => (
  <Layout>
    <VnPage>
      <VnReleases />
    </VnPage>
  </Layout>
);
