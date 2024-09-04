"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
  isComment?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
  isComment,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} className="w-full" ref={ref}>
      <div className={isComment ? "space-y-2 py-2 p-0 md:px-6" : "space-y-2 py-2 px-6"}>
        <Textarea
          name="content"
          variant="bordered"
          color="secondary"
          placeholder="Enter your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
          classNames={{
            base: isComment ? "w-full h-20 md:h-24 " : "w-full h-24",
            innerWrapper: isComment ? 'p-1 md:p-2' : 'p-2'
          }}
        />

        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}
        <div className={isComment ? "pt-2 text-center md:text-left" : "pt-2 "}>
          <FormButton  variant="flat" color="secondary">Create Comment</FormButton>
        </div>
      </div>
    </form>
  );

  return (
    <div className="flex w-full flex-col items-start justify-center gap-2 ">
      <Button  size="sm" color="secondary" variant="light" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}
