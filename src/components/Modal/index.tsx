import ReactModal from "react-modal";
import { useEffect } from "react";
import styles from "./Modal.module.css";

interface Props {
	isOpen: boolean;
	closeModal: (
		e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent
	) => void;
}

export const Modal: React.FC<Props> = ({ isOpen, closeModal, children }) => {
	useEffect(() => {
		ReactModal.setAppElement("#root");
	}, []);

	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={closeModal}
			className={styles.modal}
			overlayClassName={styles.overlay}
			shouldFocusAfterRender={false}
		>
			{children}
		</ReactModal>
	);
};
