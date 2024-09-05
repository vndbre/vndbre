import type { NextPage } from 'next';
import { Layout } from '@/components/Layout/Layout';
import { SelectExample } from '../components/SelectExample';

/**
 * Dev index page.
 *
 * Used to showcase new staff on early stage of development.
 */
export const DevIndexPage: NextPage = () => (
  <Layout>
    <SelectExample />
  </Layout>
);
