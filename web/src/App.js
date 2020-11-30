import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { useQuery, useMutation } from "react-query";

const getItemsApi = async () => {
  const { data } = await axios.get("http://localhost:8090/simple_route/");
  console.log({ data });
  return data;
};

const postItemApi = async ({ text }) => {
  const { data } = await axios.post("http://localhost:8090/simple_route/", {
    text,
  });
  return data;
};

const useGetItems = (shouldFetch = true, setShouldFetch = () => {}) => {
  const returnParams = useQuery(["getItems", shouldFetch], getItemsApi, {
    onSuccess: (data) => {
      setShouldFetch(false);
      return data;
    },
    onError: (error) => {
      console.error(error);
      setShouldFetch(false);
    },
  });
  return returnParams;
};

const ShowDataItems = () => {
  const { data, status, isLoading, isFetching } = useGetItems();

  if (status === "loading" || isLoading || isFetching) {
    return "Loading";
  }

  console.log({ data });
  return (
    <>
      {data?.map((item) => (
        <p key={item.text}>{item.text}</p>
      ))}
    </>
  );
};

const ShowAndPushDataItems = () => {
  const [newItem, setNewItem] = useState("");
  const [shouldFetchData, setShouldFetchData] = useState(true);

  const { data, status, isLoading, isFetching } = useGetItems(
    shouldFetchData,
    setShouldFetchData
  );
  const [
    postItem,
    {
      status: postStatus,
      isLoading: postIsLoading,
      isFetching: postISFetching,
    },
  ] = useMutation(postItemApi, {
    onSuccess: () => {
      setShouldFetchData(true);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  if (
    status === "loading" ||
    isLoading ||
    isFetching ||
    postStatus === "loading" ||
    postIsLoading ||
    postISFetching
  ) {
    return "Loading";
  }
  return (
    <>
      {data?.map((item) => (
        <p key={item.text}>{item.text}</p>
      ))}
      <input
        value={newItem}
        onChange={(e) => {
          setNewItem(e.target.value);
        }}
      />
      <button
        onClick={() => {
          postItem({ text: newItem });
        }}
      >
        Push item
      </button>
    </>
  );
};

function App() {
  return (
    <div className="App" style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "50%", borderRight: "1px solid grey" }}>
        <p>Just data</p>
        <ShowDataItems />
      </div>
      <div style={{ width: "45%" }}>
        <p>Data and Push</p>
        <ShowAndPushDataItems />
      </div>
    </div>
  );
}

export default App;
