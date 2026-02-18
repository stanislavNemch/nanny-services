import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebase";
import { DB_ROOT } from "../../firebase/constants";
import type { Nanny } from "../../types/nanny";
import NannyCard from "../../components/NannyCard";
import Filters from "../../components/Filters";
import styles from "./NanniesPage.module.css";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import { useNannyFilter } from "../../hooks/useNannyFilter";

const NanniesPage = () => {
    const [allNannies, setAllNannies] = useState<Nanny[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Show all");
    const [visibleCount, setVisibleCount] = useState(3);

    const { favorites, toggleFavorite } = useFavorites();
    const { currentUser } = useAuth();

    // Use custom hook for filtering
    const filteredNannies = useNannyFilter(allNannies, filter);

    useEffect(() => {
        const fetchNannies = async () => {
            setLoading(true);
            try {
                // Fetch from isolated app path
                const rootRef = ref(
                    database,
                    `${DB_ROOT}/nanny-services/nannies`,
                );
                const rootSnapshot = await get(rootRef);

                if (rootSnapshot.exists()) {
                    const data = rootSnapshot.val();
                    // Normalize data: filter items that look like nannies
                    const list: Nanny[] = Object.keys(data)
                        .map((key) => ({
                            id: key,
                            ...data[key],
                        }))
                        .filter((item) => item.name && item.price_per_hour);

                    setAllNannies(list);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        fetchNannies();
    }, []);

    const visibleNannies = filteredNannies.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    const handleFavoriteToggle = (id: string) => {
        if (!currentUser) {
            toast.error("Please log in to add to favorites");
            return;
        }
        toggleFavorite(id);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <Filters onFilterChange={setFilter} />
                {loading ? (
                    <Loader />
                ) : (
                    <div className={styles.list}>
                        {visibleNannies.map((nanny) => (
                            <NannyCard
                                key={nanny.id}
                                nanny={nanny}
                                isFavorite={favorites.includes(nanny.id)}
                                onToggleFavorite={() =>
                                    handleFavoriteToggle(nanny.id)
                                }
                            />
                        ))}
                    </div>
                )}
                {visibleCount < filteredNannies.length && (
                    <button
                        className={styles.loadMoreButton}
                        onClick={handleLoadMore}
                    >
                        Load more
                    </button>
                )}
            </div>
        </section>
    );
};

export default NanniesPage;
