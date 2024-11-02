import React from "react";
const ConfirmModal = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      handleCloseModal();
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleOutsideClick}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 text-center w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4 rounded-full">
              <img src="public/images/Logo.png" className="w-12"></img>
            </div>
            <p className="text-gray-700 mb-2">
              Anda yakin untuk Top Up sebesar
            </p>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              ceritanya jumlah
            </p>
            <div className="flex flex-col mt-7">
              <button className="text-red-500 font-semibold mb-5">
                Ya, lanjutkan Top Up
              </button>
              <button className="text-gray-400" onClick={handleCloseModal}>
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ConfirmModal;
