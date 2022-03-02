import { motion } from "framer-motion";

import { BackIcon } from "@icons";
import { HomeSidebarItem, Tooltip } from "@components";

import {
    HomeRoutes
} from '@utils/constants';

const HomeSidebar = ({ navCollapse, current, onViewingChange, onCollapse }) => {
    return (<motion.nav
        initial={{ width: "14rem" }}
        animate={navCollapse ? { width: "2.6rem" } : ""}
        transition={{ type: "spring", damping: 50, stiffness: 500 }}
        className="flex shadow-xl flex-col bg-white dark:bg-neutral-800 z-30 top-0 sticky max-w-2xl"
    //onMouseEnter={() => navCollapse && onCollapse()}
    //onMouseLeave={() => navCollapse || onCollapse()}
    >
        <div className="w-full h-10 flex justify-end">
            <button
                className="px-1.5"
                onClick={onCollapse}
            >
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={navCollapse ? { rotate: 180 } : ""}
                    transition={{ type: "tween", stiffness: 50 }}
                    className="dark:bg-neutral-800 rounded w-7 h-7 flex items-center justify-center hover:dark:bg-neutral-900 hover:bg-neutral-200 transition-colors ease-in-out"
                >
                    <BackIcon size={24} fill={"currentColor"} />
                </motion.div>
            </button>
        </div>
        {HomeRoutes.map((nav, index) => <Tooltip
            key={index}
            content={navCollapse ? nav.name : ""}
            direction="right"
        >
            <HomeSidebarItem
                nav={nav}
                onClick={() => onViewingChange({ nav })}
                current={current}
                navCollapse={navCollapse}
            />
        </Tooltip>)}
    </motion.nav>)
}

export default HomeSidebar;