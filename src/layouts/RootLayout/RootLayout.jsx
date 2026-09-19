
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';



const RootLayout = () => {
    return (
        <div>
           
            <Navbar></Navbar>
            
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;