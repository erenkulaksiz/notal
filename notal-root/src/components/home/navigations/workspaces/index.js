import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import useSWR from "swr";
import { useRouter } from "next/router";

import useAuth from "@hooks/auth";
import { fetchWorkspaces } from "@utils/fetcher";
import { CheckToken } from "@utils";
import {
    AddWorkspaceBanner,
    AddWorkspaceButton,
    AddWorkspaceModal,
    DeleteWorkspaceModal,
    HomeWorkspaceCard,
    Select,
    Tooltip,
    HomeNavTitle,
    Loading,
} from '@components';
import {
    DashboardFilledIcon, FilterIcon
} from '@icons';
import { FilterWorkspaces } from "@utils/filterWorkspaces";

const HomeNavWorkspaces = ({ validate, isValidating }) => {
    const auth = useAuth();
    const router = useRouter();
    // Modals
    const [newWorkspaceModal, setNewWorkspaceModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ workspace: -1, visible: false });

    const [loadingWorkspaces, setLoadingWorkspaces] = useState(true);
    const [filter, setFilter] = useState(null);
    const [_workspaces, _setWorkspaces] = useState([]);
    const [_workspacesFiltered, _setWorkspacesFiltered] = useState([]);
    const [_workspaceValidating, _setWorkspaceValidating] = useState(true);

    const workspacesData = useSWR(
        ['api/fetchWorkspaces'],
        () => fetchWorkspaces({ token: Cookies.get("auth"), uid: validate.uid })
    );

    useEffect(() => {
        (async () => {
            if (workspacesData?.data?.success) {
                if (workspacesData?.data?.error?.code == "auth/id-token-expired") {
                    const token = await auth.users.getIdToken();
                    const res = await CheckToken({ token: token.res, props });
                    if (!res) {
                        setTimeout(() => router.replace(router.asPath), 1000);
                    }
                } else {
                    _setWorkspaces(workspacesData?.data?.data);
                    setLoadingWorkspaces(false);
                }
            }
            if (workspacesData.error) {
                console.error("swr err: ", workspacesData.error);
            }
        })();
    }, [workspacesData]);

    useEffect(() => {
        _setWorkspaceValidating(workspacesData.isValidating);
        isValidating(workspacesData.isValidating);
    }, [workspacesData.isValidating]);

    useEffect(() => {
        !_workspaces?.error &&
            _setWorkspacesFiltered([...FilterWorkspaces({ workspaces: _workspaces, filter })]);
    }, [filter, _workspaces]);

    const workspace = {
        create: async ({ title, desc, starred }) => {
            const newWorkspaces = _workspaces;
            newWorkspaces.push({ title, desc, starred, createdAt: Date.now(), updatedAt: Date.now(), workspaceVisible: false });
            _setWorkspaces([...newWorkspaces]);

            await auth.workspace.createWorkspace({ title, desc, starred, workspaceVisible: false });

            /*const authCookie = Cookies.get("auth");
            const workspaces = await GetWorkspaces({ uid: validate?.uid, token: authCookie });
            console.log("Got all workspaces: ", workspaces);
            _setWorkspaces([...workspaces.data]);*/
            workspacesData.mutate();
        },
        delete: async ({ id }) => {
            setDeleteModal({ visible: false, workspace: -1 }); // set visiblity to false and id to -1

            const newWorkspaces = _workspaces;
            newWorkspaces.splice(_workspaces.findIndex(el => el._id == id), 1);
            _setWorkspaces([...newWorkspaces]);

            auth.workspace.deleteWorkspace({ id });
        },
        star: async ({ id }) => {
            const newWorkspaces = _workspaces;
            const workspaceIndex = newWorkspaces.findIndex(el => el._id == id)
            newWorkspaces[workspaceIndex].starred = !newWorkspaces[workspaceIndex].starred;
            newWorkspaces[workspaceIndex].updatedAt = Date.now(); // update date
            _setWorkspaces([...newWorkspaces]);

            const data = await auth.workspace.starWorkspace({ id });
            if (data?.error) console.error("error on star workspace: ", data.error);
        },
        /*
        closeModal: () => {
            setNewWorkspaceVisible(false);
            setNewWorkspaceErr({ ...newWorkspace, desc: false, title: false });
            setNewWorkspace({ ...newWorkspace, title: "", desc: "", starred: "" });
        },
        */
    }

    return (<div className="flex flex-1 px-8 py-4 flex-col overflow-y-auto overflow-x-hidden">
        <div className="w-full grid gap-2 flex-row items-center flex-wrap grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
            <HomeNavTitle title="Workspaces">
                <DashboardFilledIcon size={24} fill="currentColor" />
            </HomeNavTitle>
            <div className="flex-1 flex flex-row items-center justify-end">
                {/*_workspaceValidating && <div className="flex sm:flex-row flex-col items-center justify-center p-1 bg-neutral-800 rounded-lg mr-4 px-3">
                    <Loading size="md" />
                    <span className="ml-2 text-sm">Loading...</span>
</div>*/}
                <FilterIcon size={24} fill="currentColor" className="mr-4" />
                <Tooltip
                    content="Filter Workspaces"
                    direction="bottom"
                    allContainerClassName="sm:w-64 w-full"
                >
                    <Select
                        onChange={e => setFilter(e.target.value)}
                        className="w-full"
                        options={[{
                            id: null,
                            text: "All Workspaces"
                        },
                        {
                            id: "favorites",
                            text: "Favorites"
                        },
                        {
                            id: "privateWorkspaces",
                            text: "Private"
                        },
                        {
                            id: "createdAt",
                            text: "Create Time"
                        },
                        {
                            id: "updatedAt",
                            text: "Last Update Time"
                        }
                        ]}
                    />
                </Tooltip>
            </div>
        </div>

        <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.03 }}
            className="relative pb-4 mt-4 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 items-start auto-rows-max"
        >
            {!loadingWorkspaces && _workspacesFiltered.map((element, index) => <HomeWorkspaceCard
                workspace={element}
                key={index}
                index={index}
                onStar={() => workspace.star({ id: element._id })}
                onDelete={() => setDeleteModal({ ...deleteModal, visible: true, workspace: element._id })}
            />)}
            {!loadingWorkspaces && <AddWorkspaceButton onClick={() => setNewWorkspaceModal(true)} />}
            {loadingWorkspaces && [1, 2, 3, 4].map((item) => <HomeWorkspaceCard skeleton key={item} />)}
        </motion.div>

        {(!loadingWorkspaces && _workspacesFiltered.length == 0) && (
            <div className="w-full h-full relative">
                <AddWorkspaceBanner />
            </div>
        )}

        <DeleteWorkspaceModal
            open={deleteModal.visible}
            onClose={() => setDeleteModal({ ...deleteModal, visible: false })}
            onDelete={() => {
                setDeleteModal({ ...deleteModal, visible: false });
                workspace.delete({ id: deleteModal.workspace });
            }}
        />
        <AddWorkspaceModal
            open={newWorkspaceModal}
            onClose={() => setNewWorkspaceModal(false)}
            onAdd={({ title, desc, starred }) => workspace.create({ title, desc, starred })}
        />
    </div >)
}

export default HomeNavWorkspaces;