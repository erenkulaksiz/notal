import { useRouter } from 'next/router';
import { Button, Container, Text, Grid, Card, Input } from '@nextui-org/react';

//import styles from '../../../styles/App.module.scss';

import BackIcon from '../../public/icons/back.svg';
import HomeFilledIcon from '../../public/icons/home_filled.svg';
import useAuth from '../hooks/auth';

const Offline = () => {
    const router = useRouter();
    const auth = useAuth();

    return (<Container xs css={{ dflex: "center", ac: "center", ai: "center", fd: "column" }}>
        <Text h1>[404]</Text>
        <Text h2 css={{ textAlign: "center", fs: "1.2em", "@sm": { fs: "1.8em" } }}>It looks like you have no internet connection.</Text>
    </Container>)
}

export default Offline;