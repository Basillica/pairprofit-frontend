import {
  createContext,
  useContext,
  createSignal,
  onMount,
  createEffect,
  JSX,
} from "solid-js";
import type { Accessor, Setter } from "solid-js";

interface AppContextType {
  socket: Accessor<WebSocket | null>;
  sendMessage: (data: string) => void;
  socketMessage: Accessor<MessageEvent<string>>;
  setSocketMessage: Setter<MessageEvent<string>>;
  updateNotifWidget: Accessor<boolean>;
  setNotifWidget: Setter<boolean>;
  syncMode: Accessor<boolean>;
  setSyncMode: Setter<boolean>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = (props: {
  url: string;
  query: Accessor<string>;
  children: JSX.Element;
}) => {
  const [socket, setSocket] = createSignal<WebSocket | null>(null);
  const [socketMessage, setSocketMessage] = createSignal<MessageEvent<string>>(
    new MessageEvent("")
  );
  const [updateNotifWidget, setNotifWidget] = createSignal<boolean>(false);
  const [syncMode, setSyncMode] = createSignal(false);
  let retryCount = 0;
  const maxRetries = 4;

  function connectToWS() {
    if (socket()) {
      console.log("client is already connected");
      return;
    }
    retryCount++;
    if (retryCount >= maxRetries) return;
    const ws = new WebSocket(`${props.url}&${props.query()}`);

    setSocket(ws);
    socket()!.onmessage = (event: MessageEvent<string>) => {
      const ev = JSON.parse(event.data);
      console.log(ev);
      setSocketMessage(event);
    };

    ws.onclose = function (e) {
      console.log(
        "Socket is closed. Reconnection will be attempted in 5 second.",
        e.reason
      );
    };

    ws.onerror = function (err) {
      console.error("Socket encountered error: ", err, "Closing socket");
      if (ws) ws.close();
      if (retryCount >= maxRetries) {
        setTimeout(function () {
          connectToWS();
        }, 5000);
      }
    };

    ws.close = () => {
      setSocket(null);
    };
  }

  onMount(async () => {
    if (!socket()) {
      if (props.query() !== "") {
        connectToWS();
      }
    }
  });

  createEffect(() => {
    if (props.query() !== "") {
      connectToWS();
    }
    return () => {
      if (socket()) socket()!.close();
    };
  }, [props.query]);

  const sendMessage = (data: string) => {
    socket()?.send(data);
  };

  return (
    <AppContext.Provider
      value={{
        socket,
        sendMessage,
        socketMessage,
        setSocketMessage,
        updateNotifWidget,
        setNotifWidget,
        syncMode,
        setSyncMode,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};
