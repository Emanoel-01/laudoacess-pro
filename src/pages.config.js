import Dashboard from './pages/Dashboard';
import Documentacao from './pages/Documentacao';
import EditarLaudo from './pages/EditarLaudo';
import Guia from './pages/Guia';
import Home from './pages/Home';
import MeuPerfil from './pages/MeuPerfil';
import NovoLaudo from './pages/NovoLaudo';
import Templates from './pages/Templates';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Dashboard": Dashboard,
    "Documentacao": Documentacao,
    "EditarLaudo": EditarLaudo,
    "Guia": Guia,
    "Home": Home,
    "MeuPerfil": MeuPerfil,
    "NovoLaudo": NovoLaudo,
    "Templates": Templates,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};