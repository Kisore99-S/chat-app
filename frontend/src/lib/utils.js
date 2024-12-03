import { isToday, isYesterday, format } from "date-fns";

export const formatMessageTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDateLabel = (date) => {
  const messageDate = new Date(date);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  return format(messageDate, "MMMM dd yyyy");
};

export const groupMessagesByDate = (messages) => {
  return messages.reduce((acc, message) => {
    const dateKey = format(new Date(message.createdAt), "yyyy-MM-dd");
    console.log("date key", dateKey);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(message);

    return acc;
  }, {});
};
