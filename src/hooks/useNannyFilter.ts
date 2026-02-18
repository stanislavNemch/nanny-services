import { useMemo } from "react";
import type { Nanny } from "../types/nanny";

export const useNannyFilter = (nannies: Nanny[], filter: string) => {
    const filteredNannies = useMemo(() => {
        let sortedList = [...nannies];

        switch (filter) {
            case "A to Z":
                sortedList.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z to A":
                sortedList.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "Less than 10$":
                sortedList = sortedList.filter((n) => n.price_per_hour < 10);
                break;
            case "Greater than 10$":
                sortedList = sortedList.filter((n) => n.price_per_hour > 10);
                break;
            case "Popular":
                sortedList.sort((a, b) => b.rating - a.rating);
                break;
            case "Not popular":
                sortedList.sort((a, b) => a.rating - b.rating);
                break;
            case "Show all":
            default:
                break;
        }
        return sortedList;
    }, [nannies, filter]);

    return filteredNannies;
};
