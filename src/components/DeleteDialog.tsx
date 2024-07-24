import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export interface DeleteDialogProps {
  openDialog: boolean;
  handleOnCloseDialog: () => void;
  handleSubmit: () => void;
}

export function DeleteDialog({
  openDialog,
  handleOnCloseDialog,
  handleSubmit,
}: DeleteDialogProps) {
  return (
    <Dialog open={openDialog} onClose={handleOnCloseDialog}>
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this item?
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit()}>Delete</Button>
        <Button onClick={() => handleOnCloseDialog()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
