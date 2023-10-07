import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControlLabel,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Slider,
  Switch,
} from "@mui/material";

const Similarity: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [imgUrl, setImgUrl] = useState("");
  const [imgId, setImgId] = useState<number>();
  const [score, setScore] = useState<number>(90);
  const [onlySearch, setOnlySearch] = useState(true);
  const [limit, setLimit] = useState<number>();

  const [similarImages, setSimilarImages] = useState<any>([]);

  const translateHandler = async () => {
    if (!imgUrl?.length || !!!imgId) return;
    setIsLoading(true);
    try {
      let data = JSON.stringify({
        img_id: imgId,
        img_path: imgUrl,
        only_search: onlySearch,
        limit: limit,
        minimal_score: score / 100,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://similarity-api.ss.ge/search",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = (await axios.request(config)).data;
      if (response?.success) {
        setIsLoading(false);
        setSimilarImages(response.data.similar_images);
      }
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

      <main>
        {isLoading ? (
          <div className="loader-cont" style={{ zIndex: 100000 }}>
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "calc(100vh - 20px)",
          }}
        >
          <div
            className="similar-div"
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "500px",
                flexDirection: "column",
                display: "flex",
                gap: "20px",
                // alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 className={"title"} style={{ color: "white" }}>
                Similarity{" "}
                <a className={"title-span"} href="https://nextjs.org">
                  Search
                </a>
              </h1>
              <div className="similar-inputs-div">
                <input
                  type="number"
                  className="similar-input"
                  placeholder="Image ID"
                  onChange={(e) => setImgId(parseInt(e.target.value))}
                  value={imgId}
                />
                <input
                  type="text"
                  className="similar-input"
                  placeholder="Image path"
                  onChange={(e) => setImgUrl(e.target.value)}
                  value={imgUrl}
                />
                <input
                  type="number"
                  className="similar-input"
                  placeholder="Returned Img Count"
                  onChange={(e) => setLimit(parseInt(e.target.value))}
                  value={limit}
                />
              </div>

              <FormControlLabel
                control={
                  <Switch
                    checked={onlySearch}
                    onChange={() => setOnlySearch(!onlySearch)}
                    name="gilad"
                  />
                }
                label="Only Search"
                style={{
                  marginTop: "20px",
                }}
              />

              <FormControlLabel
                control={
                  <Slider
                    defaultValue={score}
                    onChange={(e: any) => setScore(e?.target?.value!)}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                }
                label="Similarity Rate"
                labelPlacement="top"
                style={{
                  marginTop: "20px",
                }}
              />

              <Button
                variant="outlined"
                style={{
                  marginTop: 20,
                }}
                onClick={() => translateHandler()}
              >
                Search
              </Button>
            </div>
          </div>

          <ImageList sx={{ width: "50%", height: "100%" }}>
            {similarImages.map((img: any) => (
              <ImageListItem sx={{ width: "100%", height: 400 }} key={img.id}>
                <img
                  srcSet={`${img.payload.img_path}?w=248&fit=crop&auto=format&dpr=3 1x`}
                  src={`${img.payload.img_path}?w=248&fit=crop&auto=format`}
                  alt={img.payload.img_path}
                  loading="eager"
                />
                <ImageListItemBar
                  style={{ color: "white" }}
                  title={img.score}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </main>
    </div>
  );
};

export default Similarity;