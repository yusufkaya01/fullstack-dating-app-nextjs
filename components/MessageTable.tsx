"use client";

import { deleteMessage } from "@/actions/messageAction";
import { truncateMessage } from "@/utils/truncateMessageStr";
import {
  Avatar,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { Message } from "@prisma/client";
import clsx from "clsx";
import { Archive } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, useCallback, useState } from "react";

// type Props = {
//   messages: Message[];
// };

const MessageTable = ({ messages }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [deleting, setDeleting] = useState({
    id: "",
    loading: false,
  });

  const isOutbox = searchParams.get("container") === "outbox";

  const columns = [
    {
      key: "recipientOrSender",
      label: isOutbox ? "To" : "From",
    },
    {
      key: "text",
      label: "Message",
    },
    {
      key: "createdAt",
      label: isOutbox ? "Sent" : "Received",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  const handleDeleteMessage = useCallback(
    async (message) => {
      setDeleting({ id: message.id, loading: true });
      await deleteMessage(message.id, isOutbox);
      setDeleting({ id: "", loading: false });
    },
    [isOutbox],
  );

  const renderCell = useCallback(
    (message, columnKey) => {
      const cellValue = message[columnKey];
      switch (columnKey) {
        case "recipientOrSender":
        case "text":
          return <div>{truncateMessage(cellValue, 50)}</div>;
        case "createdAt":
          return <div>{cellValue}</div>;
        default:
          return (
            <Button
              isIconOnly
              variant="light"
              onClick={() => handleDeleteMessage(message)}
              isLoading={deleting.id === message.id && deleting.loading}
            >
              <Archive size={24} className="text-danger" />
            </Button>
          );
      }
    },
    [deleting.id, deleting.loading, handleDeleteMessage],
  );

  const handleRowSelect = (key) => {
    const message = messages.find((message) => message.id === key);
    if (!message) return;

    const url = isOutbox
      ? `/members/${message.recipientId}`
      : `/members/${message.senderId}`;
    router.push(url + "/chat");
  };

  return (
    <Card className="flex flex-col gap-3 h-[80vh] overflow-auto glass light-blue-mesh">
      <Table
        aria-label="Table with messages"
        selectionMode="single"
        onRowAction={(key) => {
          handleRowSelect(key);
        }}
        shadow="none"
        removeWrapper
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={messages}
          emptyContent="No messages for this container"
        >
          {(message) => {
            if (!message) return null; // Handle null messages

            return (
              <TableRow key={message.id} className="cursor-pointer">
                {(columnKey) => (
                  <TableCell key={columnKey}>
                    {columnKey === "recipientOrSender" ? (
                      isOutbox ? (
                        <div className="flex items-center gap-2 cursor-pointer">
                          <Avatar src={message.recipient?.image} />
                          <span>{message.recipient?.firstName}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 cursor-pointer">
                          <Avatar src={message.sender?.image} />
                          <span>{message.sender?.firstName}</span>
                        </div>
                      )
                    ) : (
                      <div
                        className={clsx("text-gray-400/90", {
                          "text-white font-semibold":
                            !message.dateSeen && !isOutbox,
                        })}
                      >
                        {renderCell(message, columnKey)}
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MessageTable;
