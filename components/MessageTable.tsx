"use client";

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
import clsx from "clsx";
import { Archive } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, useCallback } from "react";

const MessageTable = ({ messages }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  // custom columns:

  const renderCell = useCallback(
    (message, columnKey) => {
      const cellValue = message[columnKey];
      console.log(cellValue);
      switch (columnKey) {
        case "recipientOrSender":

        case "text":
          return <div className="truncate">{cellValue}</div>;
        case "createdAt":
          return <div>{cellValue}</div>;
        default:
          return (
            <>
              <Button isIconOnly variant="light">
                <Archive size={24} className="text-danger" />
              </Button>
            </>
          );
      }
    },
    [isOutbox, messages],
  );

  const handleRowSelect = (key: Key) => {
    const message = messages.find((message) => message.id === key);
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
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
            return (
              <TableRow key={message.id} className="cursor-pointer">
                {(columnKey) => (
                  <TableCell key={columnKey}>
                    {columnKey === "recipientOrSender" ? (
                      isOutbox ? (
                        <div className="flex items-center gap-2 cursor-pointer">
                          <Avatar
                            src={
                              isOutbox
                                ? message.recipient.image
                                : message.sender.image
                            }
                          />
                          <span>{message.recipient.firstName}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 cursor-pointer">
                          <Avatar
                            src={
                              isOutbox
                                ? message.recipient.image
                                : message.sender.image
                            }
                          />
                          <span>{message.sender.firstName}</span>
                        </div>
                      )
                    ) : (
                      <div
                        className={clsx("text-gray-400/90", {
                          "text-gray-200 font-semibold":
                            !message.dateSeen && !isOutbox,
                        })}
                      >
                        {console.log(columnKey)}
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
