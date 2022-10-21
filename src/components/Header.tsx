import Link from "next/link";

const linkStyle = {
    marginRight: 15,
};

const h1Header = {
    display: "inline-block",
    marginRight: 15,
}

const Header = () => (
    <header>
        {/* <h1 style={h1Header}>Daniel Jost</h1> */}
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/games">
            <a style={linkStyle}>Games</a>
        </Link>
        <Link href="/sites">
            <a style={linkStyle}>Sites</a>
        </Link>
    </header>
);

export default Header;
