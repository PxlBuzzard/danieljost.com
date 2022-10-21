import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import games from "../data/games.json";

const Page_Games: React.FunctionComponent = () => (
    <Layout title="Daniel Jost - Games">
        <h1>Games</h1>
        {games.map(game => { return (
        <div className="game-container" key="game.game">
            <Image className="img-game" src={`/static/img/thumb/game/${game.thumb}`} alt={game.name} width="300px" height="190px" />
            <div className="game-info">
                <h2>{game.name}</h2>
                <Link href={game.link} passHref>
                    <a>{game.link}</a>
                </Link>
                <p>{game.short_desc}</p>
                <span className="game-year">{game.year}</span>
            </div>

            <style jsx>{`
            .game-container {
                display: flex;
                position: relative;
                margin-bottom: 20px;
                background-color: #eee;
                border-radius: 5px;
            }
            .game-container:nth-child(even) {
                background-color: #ccc;
            }
            :global(.img-game) {
                border-radius: 5px;
            }
            .game-info {
                display: flex;
                flex-direction: column;
                margin-left: 10px;
                width: 300px;
            }
            .game-year {
                font-size: 0.8em;
                position: absolute;
                bottom: 5px;
                right: 5px;
            }
            h2 {
                margin: 0 0 5px 0;
            }
            `}</style>
        </div>
        )})}
    </Layout>
);

export default Page_Games;
