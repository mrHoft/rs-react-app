import { Backdop } from '~/ui/backdop/backdop';
import { PageHome } from './pages/home/home';

export default function App() {
  return (
    <>
      <Backdop />
      <main className="main">
        <PageHome />
      </main>
    </>
  );
}
