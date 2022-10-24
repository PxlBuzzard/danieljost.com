import * as React from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import games from "../data/games.json";
import InfoCard from "components/InfoCard";

const Page_Games: React.FC = () => (
    <Layout title="Daniel Jost - Games">
        <h1>Games</h1>
        {games.map((game) => ( <InfoCard key={game.game} {...game} />))}
    </Layout>
);

export default Page_Games;
