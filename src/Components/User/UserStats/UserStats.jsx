import React, { Suspense, lazy, useEffect } from "react";
import Head from "../../Helper/Head/Head";
import UseFetch from "../../../Hooks/UseFetch";
import Loading from "../../Helper/Loading/Loading";
import Error from "../../Helper/Error";
import { STATS_GET } from "../../../Api/api";
const UserStatsGraphs = lazy(() =>
  import("../UserStatsGraphs/UserStatsGraphs")
);

const UserStats = () => {
  const { data, error, loading, request } = UseFetch();

  useEffect(() => {
    const getData = async () => {
      const { url, options } = STATS_GET();
      await request(url, options);
    };
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <Suspense fallback={<div></div>}>
        <Head title="Estatiticas" />
        <UserStatsGraphs data={data} />
      </Suspense>
    );
  else return null;
};

export default UserStats;
