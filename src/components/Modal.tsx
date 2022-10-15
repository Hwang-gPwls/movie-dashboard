import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useRecoilState, useRecoilValue } from "recoil";

import { modalPropsState, selectedMediaState } from "../recoils/movie/atom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MovieModal = () => {
  const [modalProps, setModalProps] = useRecoilState(modalPropsState);
  const media = useRecoilValue(selectedMediaState);

  const handleClose = () => setModalProps({ ...modalProps, isOpen: false });

  return (
    <>
      {media ? (
        <div>
          <Modal
            open={modalProps.isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {media.title ? media.title : media.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {media.overview}
              </Typography>
              {modalProps.modalType === "List" ? (
                <>
                  <Button>수정</Button>
                  <Button>삭제</Button>
                </>
              ) : null}
            </Box>
          </Modal>
        </div>
      ) : null}
    </>
  );
};

export default MovieModal;
