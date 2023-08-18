import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

const Similarity: NextPage = () => {
  const [text, setText] = useState("");
  const [confidence, setConfidence] = useState();
  const [result, setResult] = useState("");
  const [lang, setLang] = useState("DescriptionEn");
  const [version, setVersion] = useState("new");
  const [isLoading, setIsLoading] = useState(false);

  const [imgUrl, setImgUrl] = useState("");
  const [id, setId] = useState<number>();

  const [message, setMessage] = useState("");
  const [similar_id, setSimilarId] = useState("");
  const [similarImgUrl, setSimilarImgUrl] = useState("");
  const [score, setScore] = useState("");

  const translateHandler = async () => {
    if (!imgUrl?.length || !!!id) return;
    setIsLoading(true);
    try {
      let data = JSON.stringify({
        ss_id: id,
        path: imgUrl,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api-translate.ss.ge/search",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      setIsLoading(false);
      console.log(response.data);
      setSimilarImgUrl(response.data?.img_url);
      setMessage(response.data?.message);
      setSimilarId(response.data?.similar_id);
      setScore(response.data?.score);
    } catch (error) {
      setIsLoading(false);
      alert("error");
      console.log("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SS-AI</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" type="image/ico" href="https://ss.ge/favicon2.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <main className={styles.main}>
        {isLoading ? (
          <div className="loader-cont">
            <div className="loadingio-spinner-ripple-cmyt7s2fej9">
              <div className="ldio-8g16pyg0jxd">
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <h1 className={"title"} style={{ color: "white" }}>
          Similarity{" "}
          <a className={"title-span"} href="https://nextjs.org">
            Search
          </a>
        </h1>

        <div className="similar-div">
          <div className="similar-inputs-div">
            <input
              type="text"
              className="similar-input"
              placeholder="Paste Img Url"
              onChange={(e) => setImgUrl(e.target.value)}
              value={imgUrl}
            />
            <input
              type="number"
              className="similar-input"
              placeholder="Enter Statement id"
              onChange={(e) => setId(parseInt(e.target.value))}
              value={id}
            />
          </div>
          <button
            className="my-button"
            type="button"
            onClick={() => translateHandler()}
          >
            Search
          </button>
        </div>

        <div className="similar-result">
          <div className="similar-result-img">
            <img src={imgUrl} alt="" className="similar-img" />
            <img src={similarImgUrl} alt="" className="similar-img" />
          </div>
          {message?.length ? (
            <div className="similar-results">
              <p className="similar-text">{message}</p>
              <p className="similar-text">similar_id: {similar_id}</p>
              <p className="similar-text">score: {score}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
};

export default Similarity;
