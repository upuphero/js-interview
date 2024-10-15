import { useState } from "react";
export default function OfferButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOfferAccepted, setOfferAccepted] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleAcceptOffer = () => {
    setOfferAccepted(true);
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      {isOfferAccepted ? (
        <p>Offer accpeted</p>
      ) : (
        <button onClick={handleOpenModal}> Show offer</button>
      )}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>
              x
            </button>
            <h2>Special Offer</h2>
            <p>Click the button below to accept our amazing offer!</p>
            <button className="accept-button" onClick={handleAcceptOffer}>
              Accept offer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
