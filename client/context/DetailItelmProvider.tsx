import { createContext, useState, ReactNode, useContext } from "react";

// Define the context type
interface ItemContextType {
    detailItem: string;
    setDetailItem: (detailItem: string) => void;
}

// Create the context with a default value of `null` since it will be provided later
 export const DetailItemContext = createContext<ItemContextType | undefined>(undefined);

// Create the provider component
export const DetailItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [detailItem, setDetailItem] = useState<string>('Font');

    return (
        <DetailItemContext.Provider value={{ detailItem, setDetailItem }}>
            {children}
        </DetailItemContext.Provider>
    );
};

// Custom hook to use the DetailItemContext
export const useDetailItem = (): ItemContextType => {
    const context = useContext(DetailItemContext);
    if (!context) {
        throw new Error("useDetailItem must be used within a DetailItemProvider");
    }
    return context;
};