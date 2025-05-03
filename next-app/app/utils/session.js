import { v4 as uuidv4 } from "uuid";

const SESSION_KEY = "sessionId";

export function getOrCreateSessionId() {
  if (typeof window === "undefined") return "";
  // Check if the session ID is already stored in local storage
  let sessionId = localStorage.getItem(SESSION_KEY);

  // If not, create a new session ID and store it in local storage
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("sessionId", sessionId);
  }

  return sessionId;
}
