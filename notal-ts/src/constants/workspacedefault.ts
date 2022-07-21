import { WorkspaceTypes } from "@types";

import { CONSTANTS } from ".";

export const WorkspaceDefaults: WorkspaceTypes = {
  _id: "workspace-default",
  id: "workspace-default",
  owner: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  title: CONSTANTS.DEFAULT_WORKSPACE_TITLE,
  desc: "",
  starred: false,
  workspaceVisible: false,
  thumbnail: {
    type: CONSTANTS.DEFAULT_WORKSPACE_THUMBNAIL_TYPE,
    file: CONSTANTS.MICHAEL,
    color: CONSTANTS.DEFAULT_WORKSPACE_THUMBNAIL_COLOR,
    colors: {
      start: CONSTANTS.DEFAULT_WORKSPACE_THUMBNAIL_GRADIENT.start,
      end: CONSTANTS.DEFAULT_WORKSPACE_THUMBNAIL_GRADIENT.end,
    },
  },
};
