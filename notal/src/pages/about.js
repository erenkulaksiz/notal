import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from '../../styles/App.module.scss';
import { useRouter } from 'next/router';

import { server } from '../config';

import QuestionIcon from '../../public/icons/question.svg';
import AddIcon from '../../public/icons/add.svg';
import EditIcon from '../../public/icons/edit.svg';

import Button from '../components/button';
import Input from '../components/input';
import Header from '../components/header';

import useAuth from '../hooks/auth';

const About = (props) => {
    const router = useRouter();

    const auth = useAuth();

    const [menuToggle, setMenuToggle] = useState(false);

    return (
        <div className={styles.container}>
            <Head>
                <title>About · Notal</title>
                <meta name="description" content="About Notal, the greatest note app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <Header
                menuToggle={menuToggle}
                onMenuToggle={val => setMenuToggle(val)}
                userData={{ fullname: props.validate?.data?.fullname, email: auth?.authUser?.email }}
                avatarURL={props.validate.data?.avatar}
                loggedIn={auth?.authUser != null}
                onLogin={() => router.push("/login")}
                onLogout={() => auth.logout()}
                onProfile={() => router.push(`/profile/${props.validate?.data?.username}`)}
                onHeaderHome={() => router.push("/")}
                showCreate={false}
                showBackButton
                onBack={() => router.back()}
            />

            <div className={styles.content_about}>
                <div className={styles.aboutTitle}>
                    <h1>Welcome to Notal.</h1>
                </div>
                <div className={styles.aboutDesc}>
                    <p>Notal is a basic todo tracking and taking notes platform. It is currently being built by a college student in Turkey, Istanbul named <a href="https://github.com/erenkulaksiz">Eren Kulaksiz</a>.</p>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>
                        <div className={styles.icon}>
                            <AddIcon height={24} width={24} fill={"#fff"} />
                        </div>
                        <h1>Create Workspaces</h1>
                    </div>
                    <div className={styles.desc}>
                        <p>Creating a workspaces will make you be able to create todos and notes. Also you can share your workspaces, or you can just set them to private.</p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>
                        <div className={styles.icon}>
                            <EditIcon height={24} width={24} fill={"#fff"} />
                        </div>
                        <h1>Take Notes</h1>
                    </div>
                    <div className={styles.desc}>
                        <p>Want to take notes about your project? simply open a workspace then add notes.</p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>
                        <div className={styles.icon}>
                            <AddIcon height={24} width={24} fill={"#fff"} />
                        </div>
                        <h1>Add Todos</h1>
                    </div>
                    <div className={styles.desc}>
                        <p>Want to add todos for your project? you can create from a workspace. You can even categorize them or add notes into todos.</p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>
                        <div className={styles.icon}>
                            <EditIcon height={24} width={24} fill={"#fff"} />
                        </div>
                        <h1>Customize Your Profile</h1>
                    </div>
                    <div className={styles.desc}>
                        <p>You can change your fullname, bio and username on your profile section. Also your username is the link. {props.validate?.data?.username && <div>For example, your profile link is <a href={`${server}/profile/${props.validate?.data?.username}`}>{`${server}/profile/${props.validate?.data?.username}`}</a></div>}</p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>
                        <div className={styles.icon}>
                            <QuestionIcon height={24} width={24} fill={"#fff"} />
                        </div>
                        <h1>More</h1>
                    </div>
                    <div className={styles.desc}>
                        <p>The project is currently still in beta. Even this page is built new. Ill update this page whenever i add new stuff to Notal. See you :)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;

export async function getServerSideProps(ctx) {
    const { req, res, query } = ctx;
    let validate = {};

    if (req) {
        const authCookie = req.cookies.auth;

        if (authCookie) {
            const data = await fetch(`${server}/api/validate`, {
                'Content-Type': 'application/json',
                method: "POST",
                body: JSON.stringify({ token: authCookie }),
            }).then(response => response.json());

            console.log("data (about.js): ", data);
            if (data.success) {
                validate = { ...data };
            }
        }
    }
    return { props: { validate } }
}