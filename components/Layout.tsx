import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/Header";

type Props = {
    title?: string;
};

const bodyStyle = {
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
};

const Layout: React.FunctionComponent<Props> = ({
    children,
    title = "Daniel Jost",
}) => (
    <>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <div style={bodyStyle}>
        <Header />
        {children}
        <footer>
            <hr />
            <span>&copy; Daniel Jost 2021</span>
        </footer>
        </div>
    </>
);

export default Layout;
