import NotFoundPage from "../pages/NotFoundPage"
import ProfilePage from "../pages/ProfilePage"
import HomePage from "../pages/HomePage"
import StoryListPage from "../pages/StoryListPage"
import CreateStoryPage from "../pages/CreateStoryPage"
import EditStoryPage from "../pages/EditStoryPage"
import StoryDetailPage from "../pages/StoryDetailPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import RoleListPage from "../pages/RoleListPage"
import RoleDetailPage from "../pages/RoleDetailPage"
import PasswordResetRequestPage from "../pages/PasswordResetRequestPage"
import ResetPasswordPage from "../pages/ResetPasswordPage"
import UserListPage from "../pages/UserListPage"
import UserDetailPage from "../pages/UserDetailPage"
import CreateRolePage from "../pages/CreateRolePage"

export const nav = [
     { path:     "/", name: "Home", element: <HomePage />, isMenu: true, isPrivate: false, isAuthenticated: false, hasRole: [], hasPermissions: [] },
     { path:     "/login", name: "Login", element: <LoginPage />, isMenu: true, isPrivate: false, isAuthenticated: false, hasRole: [], hasPermissions: [] },
     { path:     "/register", name: "Register", element: <RegisterPage />, isMenu: true, isPrivate: false, isAuthenticated: false, hasRole: [], hasPermissions: [] },
     { path:     "/*", name: "Not found", element: <NotFoundPage />, isMenu: false, isPrivate: false, isAuthenticated: false, hasRole: [], hasPermissions: [] },
     { path:     "/forgot-password", name: "Forgot password", element: <PasswordResetRequestPage />, isMenu: false, isPrivate: false, isAuthenticated: false, hasRole: [], hasPermissions: [] },
     { path:     "/reset-password", name: "Reset password", element: <ResetPasswordPage />, isMenu: false, isPrivate: false, isAuthenticated: false, hasRole: [], hasPermissions: [] },
     { path:     "/account", name: "My Account", element: <ProfilePage />, isMenu: true, isPrivate: true, isAuthenticated: true, hasRole: [], hasPermissions: ["READ_ACCOUNT"] },
     { path:     "/createnewstory", name: "Create Story", element: <CreateStoryPage />, isMenu: false, isPrivate: true, isAuthenticated: true, hasRole: [], hasPermissions: ["CREATE_STORY"] },
     { path:     "/stories", name: "Stories", element: <StoryListPage />, isMenu: true, isPrivate: true, isAuthenticated: true, hasRole: [], hasPermissions: ["READ_STORY"] },
     { path:     "/story/:id", name: "View Story", element: <StoryDetailPage />, isMenu: false, isPrivate: true, isAuthenticated: true, hasRole: [], hasPermissions: ["READ_STORY"] },
     { path:     "/changestory/:id", name: "Edit Story", element: <EditStoryPage />, isMenu: false, isPrivate: true, isAuthenticated: true, hasRole: ["SUPERADMIN"], hasPermissions: ["UPDATE_STORY"] },
     { path:     "/rolemanagement", name: "Manage Roles", element: <RoleListPage />, isMenu: true, isPrivate: true, isAuthenticated: true, hasRole: ["SUPERADMIN"], hasPermissions: [] },
     { path:     "/usermanagement", name: "Manage Users", element: <UserListPage />, isMenu: true, isPrivate: true, isAuthenticated: true, hasRole: ["SUPERADMIN"], hasPermissions: [] },
     { path:     "/role/:id", name: "Role Details", element: <RoleDetailPage />, isMenu: false, isPrivate: true, isAuthenticated: true, hasRole: ["SUPERADMIN"], hasPermissions: [] },
     { path:     "/user/:id", name: "User Details", element: <UserDetailPage />, isMenu: false, isPrivate: true, isAuthenticated: true, hasRole: ["SUPERADMIN"], hasPermissions: [] },
     { path:     "/createnewrole", name: "Create Role", element: <CreateRolePage />, isMenu: false, isPrivate: true, isAuthenticated: true, hasRole: ["SUPERADMIN"], hasPermissions: [] }
];
