import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

import styles from '../../../styles/App.module.scss';

import useAuth from '../../hooks/auth';
import { server } from '../../config';

import BackIcon from '../../../public/icons/back.svg';
import HomeFilledIcon from '../../../public/icons/home_filled.svg';

import EditIcon from '../../../public/icons/edit.svg';
import CrossIcon from '../../../public/icons/cross.svg';
import CheckIcon from '../../../public/icons/check.svg';
import UserIcon from '../../../public/icons/user.svg';
import AtIcon from '../../../public/icons/at.svg';
import SyncIcon from '../../../public/icons/sync.svg';
import AddIcon from '../../../public/icons/add.svg';
import SendIcon from '../../../public/icons/send.svg';
import LockIcon from '../../../public/icons/lock_outline.svg';
import VisibleIcon from '../../../public/icons/visible.svg';
import VisibleOffIcon from '../../../public/icons/visible_off.svg';

import Header from '../../components/header';
import Button from '../../components/button';
import Input from '../../components/input';
import { CheckToken } from '../../utils';

const Profile = (props) => {
    const auth = useAuth();
    const router = useRouter();

    const [menuToggle, setMenuToggle] = useState(false);

    //loading
    const [loadingProfile, setLoadingProfile] = useState(true);

    //edit
    const [editingProfile, setEditingProfile] = useState(false);
    const [editProfile, setEditProfile] = useState(null);
    const [editErrors, setEditErrors] = useState({ fullname: false, username: false, bio: false });
    const [editAvatarLoading, setEditAvatarLoading] = useState(false);

    useEffect(() => {
        console.log("props: ", props);
        (async () => {
            const token = await auth.users.getIdToken();
            const res = await CheckToken({ token, props });
            if (props.validate?.error == "no-token" || res || props.validate?.error == "validation-error" || props.valite?.error == "auth/id-token-expired") {
                router.replace(router.asPath);
            }
        })();
    }, []);

    useEffect(() => {
        if ((props.profile?.success == true) || (props.profile?.success == false && props.profile?.error == "cant-find-user")) {
            setLoadingProfile(false);
            setEditProfile({
                fullname: props.validate?.data?.fullname,
                username: props.validate?.data?.username,
                bio: props.validate?.data?.bio,
                visibility: props.validate?.data?.profileVisible
            });
        };
    }, [props.profile]);

    const onFinishEditing = async (e) => {
        e.preventDefault();

        if (editProfile.fullname.length < 3) {
            setEditErrors({ ...editErrors, fullname: "Please enter a valid fullname." });
            return;
        } else {
            setEditErrors({ ...editErrors, fullname: false });
        }
        if (editProfile.username.length < 3) {
            setEditErrors({ ...editErrors, username: "Please enter a valid username." });
            return;
        } else {
            setEditErrors({ ...editErrors, username: false });
        }

        if (editProfile.fullname != props.validate?.data?.fullname || editProfile.username != props.validate?.data?.username || editProfile.bio != props.validate?.data?.bio || editProfile.visibility != props.validate?.data?.profileVisible) {
            const data = await auth.users.editUser({
                uid: auth.authUser?.uid,
                fullname: editProfile.fullname,
                username: editProfile.username,
                bio: editProfile.bio,
                profileVisible: editProfile.visibility,
            });

            console.log("data on edit: ", data);

            if (data.success) {
                // editing fullname works but it doesnt update immideatly #TODO: fix

                // Fixed :)
                router.replace(`/profile/${editProfile.username}`);
                setEditingProfile(false);

            } else if (data.success == false && data.error.error == 'auth/username-already-in-use') {
                setEditErrors({ fullname: false, username: "This username is already in use.", bio: false });
                return;
            }
        } else {
            setEditingProfile(false);
        }
    }

    const onAvatarEditChange = async (e) => {
        if (e.target.files[0]) {
            console.log("files:", e.target.files[0]);
            if (e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "image/png" || e.target.files[0].type == "image/jpg") {
                setEditAvatarLoading(true);
                setEditingProfile(false);
                const res = await auth.users.uploadAvatar({ avatar: e.target.files[0], uid: auth?.authUser?.uid });
                if (res.success) {
                    console.log("this side response: ", res);
                    setEditAvatarLoading(false);
                    router.replace(`/profile/${editProfile.username}`);
                } else {
                    console.log("avatar upload error: ", res);
                    setEditAvatarLoading(false);
                }
            } else {
                alert("only png, jpeg and jpg is allowed");
            }
        }
    }

    if (loadingProfile) {
        return <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <SyncIcon height={24} width={24} fill={"#19181e"} className={styles.loadingIconAuth} style={{ marginTop: 24 }} />
            <span style={{ marginTop: 24, fontSize: "1.2em", fontWeight: "500" }}>Loading Profile...</span>
        </div>
    }

    return (<div className={styles.container}>
        <Head>
            <title>{props.profile?.success == true ? "Viewing " + props.profile?.data?.username + "'s profile" : "Not Found"}</title>
            <meta name="description" content="Notal" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header
            menuToggle={menuToggle}
            onMenuToggle={val => setMenuToggle(val)}
            userData={{ fullname: props.validate?.data?.fullname, email: props.validate?.data?.email }}
            avatarURL={props.validate.data?.avatar}
            loggedIn={auth?.authUser != null}
            onLogin={() => router.push("/login")}
            onLogout={() => {
                auth.users.logout();
                setEditingProfile(false);
                setEditErrors({ fullname: false, username: false, bio: false });
                setMenuToggle(false);
            }}
            onProfile={() => router.push(`/profile/${props.validate?.data?.username}`)}
            onHeaderHome={() => router.push("/")}
            leftContainer={<div style={{ display: "flex", flexDirection: "row" }}>
                <Button
                    text="Back"
                    onClick={() => router.back()}
                    style={{ height: 44, borderRadius: 8, width: "45%" }}
                    icon={<BackIcon height={24} width={24} fill={"#fff"} style={{ marginRight: 8 }} />}
                />
                <Button
                    text="Home"
                    onClick={() => router.replace("/")}
                    style={{ height: 44, borderRadius: 8, width: "45%" }}
                    icon={<HomeFilledIcon height={24} width={24} fill={"#fff"} style={{ marginRight: 8 }} />}
                />
            </div>}
        />

        <div className={styles.content_profile}>
            {
                (props.profile?.success == false && props.profile?.error == "cant-find-user") && <div className={styles.errorFindUser}>
                    <h1 style={{ fontSize: "2.2em", fontWeight: "600", textAlign: "center" }}>We couldnt reach to this user.</h1>
                    <Button
                        text="Home"
                        icon={<HomeFilledIcon height={24} width={24} fill={"#fff"} style={{ marginRight: 8 }} />}
                        style={{ marginTop: 24, width: "50%" }}
                        onClick={() => router.replace("/")}
                    />
                    <Button
                        text="Back"
                        onClick={() => router.back()}
                        style={{ marginTop: 12, width: "50%" }}
                        icon={<BackIcon height={24} width={24} fill={"#fff"} style={{ marginRight: 8 }} />}
                    />
                </div>
            }
            {
                props.profile?.success == true && <div className={styles.profile}>
                    <div className={styles.header}>
                        <div className={styles.top}>
                            <div className={styles.avatarSide}>
                                <div className={styles.avatarContainer}>
                                    <img
                                        src={props.profile.data.avatar}
                                        className={styles.avatar}
                                        alt="Avatar of a profile"
                                    />
                                    {editingProfile && <div className={styles.editAvatarContainer}>
                                        <input type="file" className={styles.editAvatar} onChange={onAvatarEditChange} />
                                        <EditIcon height={24} width={24} fill={"#fff"} />
                                    </div>}
                                    {editAvatarLoading && <div className={styles.editAvatarLoadingContainer}>
                                        <SyncIcon height={24} width={24} fill={"#fff"} className={styles.loadingIconAvatar} />
                                        <div className={styles.editAvatarLoadingBack} />
                                    </div>}
                                </div>
                            </div>
                            <div className={styles.usernameSide}>
                                <form id="editProfile" onSubmit={e => onFinishEditing(e)} >
                                    <div style={{ width: editingProfile ? "100%" : "auto" }}>
                                        <div className={styles.fullname}>
                                            {editingProfile ? <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                                <Input
                                                    type="text"
                                                    placeholder="Fullname"
                                                    onChange={e => setEditProfile({ ...editProfile, fullname: e.target.value })}
                                                    value={editProfile.fullname}
                                                    icon={<UserIcon height={24} width={24} fill={"#19181e"} />}
                                                    style={{ width: "100%" }}
                                                    error={editErrors.fullname != false}
                                                    maxLength={24}
                                                />
                                                {editErrors.fullname != false && <p className={styles.errorMsg}>{editErrors.fullname}</p>}
                                            </div> : <h1 style={{ display: "flex", alignItems: "center" }}>{props.profile.data.fullname}{props.profile?.data?.profileVisible == false && <LockIcon height={24} width={24} fill={"#fff"} style={{ marginLeft: 8 }} />}</h1>}
                                        </div>
                                        <div className={styles.username}>
                                            {editingProfile ? <div>
                                                <Input
                                                    type="text"
                                                    placeholder="Username"
                                                    onChange={e => setEditProfile({ ...editProfile, username: e.target.value.replace(/[^\w\s]/gi, "").replace(/\s/g, '').toLowerCase() })}
                                                    value={editProfile.username}
                                                    icon={<AtIcon height={24} width={24} fill={"#19181e"} />}
                                                    style={{ marginTop: 4 }}
                                                    error={editErrors.username != false}
                                                    maxLength={16}
                                                />
                                                {editErrors.username != false && <p className={styles.errorMsg}>{editErrors.username}</p>}
                                            </div> : <h1>@{props.profile.data.username}</h1>}
                                        </div>

                                    </div>
                                    {!editingProfile && props.profile.data.username == "eren" && <div className={styles.profileRightSide}>
                                        <a href="#">
                                            <span>1</span>
                                            <h1>followers</h1>
                                        </a>
                                        <a href="#">
                                            <span>1</span>
                                            <h1>following</h1>
                                        </a>
                                    </div>}
                                </form>

                                {(props.profile?.data?.bio || editingProfile) && <div className={styles.bio}>
                                    <div className={styles.title}>Bio</div>
                                    {!editingProfile ? props.profile?.data?.bio : <Input
                                        type="text"
                                        placeholder="Bio (optional, you can leave it blank)"
                                        onChange={e => setEditProfile({ ...editProfile, bio: e.target.value })}
                                        value={editProfile.bio}
                                        style={{ marginTop: 4, }}
                                        multilineStyle={{ maxHeight: 100, minHeight: 60, maxWidth: 450 }}
                                        error={editErrors.bio != false}
                                        maxLength={128}
                                        multiline
                                    />}
                                </div>}
                            </div>
                        </div>
                        <div className={styles.bottom}>

                            {editingProfile && <div className={styles.setVisibility}>
                                <Button
                                    text={`Profile visibility: ${editProfile.visibility == false ? "private" : "public"}`}
                                    icon={editProfile.visibility == false ? <VisibleOffIcon height={24} width={24} fill={"#19181e"} style={{ marginRight: 8 }} /> : <VisibleIcon height={24} width={24} fill={"#19181e"} style={{ marginRight: 8 }} />}
                                    style={{ height: 48, borderStyle: "none" }}
                                    onClick={() => setEditProfile({ ...editProfile, visibility: !editProfile.visibility })}
                                    reversed
                                />
                            </div>}

                            {((auth?.authUser?.uid == props.profile?.uid) && !editingProfile) && <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                <Button
                                    text="Edit Profile"
                                    icon={<EditIcon height={24} width={24} fill={"#19181e"} style={{ marginRight: 8 }} />}
                                    style={{ height: 48, minWidth: 240, marginLeft: 16, marginRight: 16, borderStyle: "none" }}
                                    onClick={() => { if (!editAvatarLoading) setEditingProfile(true) }}
                                    reversed
                                />
                            </div>}

                            {(auth?.authUser?.uid == props.profile?.uid) || <div className={styles.interactive}>
                                <Button
                                    text="Follow"
                                    icon={<AddIcon height={24} width={24} fill={"#19181e"} style={{ marginRight: 8 }} />}
                                    style={{ height: 48, marginLeft: 16, borderStyle: "none" }}
                                    onClick={() => {
                                        if (!auth?.authUser) {
                                            router.replace("/login");
                                        } else {
                                            alert("Feature not available yet")
                                        }
                                    }}
                                    reversed
                                />
                                <Button
                                    text="Message"
                                    icon={<SendIcon height={24} width={24} fill={"#19181e"} style={{ marginRight: 8 }} />}
                                    style={{ height: 48, marginRight: 16, borderStyle: "none" }}
                                    onClick={() => {
                                        if (!auth?.authUser) {
                                            router.replace("/login");
                                        } else {
                                            alert("Feature not available yet")
                                        }
                                    }}
                                    reversed
                                />
                            </div>}

                            {((auth?.authUser?.uid == props.profile?.uid) && editingProfile) && <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                                <Button
                                    text="Cancel"
                                    icon={<CrossIcon height={24} width={24} fill={"#19181e"} style={{ marginRight: 8 }} />}
                                    style={{ height: 48, minWidth: 120, width: "48%", borderStyle: "none" }}
                                    onClick={() => {
                                        setEditingProfile(false);
                                        setEditErrors({ username: false, fullname: false, bio: false });
                                        setEditProfile({
                                            fullname: props.validate?.data?.fullname,
                                            username: props.validate?.data?.username,
                                            bio: props.validate?.data?.bio,
                                            visibility: props.validate?.data?.profileVisible || true
                                        });
                                    }}
                                    reversed
                                />
                                <Button
                                    text="Save"
                                    icon={<CheckIcon height={24} width={24} fill={"#19181e"} style={{ marginRight: 8 }} />}
                                    style={{ height: 48, minWidth: 120, width: "48%", borderStyle: "none" }}
                                    type="submit"
                                    form="editProfile"
                                    reversed
                                />
                            </div>}
                        </div>
                    </div>
                </div>
            }

            {
                (props.profile?.data?.profileVisible == false && !(auth?.authUser?.uid == props.profile?.uid)) ? <div className={styles.privateProfile}>
                    <LockIcon height={24} width={24} fill={"#19181e"} />
                    <h1>This profile visibility is set to private.</h1>
                </div> : <div className={styles.privateProfile}>should be content here...</div>
            }
        </div>
    </div>)
}

export default Profile

export async function getServerSideProps(ctx) {
    const { req, res, query } = ctx;
    let validate = {};
    let profile = {};

    const queryUsername = query?.username;

    if (req) {
        const authCookie = req.cookies.auth;
        //const emailCookie = req.cookies.email;

        const profileData = await fetch(`${server}/api/profile/${queryUsername.toLowerCase()}`, {
            'Content-Type': 'application/json',
            method: "POST",
        }).then(response => response.json());
        console.log("profile: ", profileData);

        profile = { ...profileData };

        if (authCookie) {
            const data = await fetch(`${server}/api/validate`, {
                'Content-Type': 'application/json',
                method: "POST",
                body: JSON.stringify({ token: authCookie }),
            }).then(response => response.json());

            console.log("data (index.js): ", data);
            if (data.success) {
                validate = { ...data };
            } else {
                validate = { error: data.error?.code }
            }
        } else {
            validate = { error: "no-token" }
        }
    }
    return { props: { validate, profile } }
}