import { Layout } from 'src/components/Layout/Layout';
import { type NextPage } from 'next';

import { VnSearch } from '../../components/VnSearch/VnSearch';
import { SearchHeader } from '../../components/SearchHeader/SearchHeader';

/** Vn Releases page. */
export const VnSearchPage: NextPage = () => (
  <Layout>
    <SearchHeader />
    <VnSearch />
  </Layout>
);
