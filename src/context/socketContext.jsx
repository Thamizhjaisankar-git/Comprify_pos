import { createContext, useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const listenersRef = useRef(new Map());

  useEffect(() => {
    // Only connect if we have a token
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn(
        "No token found in localStorage - skipping socket connection"
      );
      return;
    }

    console.log("Attempting to connect to Socket.IO server...");
    setConnectionStatus("connecting");

    const newSocket = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket", "polling"], // Try both transports
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: token,
      },
      query: {
        clientType: "admin", // Identify as admin client
      },
    });

    // Connection established
    newSocket.on("connect", () => {
      console.log("⚡️ Connected to Socket.IO server with ID:", newSocket.id);
      setConnectionStatus("connected");

      // // Register after connection is established
      // newSocket.emit("register", {
      //   type: "admin",
      //   userId: getUserIdFromToken(token), // Implement this helper
      // });
    });

    // Connection lost
    newSocket.on("disconnect", (reason) => {
      console.log("⚠️ Disconnected:", reason);
      setConnectionStatus("disconnected");

      if (reason === "io server disconnect") {
        // Server intentionally disconnected us - try to reconnect
        setTimeout(() => newSocket.connect(), 1000);
      }
    });

    // Connection error
    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
      setConnectionStatus("error");

      // Handle specific error cases
      if (err.message.includes("401")) {
        console.error("Authentication failed - redirecting to login");
        // Handle unauthorized (redirect to login, etc.)
      }
    });

    // Reconnection attempts
    newSocket.on("reconnect_attempt", (attempt) => {
      console.log(`Reconnection attempt ${attempt}`);
      setConnectionStatus(`reconnecting (${attempt})`);
    });

    // Reconnection failed
    newSocket.on("reconnect_failed", () => {
      console.error("Reconnection failed");
      setConnectionStatus("failed");
    });

    // Debug all incoming events
    newSocket.onAny((event, ...args) => {
      console.log(`Received event: ${event}`, args);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      console.log("Cleaning up socket connection");
      newSocket.offAny(); // Remove all listeners
      newSocket.disconnect();
    };
  }, []); // Empty dependency array means this runs once on mount

  const addListener = (eventName, callback) => {
    if (!socket) return;

    // Remove existing listener if any
    if (listenersRef.current.has(eventName)) {
      socket.off(eventName, listenersRef.current.get(eventName));
    }

    // Add new listener
    socket.on(eventName, callback);
    listenersRef.current.set(eventName, callback);
  };

  // Add this function to remove listeners
  const removeListener = (eventName) => {
    if (!socket || !listenersRef.current.has(eventName)) return;
    socket.off(eventName, listenersRef.current.get(eventName));
    listenersRef.current.delete(eventName);
  };

  // Cleanup all listeners on unmount
  useEffect(() => {
    return () => {
      if (socket) {
        listenersRef.current.forEach((callback, eventName) => {
          socket.off(eventName, callback);
        });
        listenersRef.current.clear();
      }
    };
  }, [socket]);

  const value = {
    socket,
    connectionStatus,
    addListener,
    removeListener,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

// Helper function to extract user ID from JWT
function getUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.sub;
  } catch (err) {
    console.error("Failed to parse token:", err);
    return null;
  }
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

// In your socketContext.jsx
export const useSocketListener = (eventName, callback, dependencies = []) => {
  const { socket } = useSocket();
  const callbackRef = useRef(callback);

  // Keep callbackRef current
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!socket) return;

    const handler = (...args) => callbackRef.current(...args);
    socket.on(eventName, handler);

    return () => {
      socket.off(eventName, handler);
    };
  }, [socket, eventName, ...dependencies]);
};
