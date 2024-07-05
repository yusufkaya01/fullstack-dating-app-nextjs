"use client";

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Key } from "react";

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
  ];

  const handleRowSelect = (key: Key) => {
    const message = messages.find((message) => message.id === key);
    const url = isOutbox
      ? `/members/${message?.receiverId}`
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
                    {columnKey === "recipientOrSender"
                      ? isOutbox
                        ? message.recipient.firstName
                        : message.sender.firstName
                      : getKeyValue(message, columnKey)}
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
