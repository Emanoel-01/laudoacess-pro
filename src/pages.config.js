import Dashboard from './pages/Dashboard';
import NovoLaudo from './pages/NovoLaudo';
import Guia from './pages/Guia';
import EditarLaudo from './pages/EditarLaudo';
import MeuPerfil from './pages/MeuPerfil';
import Templates from './pages/Templates';
import Documentacao from './pages/Documentacao';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Dashboard": Dashboard,
    "NovoLaudo": NovoLaudo,
    "Guia": Guia,
    "EditarLaudo": EditarLaudo,
    "MeuPerfil": MeuPerfil,
    "Templates": Templates,
    "Documentacao": Documentacao,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};