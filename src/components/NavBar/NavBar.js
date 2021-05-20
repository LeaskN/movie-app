import './NavBar.css';
import Clapper from '../../assets/movieLogo.png'

function NavBar() {
  return (
    <div className="navBar">
        <img alt="logo" src={Clapper}></img>
    </div>
  );
}

export default NavBar;
