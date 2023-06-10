import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const [confidence, setConfidence] = useState();
  const [result, setResult] = useState("");
  const [lang, setLang] = useState("DescriptionEn");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: any) => {
    setLang(event.target.value);
  };

  const translateHandler = async () => {
    if (!text?.length) return;
    setIsLoading(true);
    try {
      let data = {
        text: text,
        target_lang: lang,
      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api-translate.ss.ge/translate",
        headers: {
          Authorization: "Bearer 1f77fffad867618cf7357efc1dbe9456",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      setIsLoading(false);
      setResult(response.data?.translation);
      setConfidence(response.data?.confidence?.toFixed(2));
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
          Welcome to{" "}
          <a className={"title-span"} href="https://nextjs.org">
            SS-AI
          </a>
        </h1>

        <div className={"form"}>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target?.value);
            }}
            placeholder="Enter Text"
            className="my-textarea"
          />
          <div
            style={{
              marginTop: 30,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <select
              className="my-selector"
              value={lang}
              onChange={handleChange}
            >
              <option value="DescriptionEn">English</option>
              <option value="DescriptionRu">Русский</option>
              <option value="DescriptionGe">ქართული</option>
            </select>
            {confidence ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  background: "#58585845",
                  width: "fit-content",
                  borderRadius: 10,
                  padding: "10px 0 10px 10px",
                  overflow: "hidden",
                }}
              >
                <p style={{ margin: 0, color: "white" }}>
                  Confidence:{" "}
                  <span
                    style={{
                      color: "white",
                      background: "#0070f3c7",
                      padding: 10,
                      marginLeft: 10,
                    }}
                  >
                    {confidence}
                  </span>
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <button
            className="my-button"
            type="button"
            onClick={() => translateHandler()}
          >
            Translate
          </button>
        </div>
        <div className="result">
          <p className="result-text">
            {result?.length ? result : "Results will be here...."}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
