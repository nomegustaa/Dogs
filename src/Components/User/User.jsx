import React, { useContext } from "react";
import UserHeader from "./UserHeader/UserHeader";
import Feed from "../Feed/Feed";
import { Route, Routes } from "react-router-dom";
import UserPhotoPost from "./UserPhoto/UserPhotoPost";
import UserStats from "./UserStats/UserStats";
import { UserContext } from "../../Context/UseContext";
import NotFound from "../NotFound/NotFound";
import Head from "../Helper/Head/Head";

const User = () => {
  const { data } = useContext(UserContext);

  return (
    <section className="container">
      <Head title="Minha Conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
