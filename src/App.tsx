import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Choristes } from './pages/Choristes';
import { Events } from './pages/Events';
import { Shop } from './pages/Shop';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Donations } from './pages/Donations';
import { Login } from './pages/Login';
import { Repertoire } from './pages/Repertoire';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/choristes" element={<Choristes />} />
            <Route path="/evenements" element={<Events />} />
            <Route path="/boutique" element={<Shop />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dons" element={<Donations />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/repertoire" element={<Repertoire />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
