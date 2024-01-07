import { FC, ButtonHTMLAttributes, ReactNode, useState, useEffect } from "react";

interface ModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	openModal: boolean;
	closeModalCallback: (close: boolean) => void;
	children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ openModal, closeModalCallback, className, children, ...props }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		setIsModalOpen(openModal);
	}, [openModal]);

	return (
		<>
			{openModal && (
				<dialog id="my_modal_1" className="modal" open>
					<div className="modal-box border border-white">{children}</div>
					<div className="modal-backdrop">
						<button
							className="backdrop-blur-sm"
							onClick={() => {
								closeModalCallback(false);
								setIsModalOpen(false);
							}}
						>
							close
						</button>
					</div>
				</dialog>
			)}
		</>
	);
};
