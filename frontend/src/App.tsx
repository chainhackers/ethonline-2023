import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PoolsPage } from 'Pages';
// import Root from 'Pages/root.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PoolsPage poolsType={'All Pools'} />,
  },
  {
    path: '/available-pools',
    element: <PoolsPage poolsType={'All Pools'} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
