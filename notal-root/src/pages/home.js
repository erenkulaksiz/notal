import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
    Navbar,
    HomeSidebar,
    NavSelector,
    AcceptCookies
} from '@components';

import useAuth from '@hooks/auth';
import { withAuth } from '@hooks/route';

import {
    CheckToken,
    GetWorkspaces,
    ValidateToken,
    WorkboxInit
} from '@utils';

const Home = (props) => {
    const auth = useAuth();
    const router = useRouter();

    const [navCollapse, setNavCollapse] = useState(false);

    // View/Filter
    const [homeViewing, setHomeViewing] = useState("workspaces");

    useEffect(() => {
        console.log("home props: ", props);
        WorkboxInit();
        (async () => {
            const token = await auth.users.getIdToken();
            const res = await CheckToken({ token: token.res, props });
            if (!res) {
                setTimeout(() => router.replace(router.asPath), 1000);
            }
        })();
    }, []);

    return (<div className="mx-auto h-screen flex flex-col transition-colors duration-100">
        <Head>
            <title>Home · Notal</title>
            <meta name='twitter:description' content='Take your notes to next level with Notal' />
            <meta property='og:description' content='Take your notes to next level with Notal' />
            <meta name='description' content='Take your notes to next level with Notal' />
        </Head>

        <Navbar user={props?.validate?.data} />

        <div className="relative flex flex-row flex-1 bg-white dark:bg-neutral-900 overflow-y-auto overflow-x-hidden">
            <HomeSidebar
                navCollapse={navCollapse}
                current={homeViewing}
                onViewingChange={({ nav }) => setHomeViewing(nav.id)}
                onCollapse={() => setNavCollapse(prev => !prev)}
            />
            <NavSelector
                nav={homeViewing}
                {...props}
            />
        </div>

        <AcceptCookies />
    </div>)
}

export default withAuth(Home);

export async function getServerSideProps(ctx) {
    const { req, res, query } = ctx;
    let validate = {};
    let workspaces = {};

    if (req) {
        const authCookie = req.cookies.auth;

        [validate, /*workspaces*/] = await Promise.all([
            ValidateToken({ token: authCookie }),
            //GetWorkspaces({ uid: validate?.data?.uid, token: authCookie }),
        ]);

        console.log("validate:", validate);
    }
    return { props: { validate } }
}