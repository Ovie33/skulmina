"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { createPortal } from "react-dom";
import { isPromise } from "util/types";

type ConfirmButtonProps = {
  title?: string;
  description?: string;
  onConfirm?: (done?: () => void) => void | Promise<any>;
} & ButtonProps;

const ConfirmButton = ({
  title = "Are you sure of this action ?",
  description,
  onConfirm,
  ...props
}: ConfirmButtonProps) => {
  const [isopen, setIsopen] = useState<boolean>(false);

  const handleConfirmation = () => {
    if (onConfirm === undefined) return setIsopen(false);
    const result = onConfirm(() => setIsopen(false));
    if (result?.then) {
      result.finally(() => setIsopen(false));
    }
  };

  return (
    <Dialog open={isopen} onOpenChange={() => setIsopen(!isopen)}>
      <Button onClick={() => setIsopen(true)} {...props}></Button>
      {createPortal(
        <DialogContent>
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-center">{title}</DialogTitle>
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full justify-center">
            <Button
              onClick={handleConfirmation}
              variant={props.variant}
              className="mr-4"
            >
              Proceed
            </Button>
            <Button variant="secondary" onClick={() => setIsopen(!isopen)}>
              Cancel
            </Button>
          </div>
        </DialogContent>,
        document.body
      )}
    </Dialog>
  );
};

export default ConfirmButton;
