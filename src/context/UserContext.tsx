import { getCurrentUser } from "@/services/auth";
import { ICart } from "@/types";
import { IUser } from "@/types/user";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

interface IUserProviderValues {
    user: IUser | null;
    isLoading: boolean;
    setUser: (user: IUser | null) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    handleUser: () => void;
    cart: ICart | null;
    setCart: Dispatch<SetStateAction<ICart | null>>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [cart, setCart] = useState<ICart | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleUser = async () => {
        const user = await getCurrentUser();

        setUser(user);
        setIsLoading(false);
    };

    useEffect(() => {
        handleUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                setIsLoading,
                handleUser,
                cart,
                setCart,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (context == undefined) {
        throw new Error("useUser must be used within the UserProvider context");
    }

    return context;
};

export default UserProvider;
