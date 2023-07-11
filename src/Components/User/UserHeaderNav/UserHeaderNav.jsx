import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UseContext";
import { ReactComponent as MinhasFotos } from "../../../Assets/feed.svg";
import { ReactComponent as Estatiticas } from "../../../Assets/estatisticas.svg";
import { ReactComponent as AdicionarFoto } from "../../../Assets/adicionar.svg";
import { ReactComponent as Sair } from "../../../Assets/sair.svg";
import styles from "../UserHeaderNav/UserNavHeader.module.css";
import UseMedia from "../../../Hooks/UseMedia";

const UserHeaderNav = () => {
  const { userLogout } = useContext(UserContext);
  const navigate = useNavigate();
  const mobile = UseMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = useState(false);
  const { pathname } = useLocation();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);
  return (
    <>
      {mobile && (
        <button
          aria-label="menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/conta" end>
          <MinhasFotos />
          {mobile && "Minhas fotos"}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <Estatiticas />
          {mobile && "Estatistícas"}
        </NavLink>
        <NavLink to="/conta/postar">
          <AdicionarFoto />
          {mobile && "Adicionar fotos"}
        </NavLink>
        <button onClick={handleLogout}>
          <Sair />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
