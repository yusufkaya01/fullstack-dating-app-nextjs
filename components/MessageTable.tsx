"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

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

  return (
    <Table
      aria-label="Table with messages"
      selectionMode="single"
      onRowAction={(key) => {}}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={messages} emptyContent="No messages for this container">
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
  );
};

export default MessageTable;
