import { useEffect, type ReactNode } from "react";
import { useUsersStore } from "../store/usersStore";
import { useGlobalStore } from "../store/globalStore";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const userId = useUsersStore((state) => state.id);
  const toggleLoginModal = useGlobalStore((state) => state.toggleLoginModal);

  useEffect(() => {
    if (!userId) {
      toggleLoginModal();
    }
  }, [toggleLoginModal, userId]);

  if (userId) {
    return children;
  }

  return <div>Protected</div>;
};

export default ProtectedRoute;
