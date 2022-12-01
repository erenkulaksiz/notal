import { useState, useRef, useReducer } from "react";

import {
  Modal,
  Button,
  Input,
  Checkbox,
  HomeWorkspaceCard,
  Select,
  Loading,
  Tab,
  Colorpicker,
} from "@components";
import {
  AddIcon,
  CrossIcon,
  CheckIcon,
  StarFilledIcon,
  StarOutlineIcon,
  VisibleIcon,
  VisibleOffIcon,
  CloudUploadIcon,
} from "@icons";
import { Log, getRandomQuote, QUOTE_TYPES } from "@utils";
import { useNotalUI } from "@hooks";
import { WorkspaceService } from "@services/WorkspaceService";
import { LIMITS } from "@constants/limits";
import { WorkspaceDefaults } from "@constants/workspacedefaults";
import {
  AddWorkspaceModalProps,
  AddWorkspaceActionType,
} from "./AddWorkspace.d";
import { reducer } from "./reducer";

export function AddWorkspaceModal({
  open,
  onClose,
  onAdd,
}: AddWorkspaceModalProps) {
  const [state, dispatch] = useReducer(reducer, WorkspaceDefaults);
  const NotalUI = useNotalUI();
  const randomWorkspacePlaceholder = useRef(
    getRandomQuote(QUOTE_TYPES.WORKSPACE_TITLE)
  );

  const [newWorkspaceErr, setNewWorkspaceErr] = useState<{
    title: string | boolean;
    desc: string | boolean;
  }>({
    title: false,
    desc: false,
  });
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const thumbnailRef = useRef<HTMLInputElement>(null);

  function close() {
    onClose();
    randomWorkspacePlaceholder.current = getRandomQuote(
      QUOTE_TYPES.WORKSPACE_TITLE
    );
    setNewWorkspaceErr({ ...newWorkspaceErr, title: false, desc: false });
    dispatch({
      type: AddWorkspaceActionType.SET_WORKSPACE,
      payload: WorkspaceDefaults,
    });
    setTab(0);
  }

  async function submit() {
    if (state.title.length < LIMITS.MIN.WORKSPACE_TITLE_CHARACTER_LENGTH) {
      setNewWorkspaceErr({
        ...newWorkspaceErr,
        title: `Title must be minimum ${LIMITS.MIN.WORKSPACE_TITLE_CHARACTER_LENGTH} characters long.`,
      });
      return;
    }
    if (state.title.length > LIMITS.MAX.WORKSPACE_TITLE_CHARACTER_LENGTH) {
      setNewWorkspaceErr({
        ...newWorkspaceErr,
        title: `Title must be maximum ${LIMITS.MAX.WORKSPACE_TITLE_CHARACTER_LENGTH} characters long.`,
      });
      return;
    }
    if (
      state.desc &&
      state.desc.length > LIMITS.MAX.WORKSPACE_DESC_CHARACTER_LENGTH
    ) {
      setNewWorkspaceErr({
        ...newWorkspaceErr,
        desc: `Description must be maximum ${LIMITS.MAX.WORKSPACE_DESC_CHARACTER_LENGTH} characters long.`,
      });
      return;
    }
    // reset errors
    setNewWorkspaceErr({ ...newWorkspaceErr, title: false, desc: false });

    // on non-image type thumbnails
    if (state.thumbnail.type != "image") {
      onAdd(state);
      close();
      return;
    }

    if (!state.thumbnail.fileData) return;
    Log.debug(state.thumbnail.fileData);

    // check file size
    const file = Math.round(state.thumbnail.fileData.size / 1024);
    if (file >= LIMITS.MAX.WORKSPACE_THUMBNAIL_IMAGE_SIZE) {
      NotalUI.Toast.show({
        title: "Error",
        desc: `File size must be less than ${LIMITS.MAX.WORKSPACE_THUMBNAIL_IMAGE_SIZE.toString().charAt(
          0
        )}MB.`,
        type: "error",
        once: true,
        id: "add-workspace-thumbnail-error",
      });
      return;
    }

    // check file type
    const fileType = state.thumbnail.fileData.type;
    if (
      fileType == "image/jpeg" ||
      fileType == "image/png" ||
      fileType == "image/jpg"
    ) {
      setThumbnailLoading(true);
      const res = await WorkspaceService.workspace.uploadThumbnail({
        image: state.thumbnail.fileData,
      });

      if (res && res.success) {
        setThumbnailLoading(false);
        dispatch({
          type: AddWorkspaceActionType.SET_THUMBNAIL,
          payload: {
            thumbnail: {
              ...state.thumbnail,
              file: res.url,
              fileData: null,
            },
          },
        });
        // send res data to server now
        Log.debug("thumbnail upload success! res: ", res);

        onAdd({
          ...state,
          thumbnail: {
            file: res.url,
            type: "image",
          },
          _id: Date.now().toString(),
          id: Date.now().toString(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        close();
        return;
      } else {
        // error
        Log.error("thumbnail upload error: ", res);
        setThumbnailLoading(false);
        NotalUI.Toast.show({
          title: "Error",
          desc: "An error occurred while uploading the file. Please check the console.",
          type: "error",
          once: true,
          id: "add-workspace-thumbnail-error",
        });
        return;
      }
    }
  }

  function onThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        dispatch({
          type: AddWorkspaceActionType.SET_THUMBNAIL,
          payload: {
            thumbnail: {
              ...state.thumbnail,
              file: reader.result,
              fileData: file,
            },
          },
        });
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => !thumbnailLoading && close()}
      className="w-[90%] sm:w-[400px] h-[640px] p-4 px-5 relative"
      animate
    >
      <Modal.Title animate>
        <AddIcon size={24} fill="currentColor" />
        <span className="text-lg font-medium ml-1">Add Workspace</span>
      </Modal.Title>
      <Modal.Body className="flex flex-col pb-2 " animate>
        {thumbnailLoading && (
          <div className="absolute left-0 right-0 bottom-0 top-0 flex items-center justify-center bg-neutral-300/40 dark:bg-neutral-800/40 rounded-xl z-50">
            <Loading size="xl" />
          </div>
        )}
        <div className="w-full mb-4 relative pointer-events-none">
          <div className="text-3xl font-medium absolute left-2 top-0 z-50 uppercase dark:text-white/50 text-black/50">
            Preview
          </div>
          <HomeWorkspaceCard
            preview
            workspace={{
              workspaceVisible: state.workspaceVisible,
              title: state.title || "Enter a title",
              desc: state.desc,
              starred: state.starred,
              thumbnail: state.thumbnail,
              _id: WorkspaceDefaults._id,
              id: WorkspaceDefaults.id,
              createdAt: WorkspaceDefaults.createdAt,
              updatedAt: WorkspaceDefaults.updatedAt,
            }}
          />
        </div>
        <Tab
          selected={tab}
          onSelect={(index) => setTab(index)}
          id="workspaceTab"
          globalTabViewClassName="pt-2 flex flex-col gap-2"
          animated
        >
          <Tab.TabView title="Workspace">
            <label
              htmlFor="workspaceTitle"
              className="flex flex-row items-center gap-2"
            >
              <span>Workspace Title*</span>
              <div className="text-xs text-neutral-400">
                {`${state.title.length} / ${LIMITS.MAX.WORKSPACE_TITLE_CHARACTER_LENGTH}`}
              </div>
            </label>
            <Input
              fullWidth
              placeholder={randomWorkspacePlaceholder.current}
              onChange={(e) =>
                dispatch({
                  type: AddWorkspaceActionType.SET_TITLE,
                  payload: e.target.value,
                })
              }
              value={state.title}
              id="workspaceTitle"
              maxLength={LIMITS.MAX.WORKSPACE_TITLE_CHARACTER_LENGTH}
            />
            {newWorkspaceErr.title != false && (
              <span className="text-red-500">{newWorkspaceErr.title}</span>
            )}
            <label
              htmlFor="workspaceDescription"
              className="flex flex-row items-center gap-2"
            >
              Workspace Description
              {state.desc?.length != 0 && (
                <div className="text-xs text-neutral-400">
                  {state?.desc?.length} /{" "}
                  {LIMITS.MAX.WORKSPACE_DESC_CHARACTER_LENGTH}
                </div>
              )}
            </label>
            <Input
              fullWidth
              placeholder="Workspace Description"
              onChange={(e) =>
                dispatch({
                  type: AddWorkspaceActionType.SET_DESC,
                  payload: e.target.value,
                })
              }
              value={state.desc}
              id="workspaceDescription"
              maxLength={LIMITS.MAX.WORKSPACE_DESC_CHARACTER_LENGTH}
            />
            {newWorkspaceErr.desc != false && (
              <span className="text-red-500">{newWorkspaceErr.desc}</span>
            )}
            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  {state.starred ? (
                    <StarFilledIcon
                      size={24}
                      fill="currentColor"
                      style={{ transform: "scale(0.7)" }}
                      className="-ml-1"
                    />
                  ) : (
                    <StarOutlineIcon
                      size={24}
                      fill="currentColor"
                      style={{ transform: "scale(0.7)" }}
                      className="-ml-1"
                    />
                  )}
                  <Checkbox
                    id="starredWorkspace"
                    checked={state.starred}
                    onChange={(starred) =>
                      dispatch({
                        type: AddWorkspaceActionType.SET_STARRED,
                        payload: starred,
                      })
                    }
                  >
                    Add to favorites
                  </Checkbox>
                </div>
                <div className="text-sm text-neutral-400">
                  Add this workspace to your favorites.
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  {state.workspaceVisible ? (
                    <VisibleIcon
                      width={24}
                      height={24}
                      fill="currentColor"
                      style={{ transform: "scale(0.7)" }}
                      className="-ml-1"
                    />
                  ) : (
                    <VisibleOffIcon
                      width={24}
                      height={24}
                      fill="currentColor"
                      style={{ transform: "scale(0.7)" }}
                      className="-ml-1"
                    />
                  )}
                  <Checkbox
                    id="privateWorkspace"
                    checked={state.workspaceVisible}
                    onChange={(workspaceVisible) =>
                      dispatch({
                        type: AddWorkspaceActionType.SET_VISIBLE,
                        payload: workspaceVisible,
                      })
                    }
                  >
                    Public Workspace
                  </Checkbox>
                </div>
                <div className="text-sm text-neutral-400">
                  If enabled, anyone can see your workspace even if they arent
                  signed in.
                </div>
              </div>
            </div>
          </Tab.TabView>
          <Tab.TabView title="Thumbnail">
            <label htmlFor="thumbnailType">Workspace Thumbnail Type</label>
            <Select
              onChange={(e) =>
                dispatch({
                  type: AddWorkspaceActionType.SET_THUMB_TYPE,
                  payload: e.target.value,
                })
              }
              className="w-full"
              id="thumbnailType"
              options={[
                {
                  id: "gradient",
                  text: "Color Gradient",
                },
                {
                  id: "image",
                  text: "Image",
                },
                {
                  id: "singleColor",
                  text: "Single Color",
                },
              ]}
            />
            {state?.thumbnail?.type == "image" && (
              <div
                className="flex flex-col text-blue-400 mt-2 items-center justify-center w-full h-16 border-2 border-solid border-blue-400 group hover:border-blue-300 hover:text-blue-300 rounded-xl cursor-pointer"
                onClick={() => {
                  if (!thumbnailLoading) {
                    thumbnailRef?.current?.click();
                  }
                }}
              >
                <CloudUploadIcon size={24} fill="currentColor" />
                Upload Thumbnail
                <input
                  type="file"
                  ref={thumbnailRef}
                  style={{ display: "none" }}
                  onChange={onThumbnailChange}
                  accept="image/png, image/jpeg"
                />
              </div>
            )}
            {state?.thumbnail?.type == "singleColor" && (
              <div className="flex flex-col items-start">
                <label htmlFor="cardColor">Workspace Color</label>
                <Colorpicker
                  id="cardColor"
                  color={state?.thumbnail?.color}
                  onChange={(color) => {
                    dispatch({
                      type: AddWorkspaceActionType.SET_THUMB_COLOR,
                      payload: color,
                    });
                  }}
                />
              </div>
            )}
            {state?.thumbnail?.type == "gradient" && (
              <div className="flex items-center gap-2">
                <div>
                  <label htmlFor="cardStartColor">Start Color</label>
                  <Colorpicker
                    id="cardStartColor"
                    color={state?.thumbnail?.colors?.start}
                    onChange={(color) => {
                      dispatch({
                        type: AddWorkspaceActionType.SET_THUMB_GRADIENT_COLORS,
                        payload: {
                          start: color,
                        },
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="cardEndColor">End Color</label>
                  <Colorpicker
                    id="cardEndColor"
                    color={state?.thumbnail?.colors?.end}
                    onChange={(color) => {
                      dispatch({
                        type: AddWorkspaceActionType.SET_THUMB_GRADIENT_COLORS,
                        payload: {
                          end: color,
                        },
                      });
                    }}
                  />
                </div>
              </div>
            )}
          </Tab.TabView>
        </Tab>
      </Modal.Body>
      <Modal.Footer className="justify-between items-end flex-1" animate>
        <Button
          light="bg-red-500 hover:bg-red-600 active:bg-red-700 dark:bg-red-500 hover:dark:bg-red-500"
          onClick={() => !thumbnailLoading && close()}
          fullWidth="w-[49%]"
        >
          <CrossIcon size={24} fill="currentColor" />
          Cancel
        </Button>
        <Button
          onClick={() => !thumbnailLoading && submit()}
          loading={thumbnailLoading}
          fullWidth="w-[49%]"
        >
          <CheckIcon size={24} fill="currentColor" />
          Add Workspace
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
