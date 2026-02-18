import { useEffect, useState, useMemo } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebase";
import { DB_ROOT } from "../../firebase/constants";
import type { Nanny } from "../../types/nanny";
import NannyCard from "../../components/NannyCard";
import Filters from "../../components/Filters";
import styles from "./FavoritesPage.module.css";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import { useNannyFilter } from "../../hooks/useNannyFilter";

const FavoritesPage = () => {
    const [allNannies, setAllNannies] = useState<Nanny[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Show all");
    const [visibleCount, setVisibleCount] = useState(3);

    const { favorites, toggleFavorite, loadingFavorites } = useFavorites();
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchNannies = async () => {
            setLoading(true);
            try {
                const rootRef = ref(
                    database,
                    `${DB_ROOT}/nanny-services/nannies`,
                );
                const rootSnapshot = await get(rootRef);

                if (rootSnapshot.exists()) {
                    const data = rootSnapshot.val();
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

    const favoriteNannies = useMemo(() => {
        if (!favorites || favorites.length === 0) return [];
        return allNannies.filter((n) => favorites.includes(n.id));
    }, [allNannies, favorites]);
    const filteredFavorites = useNannyFilter(favoriteNannies, filter);

    const visibleNannies = filteredFavorites.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <Filters onFilterChange={setFilter} />

                {loading || loadingFavorites ? (
                    <Loader />
                ) : !currentUser ? (
                    <p>Please log in to view favorites.</p>
                ) : favoriteNannies.length === 0 ? (
                    <p>No favorites added yet.</p>
                ) : (
                    <div className={styles.list}>
                        {visibleNannies.map((nanny) => (
                            <NannyCard
                                key={nanny.id}
                                nanny={nanny}
                                isFavorite={true}
                                onToggleFavorite={() =>
                                    toggleFavorite(nanny.id)
                                }
                            />
                        ))}
                    </div>
                )}

                {visibleCount < filteredFavorites.length && (
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

export default FavoritesPage;
