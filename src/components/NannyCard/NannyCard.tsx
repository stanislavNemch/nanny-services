import { useState } from "react";
import type { Nanny } from "../../types/nanny";
import styles from "./NannyCard.module.css";
import { FaStar, FaHeart, FaRegHeart, FaMapMarkerAlt } from "react-icons/fa";
import clsx from "clsx";
import Modal from "../Modal";
import AppointmentForm from "../AppointmentForm";
import { useModal } from "../../hooks/useModal";

interface NannyCardProps {
    nanny: Nanny;
    onToggleFavorite: () => void;
    isFavorite: boolean;
}

const NannyCard: React.FC<NannyCardProps> = ({
    nanny,
    onToggleFavorite,
    isFavorite,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const appointmentModal = useModal();

    return (
        <>
            <div className={styles.card}>
                <div className={styles.avatarWrapper}>
                    <img
                        src={nanny.avatar_url}
                        alt={nanny.name}
                        className={styles.avatar}
                    />
                    <div className={styles.onlineStatus} />
                </div>

                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.titleGroup}>
                            <span className={styles.role}>Nanny</span>
                            <h3 className={styles.name}>{nanny.name}</h3>
                        </div>

                        <div className={styles.metaInfo}>
                            <div className={styles.location}>
                                <FaMapMarkerAlt
                                    className={styles.icon}
                                    size={16}
                                />
                                <span>{nanny.location}</span>
                            </div>
                            <div className={styles.rating}>
                                <FaStar className={styles.starIcon} size={16} />
                                <span>Rating: {nanny.rating}</span>
                            </div>
                            <div className={styles.price}>
                                Price / 1 hour:{" "}
                                <span className={styles.priceValue}>
                                    {nanny.price_per_hour}$
                                </span>
                            </div>
                            <button
                                className={clsx(styles.favoriteButton, {
                                    [styles.favoriteActive]: isFavorite,
                                })}
                                onClick={onToggleFavorite}
                            >
                                {isFavorite ? (
                                    <FaHeart size={26} />
                                ) : (
                                    <FaRegHeart size={26} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className={styles.attributesList}>
                        <div className={styles.attributeTag}>
                            Age:{" "}
                            <span className={styles.attributeValue}>
                                {nanny.birthday
                                    ? new Date().getFullYear() -
                                      new Date(nanny.birthday).getFullYear()
                                    : "N/A"}
                            </span>
                            <span className={styles.attributeSub}>
                                (Birthday:{" "}
                                {new Date(nanny.birthday).toLocaleDateString()})
                            </span>
                        </div>
                        <div className={styles.attributeTag}>
                            Experience:{" "}
                            <span className={styles.attributeValue}>
                                {nanny.experience}
                            </span>
                        </div>
                        <div className={styles.attributeTag}>
                            Kids Age:{" "}
                            <span className={styles.attributeValue}>
                                {nanny.kids_age}
                            </span>
                        </div>
                        <div className={styles.attributeTag}>
                            Education:{" "}
                            <span className={styles.attributeValue}>
                                {nanny.education}
                            </span>
                        </div>
                    </div>

                    <div className={styles.charactersList}>
                        {nanny.characters.map((char, index) => (
                            <span key={index} className={styles.characterBadge}>
                                {char}
                            </span>
                        ))}
                    </div>

                    <p className={styles.description}>{nanny.about}</p>

                    {!isExpanded && (
                        <button
                            className={styles.readMoreButton}
                            onClick={() => setIsExpanded(true)}
                        >
                            Read more
                        </button>
                    )}

                    {isExpanded && (
                        <div className={styles.expandedContent}>
                            <ul className={styles.reviewsList}>
                                {nanny.reviews.map((review, index) => (
                                    <li
                                        key={index}
                                        className={styles.reviewItem}
                                    >
                                        <div className={styles.reviewerAvatar}>
                                            {review.reviewer
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <div className={styles.reviewContent}>
                                            <h4 className={styles.reviewerName}>
                                                {review.reviewer}
                                            </h4>
                                            <div
                                                className={styles.reviewRating}
                                            >
                                                <FaStar
                                                    className={styles.starIcon}
                                                    size={16}
                                                />
                                                <span>{review.rating}</span>
                                            </div>
                                            <p className={styles.reviewComment}>
                                                {review.comment}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={styles.appointmentButton}
                                onClick={appointmentModal.open}
                            >
                                Make an appointment
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={appointmentModal.isOpen}
                onClose={appointmentModal.close}
            >
                <AppointmentForm
                    nanny={nanny}
                    onClose={appointmentModal.close}
                />
            </Modal>
        </>
    );
};

export default NannyCard;
