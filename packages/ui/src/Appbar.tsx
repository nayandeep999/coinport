import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
    return (
        <div className="flex items-center border-b px-4 border-gray-700 pt-2">
          <div className="ml-auto"> {/* Add ml-auto to shift the button right */}
            <Button onClick={user ? onSignout : onSignin}>
              {user ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      );
      
};
