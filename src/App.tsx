import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';
import { routes } from '~/pages';
import { store } from '~/store/store.ts';
import { Backdop } from '~/ui/backdop/backdop';
import { Header } from '~/ui/header/header';
import { Message } from '~/ui/message/message';
import { Footer } from './ui/footer/footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Backdop />
      <main className="main">
        <Provider store={store}>{children}</Provider>
      </main>
      <Footer />
      <Message />
    </>
  );
};

function App() {
  return (
    <Layout>
      <Routes>
        {routes.map(({ path, element }, id) => (
          <Route key={id} path={path} element={element} />
        ))}
      </Routes>
    </Layout>
  );
}

export default App;
