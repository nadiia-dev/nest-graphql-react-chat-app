import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalState {
  isProfileSettingsModalOpen: boolean;
  isLoginModalOpen: boolean;
  isCreateRoomModalOpen: boolean;
  toggleProfileSettingsModal: () => void;
  toggleLoginModal: () => void;
  toggleCreateRoomModal: () => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      isProfileSettingsModalOpen: false,
      isLoginModalOpen: false,
      isCreateRoomModalOpen: false,

      toggleProfileSettingsModal: () =>
        set((state) => ({
          isProfileSettingsModalOpen: !state.isProfileSettingsModalOpen,
        })),
      toggleLoginModal: () =>
        set((state) => ({
          isLoginModalOpen: !state.isLoginModalOpen,
        })),
      toggleCreateRoomModal: () =>
        set((state) => ({
          isCreateRoomModalOpen: !state.isCreateRoomModalOpen,
        })),
    }),
    {
      name: "global-store",
    }
  )
);
