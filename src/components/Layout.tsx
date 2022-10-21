import * as React from "react";
import Head from "next/head";
import Header from "./Header";

type Props = {
    children: React.ReactNode;
    title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
    children,
    title = "Daniel Jost",
}) => (
    <React.Fragment>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <div className={"main"}>
            <Header />
            {children}
            <footer>
                <hr />
                <span>&copy; Daniel Jost 2022.</span>
            </footer>
        </div>
        <style jsx>{`
            .main {
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }
        `}</style>
    </React.Fragment>
);

export default Layout;
