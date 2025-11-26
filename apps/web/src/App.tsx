import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { Trips } from '@/pages/Trips';
import { Settings } from '@/pages/Settings';
import { NotFound } from '@/pages/NotFound';

/**
 * Main application component
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="trips" element={<Trips />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
