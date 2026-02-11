import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <div className="app-layout">
            <Header />
            <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
