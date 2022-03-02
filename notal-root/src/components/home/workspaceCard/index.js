import { useState } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';

import {
    Button,
    Tooltip
} from '@components';

import {
    StarOutlineIcon,
    DeleteIcon,
    VisibleOffIcon,
    StarFilledIcon,
} from '@icons';

const HomeWorkspaceCard = ({ workspace, onStar, onDelete, index, skeleton = false }) => {

    if (skeleton) {
        return (<div className="w-full h-32 flex flex-col justify-end shadow-xl rounded-xl bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
            <div className="animate-pulse w-full h-18 px-4 pb-4">
                <div className="w-[65%] h-6 bg-neutral-300 dark:bg-neutral-700" />
                <div className="w-[80%] mt-2 h-4 bg-neutral-300 dark:bg-neutral-700" />
            </div>
        </div>)
    }

    return (
        <motion.div
            /*variants={{
                hidden: { y: -25, opacity: 0 },
                show: { y: 0, opacity: 1 },
            }}
            exit={{ y: -25, opacity: 0 }}
            */
            //transition={{ type: "spring", stiffness: 400, duration: 0.02, damping: 25 }}
            className="hover:z-50 hover:scale-[102%] transition-all w-full h-32 shadow-xl rounded-xl bg-gradient-to-br from-blue-500 to-[#6d02ab] p-3 flex flex-col justify-end"
        >
            <div className="flex flex-row justify-between">
                <div className="flex items-start justify-end text-xl flex-col text-white max-w-[calc(100%-60px)]">
                    {!workspace.workspaceVisible && <Tooltip content="Private workspace">
                        <VisibleOffIcon width={24} height={24} fill="white" />
                    </Tooltip>}
                    <Link href="/workspace/[id]" as={`/workspace/${workspace._id || "not-found"}`} passHref>
                        <a className="flex-col flex">
                            <span className="font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                                {workspace.title}
                            </span>
                            <span className="text-sm">
                                {workspace.desc}
                            </span>
                        </a>
                    </Link>
                </div>
                <div>
                    <Tooltip content={workspace?.starred ? "Remove from favorites" : "Add to favorites"}>
                        <Button className="mb-2 p-3 pt-1 pb-1" light onClick={onStar}>
                            {workspace?.starred ? <StarFilledIcon size={24} fill="currentColor" /> : <StarOutlineIcon size={24} fill="currentColor" />}
                        </Button>
                    </Tooltip>
                    <Tooltip content="Delete this workspace">
                        <Button className="p-3 pt-1 pb-1" light onClick={onDelete}>
                            <DeleteIcon size={24} fill="currentColor" />
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </motion.div>)
}

export default HomeWorkspaceCard;