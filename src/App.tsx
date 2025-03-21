import { Backdop } from '~/ui/backdop/backdop';
import { PageHome } from './pages/home/home';
import { Loader } from './ui/loader/loader';
import { Modal } from './ui/modal/modal';

export default function App() {
  return (
    <>
      <Backdop />
      <main className="main">
        <PageHome />
      </main>
      <Loader />
      <Modal />
    </>
  );
}
