import Link from "next/link";

const Header: React.FC = () => (
    <header>
        {/* <h1 style={h1Header}>Daniel Jost</h1> */}
        <Link href="/">
            <a className={"link"}>Home</a>
        </Link>
        <Link href="/resume">
            <a className={"link"}>Resume</a>
        </Link>
        <Link href="/games">
            <a className={"link"}>Games</a>
        </Link>
        <Link href="/sites">
            <a className={"link"}>Sites</a>
        </Link>
        <Link href="https://blog.danieljost.com">
            <a className={"link"}>Blog</a>
        </Link>
        <style jsx>{`
            .header {
                display: inline-block;
                margin-right: 15px;
            }

            .link {
                margin-right: 15px;
            }
        `}</style>
    </header>
);

export default Header;
