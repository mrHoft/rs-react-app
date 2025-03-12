import { Page404 } from './404/404';
import { PageForm1 } from './form/form1';
import { PageHome } from './home/home';

export const routes = [
  {
    name: 'Home',
    path: '/',
    element: <PageHome />,
  },
  {
    name: 'Uncontrolled form',
    path: '/form1',
    element: <PageForm1 />,
  },
  {
    name: 'React Hook Form',
    path: '/form2',
    element: <h2>Form 2</h2>,
  },
  {
    path: '*',
    element: <Page404 />,
  },
];
