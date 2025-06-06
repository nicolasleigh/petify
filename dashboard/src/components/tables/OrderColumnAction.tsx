import { Eye, Loader, MoreHorizontal, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DialogItem from "./DialogItem";

export default function OrderColumnAction({ orderId, isProduct }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  function handleOpenDelete(open) {
    setOpenDeleteDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  }

  const handleDelete = async (setOpenDialog) => {
    setBusy(true);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.error("Not authorized to perform this operation");
    setBusy(false);
    setOpenDialog(false);
    setDropdownOpen(false);
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-3 w-3 sm:w-8 sm:h-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <div
            className='w-full flex  items-center gap-3'
            onClick={() => {
              if (isProduct) {
                return navigate(`/product/details/${orderId}`);
              }
              navigate(`/order/details/${orderId}`);
            }}
          >
            <Eye strokeWidth={0.9} size={20} />
            <span>{"Details"}</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DialogItem
          triggerChildren={
            <div className='flex items-center gap-3 '>
              <Trash2 strokeWidth={0.9} size={20} />
              <span>{"Delete"}</span>
            </div>
          }
          onOpenChange={handleOpenDelete}
          open={openDeleteDialog}
          className='w-[350px] sm:w-[500px]'
        >
          <DialogHeader>
            <DialogTitle>{"Are you sure?"}</DialogTitle>
            <DialogDescription>{"This action will remove this order permanently!"}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={busy}
              onClick={() => {
                setOpenDeleteDialog(false);
                setDropdownOpen(false);
              }}
              variant='secondary'
            >
              {"Cancel"}
            </Button>
            <Button
              onClick={() => {
                handleDelete(setOpenDeleteDialog);
              }}
              variant='destructive'
              disabled={busy}
            >
              <span className='w-12 flex items-center justify-center'>
                {busy ? <Loader className='animate-spin' /> : "Delete"}
              </span>
            </Button>
          </DialogFooter>
        </DialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
