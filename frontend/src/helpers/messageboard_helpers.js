import moment from "moment";

export function formatDate(dateString) {
  return moment(dateString).format("MMMM Do, h:mma");
}

export function scrollToBottom(elementRef) {
  elementRef.current.scrollIntoView({ behavior: "smooth" });
}

export function validMessage(message) {
  return message.trim();
}
