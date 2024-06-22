type MessageDto = {
  id: string;
  text: string;
  created: string;
  dateRead: string | null;
  senderId?: string;
  senderName?: string;
  senderImage?: string | null;
  recipientId?: string;
  recipientName?: string;
  recipientImage?: string | null;
};
