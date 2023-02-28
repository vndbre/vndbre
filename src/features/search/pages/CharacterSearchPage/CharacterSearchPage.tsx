import { Layout } from 'src/components/Layout/Layout';
import { type NextPage } from 'next';

import { SearchHeader } from '../../components/SearchHeader/SearchHeader';
import { CharacterSearch } from '../../components/CharacterSearch/CharacterSearch';

/** Character search page. */
export const CharacterSearchPage: NextPage = () => (
  <Layout>
    {/* TODO: improve layout for search page */}
    <div className="flex flex-col gap-4">
      <SearchHeader />
      <CharacterSearch />
    </div>
  </Layout>
);
