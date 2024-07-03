import './NavBar.css';
import logo from './images/logo.png';
import CircleButtonMenu from './CircleButtonMenu';
import { useNavigate } from 'react-router-dom';

const NormalNavBar = ({inCart=false, inFavorite=false, inProfile=false}) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Logo" className="logo clickable" onClick={() => navigate("/products")}/>
                </div>
                <div className="navbar-right">
                    <div>
                        <CircleButtonMenu 
                            inCart={inCart}
                            inFavorite={inFavorite}
                            inProfile={inProfile}
                        />
                    </div>
                </div>
            </div>
        </>
  );
};

export default NormalNavBar;
