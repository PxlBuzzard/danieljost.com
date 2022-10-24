import * as React from "react";
import Image from "next/image";

export interface InfoCardProps {
    key: string;
    link: string;
    name: string;
    year: string;
    short_desc: string;
    thumb?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
    key,
    link,
    name,
    year,
    short_desc,
    thumb,
}) => (
    <React.Fragment>
        <div className="game-container">
            {thumb?.length > 0 && (
                <a href={link} target="_blank" rel="noreferrer">
                    <Image
                        className="img-game"
                        src={`/static/img/thumb/game/${thumb}`}
                        alt={name}
                        width="300px"
                        height="190px"
                    />
                </a>
            )}
            <div className="game-info">
                <h2>{name}</h2>
                <a href={link} target="_blank" rel="noreferrer">
                    {link}
                </a>
                <p>{short_desc}</p>
                <span className="game-year">{year}</span>
            </div>
        </div>

        <style jsx>{`
            .game-container {
                display: flex;
                position: relative;
                margin-bottom: 20px;
                background-color: #eee;
                border-radius: 5px;
                color: #000;
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
            .game-info h2 {
                margin: 0 0 5px 0;
            }
        `}</style>
    </React.Fragment>
);

export default InfoCard;
