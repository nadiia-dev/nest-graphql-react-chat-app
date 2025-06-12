import { Stack, Center, Tooltip, UnstyledButton, rem } from "@mantine/core";
import {
  IconBrandMessenger,
  IconBrandWechat,
  IconUser,
  IconLogout,
  IconLogin,
} from "@tabler/icons-react";
import { useState } from "react";
import { createStyles } from "@mantine/styles";
import { useGlobalStore } from "../store/globalStore";
import { useUsersStore } from "../store/usersStore";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../graphql/mutations/Logout";

const useStyles = createStyles((theme) => ({
  sidebar: {
    width: 100,
    minHeight: "100vh",
    maxHeight: "100vh",
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  navButton: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    cursor: "pointer",
    userSelect: "none",
    transition: "all 0.2s ease",
    border: "1px solid transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2],
      transform: "translateY(-1px)",
    },
  },

  active: {
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    color: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).color,
    borderColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).color,

    "&:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      transform: "none",
    },
  },

  logoutButton: {
    "&:hover": {
      backgroundColor: theme.colors.red[0],
      color: theme.colors.red[7],
      borderColor: theme.colors.red[2],
    },
  },

  loginButton: {
    "&:hover": {
      backgroundColor: theme.colors.green[0],
      color: theme.colors.green[7],
      borderColor: theme.colors.green[2],
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
  className?: string;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  className,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="right" withArrow>
      <UnstyledButton
        onClick={onClick}
        className={cx(
          classes.navButton,
          { [classes.active]: active },
          className
        )}
      >
        <Icon size="1.5rem" />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [{ icon: IconBrandWechat, label: "Chatrooms" }];

const Sidebar = () => {
  const toggleProfileSettingsModal = useGlobalStore(
    (state) => state.toggleProfileSettingsModal
  );
  const [active, setActive] = useState(0);
  const { classes } = useStyles();

  const userId = useUsersStore((state) => state.id);
  const user = useUsersStore((state) => state);
  const setUser = useUsersStore((state) => state.setUser);

  const toggleLoginModal = useGlobalStore((state) => state.toggleLoginModal);
  const [logoutUser] = useMutation(LOGOUT_USER, {
    onCompleted: () => {
      toggleLoginModal();
    },
  });

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  const handleLogout = async () => {
    await logoutUser();
    setUser({
      id: undefined,
      fullname: "",
      avatarUrl: null,
      email: "",
    });
    console.log("Logout");
  };

  return (
    <div className={classes.sidebar}>
      <div>
        <Center mb="xl">
          <IconBrandMessenger size={30} />
        </Center>
        <Stack gap={10} align="center">
          {userId && links}
        </Stack>
      </div>

      <Stack align="center" gap={0}>
        {userId && (
          <NavbarLink
            icon={IconUser}
            label={`Profile (${user.fullname})`}
            onClick={toggleProfileSettingsModal}
          />
        )}
        {userId ? (
          <NavbarLink
            icon={IconLogout}
            label="Logout"
            onClick={handleLogout}
            className={classes.logoutButton}
          />
        ) : (
          <NavbarLink
            icon={IconLogin}
            label="Login"
            onClick={toggleLoginModal}
            className={classes.loginButton}
          />
        )}
      </Stack>
    </div>
  );
};

export default Sidebar;
