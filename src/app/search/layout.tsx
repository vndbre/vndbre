import type { PropsWithChildren } from 'react';
import { SearchHeader } from 'src/features/search/components/SearchHeader/SearchHeader';

const SearchLayout = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap-4">
    <SearchHeader />
    {children}
  </div>
);

export default SearchLayout;
