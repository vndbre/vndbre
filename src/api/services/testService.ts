import { http } from '../index';

/**
 * TODO: add comments.
 */
interface Test {

  /**
   * TODO: add comments.
   */
  name: string;
}

/**
 * TODO: add comments.
 */
export const fetchTest = async(): Promise<Test> => {
  const { data } = await http.get<Test>('');
  return data;
};
