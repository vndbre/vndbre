import type { FC } from 'react';
import { memo } from 'react';
import { Link } from 'src/components/Link/Link';

/** Text guide for the login process. */
const LoginTextGuideComponent: FC = () => (
  <div>
    <h2 className="text-title-24 mb-2">How to obtain token</h2>
    <ol className="list-inside list-decimal">
      <li className="mb-2">
        Log in to
        {' '}
        <Link external href="https://vndb.org/">vndb</Link>
        <ol className="list-inside list-decimal pl-6">
          <li className="my-2">
            In sidebar go to
            {' '}
            <span className="font-medium">“My profile”</span>
          </li>
          <li className="mb-2">
            Select
            {' '}
            <span className="font-medium">“Application”</span>
            {' '}
            tab
          </li>
        </ol>
      </li>
      <li className="mb-2">Click &quot;New token&quot;</li>
      <li className="mb-2">
        Select both permissions
        <ul className="list-inside pl-6">
          <li className="my-2 font-medium before:mr-2 before:content-['-']">“Access my list“</li>
          <li className="mb-2 font-medium before:mr-2 before:content-['-']">“Modify my list“</li>
        </ul>
      </li>
      <li className="mb-2">
        Click
        {' '}
        <span className="font-medium">“Submit“</span>
        {' '}
        to save permissions
      </li>
      <li>Copy token into the field below</li>
    </ol>
  </div>
);

export const LoginTextGuide = memo(LoginTextGuideComponent);
