import { Layout } from 'src/components/Layout/Layout';
import { type NextPage } from 'next';

import { VnSearch } from '../../components/VnSearch/VnSearch';

/** Vn Releases page. */
export const VnSearchPage: NextPage = () => (
  <Layout>
    <VnSearch />
  </Layout>
);
