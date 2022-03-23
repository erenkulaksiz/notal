import Link from "next/link";
import { WorkspaceSidebarItem, Tooltip } from "@components";
import { WorkspaceButtons } from "@utils/constants";

const WorkspaceSidebar = ({
    onStarred,
    onSettings,
    onVisible,
    onDelete,
    onAddField,
    workspaceStarred,
    workspaceVisible,
    workspaceUsers,
}) => {
    const action = {
        favorite: () => onStarred(),
        settings: () => onSettings(),
        visible: () => onVisible(),
        delete: () => onDelete(),
        addfield: () => onAddField(),
    }

    return (<nav className="flex flex-col justify-between items-center py-2 h-full sticky backdrop-blur-md top-0 w-14 dark:bg-neutral-800/50 bg-white/50 shadow-xl dark:shadow-neutral-800 shadow-neutral-300 pt-2 z-40">
        <div>
            {WorkspaceButtons.map((item, index) => (<WorkspaceSidebarItem
                item={item}
                key={index}
                onClick={action[item.id]}
                state={{
                    visible: workspaceVisible || false,
                    favorite: workspaceStarred || false,
                }}
            />))}
        </div>
        <div className="w-full h-full flex flex-col justify-end relative">
            {workspaceUsers && workspaceUsers.map((user, index) => <Tooltip
                content={
                    <div className="items-center flex-row flex">
                        <div className="p-[2px] w-8 h-8 rounded-full cursor-pointer bg-gradient-to-tr from-blue-700 to-pink-700">
                            <img
                                src={user?.avatar}
                                className="w-7 h-7 rounded-full border-[2px] dark:border-black border-white"
                                alt="Avatar"
                            />
                        </div>
                        <div className="flex flex-col ml-1">
                            <span className="h-4">{user.fullname ? `${user.fullname}` : `@${user.username}`}</span>
                            {user.fullname && <span className="text-xs dark:text-neutral-500 text-neutral-400">@{user.username}</span>}
                        </div>
                    </div>
                }
                key={index}
                direction="right"
                containerClassName="px-2"
                allContainerClassName={`absolute flex w-full h-8 hover:z-40 absolute`}
                style={{ bottom: index * 12 }}
            >
                <Link href="/profile/[username]" as={`/profile/${user?.username || "not-found"}`} passHref>
                    <a className="w-8 h-8 flex items-center justify-center border-2 border-solid rounded-full border-white dark:border-neutral-800">
                        <img
                            src={user?.avatar}
                            className="w-7 h-7 cursor-pointer rounded-full"
                            alt="Avatar"
                        />
                    </a>
                </Link>
            </Tooltip>)}
        </div>
    </nav>)
}

export default WorkspaceSidebar;