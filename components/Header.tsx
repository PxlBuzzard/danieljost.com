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
        <h1 style={h1Header}>Daniel Jost</h1>
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
            <a style={linkStyle}>About</a>
        </Link>
    </header>
);

export default Header;
