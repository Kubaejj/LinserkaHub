import { RouterProvider } from 'react-router';
import { router } from './routes';

function App() {
  return (
    <div className="desktop-wrapper">
      <div className="phone-frame">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
