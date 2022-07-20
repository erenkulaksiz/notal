import { useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";

import { WorkspaceDefaults } from "@constants/workspacedefault";

import {
  Modal,
  Button,
  Input,
  Checkbox,
  HomeWorkspaceCard,
  Select,
  Tooltip,
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

import { useAuth } from "@hooks";

import { Log } from "@utils";

import type { AddWorkspaceModalProps } from "./AddWorkspace.d";

export function AddWorkspaceModal({
  open,
  onClose,
  onAdd,
}: AddWorkspaceModalProps) {
  const auth = useAuth();

  const [newWorkspace, setNewWorkspace] = useState(WorkspaceDefaults);

  const [newWorkspaceErr, setNewWorkspaceErr] = useState({
    title: false,
    desc: false,
  });
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  const [tab, setTab] = useState(0);

  function close() {
    onClose();
    setNewWorkspaceErr({ ...newWorkspace, title: false, desc: false });
    setNewWorkspace(WorkspaceDefaults);
    setTab(0);
  }

  function submit() {
    onAdd({
      ...newWorkspace,
      _id: Date.now().toString(),
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      owner: "",
    });
    close();
  }

  function onThumbnailChange() {}

  return (
    <Modal
      open={open}
      onClose={() => !thumbnailLoading && close()}
      className="w-[90%] sm:w-[400px] h-[560px] p-4 px-5 relative"
      animate
    >
      <Modal.Title animate>
        <AddIcon size={24} fill="currentColor" />
        <span className="text-lg font-medium ml-1">Add Workspace</span>
      </Modal.Title>
      <Modal.Body className="flex flex-col pb-2 min-h-[400px]" animate>
        {thumbnailLoading && (
          <div className="absolute left-0 right-0 bottom-0 top-0 flex items-center justify-center bg-neutral-300/40 dark:bg-neutral-800/40 rounded-xl z-50">
            <Loading size="xl" />
          </div>
        )}
        {/*<Input fullWidth icon={<UserIcon size={24} />} containerClassName="fill-neutral-600" placeholder="Workspace Title" />*/}
        <div className="w-full mb-4">
          <HomeWorkspaceCard
            preview
            workspace={{
              workspaceVisible: newWorkspace.workspaceVisible,
              title: newWorkspace.title || "Enter a title",
              desc: newWorkspace.desc,
              starred: newWorkspace.starred,
              thumbnail: newWorkspace.thumbnail,
              _id: "preview",
              id: "preview",
              owner: "",
              createdAt: Date.now(),
              updatedAt: Date.now(),
            }}
          />
        </div>
        <Tab
          selected={tab}
          onSelect={(index) => setTab(index)}
          id="workspaceTab"
          globalTabViewClassName="pt-4 grid grid-cols-1 gap-2"
        >
          <Tab.TabView title="Workspace">
            <label htmlFor="workspaceTitle">Workspace Title</label>
            <Input
              fullWidth
              placeholder="Workspace Title"
              onChange={(e) =>
                setNewWorkspace({ ...newWorkspace, title: e.target.value })
              }
              value={newWorkspace.title}
              id="workspaceTitle"
              maxLength={32}
            />
            {newWorkspaceErr.title != false && (
              <span className="text-red-500">{newWorkspaceErr.title}</span>
            )}
            <label htmlFor="workspaceDescription">Workspace Description</label>
            <Input
              fullWidth
              placeholder="Workspace Description"
              onChange={(e) =>
                setNewWorkspace({ ...newWorkspace, desc: e.target.value })
              }
              value={newWorkspace.desc}
              id="workspaceDescription"
              maxLength={96}
            />
            {newWorkspaceErr.desc != false && (
              <span className="text-red-500">{newWorkspaceErr.desc}</span>
            )}
            <div className="py-1 grid grid-cols-1 gap-2">
              <div className="flex flex-row items-center">
                {newWorkspace.starred ? (
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
                  checked={newWorkspace.starred}
                  onChange={(e) =>
                    setNewWorkspace({
                      ...newWorkspace,
                      starred: !newWorkspace.starred,
                    })
                  }
                >
                  Add to favorites
                </Checkbox>
              </div>
              <div className="flex flex-row items-center">
                {newWorkspace.workspaceVisible ? (
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
                  checked={!newWorkspace.workspaceVisible}
                  onChange={(e) =>
                    setNewWorkspace({
                      ...newWorkspace,
                      workspaceVisible: !newWorkspace.workspaceVisible,
                    })
                  }
                >
                  Private Workspace
                </Checkbox>
              </div>
            </div>
          </Tab.TabView>
          <Tab.TabView title="Thumbnail">
            <label htmlFor="thumbnailType">Workspace Thumbnail Type</label>
            <Select
              onChange={(e) =>
                setNewWorkspace({
                  ...newWorkspace,
                  thumbnail: {
                    ...newWorkspace.thumbnail,
                    type: e.target.value,
                  },
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
            {newWorkspace?.thumbnail?.type == "image" && (
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
            {newWorkspace?.thumbnail?.type == "singleColor" && (
              <div className="flex flex-col items-start">
                <label htmlFor="cardColor">Workspace Color</label>
                <Colorpicker
                  id="cardColor"
                  color={newWorkspace?.thumbnail?.color}
                  onChange={(color) => {
                    setNewWorkspace({
                      ...newWorkspace,
                      thumbnail: { ...newWorkspace.thumbnail, color },
                    });
                  }}
                />
              </div>
            )}
            {newWorkspace?.thumbnail?.type == "gradient" && (
              <div className="flex items-center gap-2">
                <div>
                  <label htmlFor="cardStartColor">Start Color</label>
                  <Colorpicker
                    id="cardStartColor"
                    color={newWorkspace?.thumbnail?.colors?.start}
                    onChange={(color) => {
                      setNewWorkspace({
                        ...newWorkspace,
                        thumbnail: {
                          ...newWorkspace.thumbnail,
                          colors: {
                            ...newWorkspace.thumbnail.colors,
                            start: color,
                          },
                        },
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="cardEndColor">End Color</label>
                  <Colorpicker
                    id="cardEndColor"
                    color={newWorkspace?.thumbnail?.colors?.end}
                    onChange={(color) => {
                      setNewWorkspace({
                        ...newWorkspace,
                        thumbnail: {
                          ...newWorkspace.thumbnail,
                          colors: {
                            ...newWorkspace.thumbnail.colors,
                            end: color,
                          },
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
