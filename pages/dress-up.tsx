import axios from "axios";
import React, { useState } from "react";
import * as S from "../components/Templates/DressUp/style";
import { Button, FormControlLabel, Slider } from "@mui/material";
import Loader from "../components/common/Loader";
import { AnimatePresence } from "framer-motion";

const DressUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [imgUrlHasErr, setImgUrlHasErr] = useState(false);
  const [limit, setLimit] = useState<number>(10);
  const [score, setScore] = useState<number>(50);
  const [similarImages, setSimilarImages] = useState<any>([]);
  const [showHover, setShoHover] = useState<any>();

  const searchHandler = async () => {
    if (!imgUrl?.length) {
      setImgUrlHasErr(true);

      setTimeout(() => {
        setImgUrlHasErr(false);
      }, 1500);
      return;
    }
    setIsLoading(true);
    try {
      let data = JSON.stringify({
        img_path: imgUrl,
        limit: limit,
        minimal_score: score / 100,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://similarity-api.ss.ge/search_dress_up`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = (await axios.request(config)).data;
      if (response?.success) {
        setSimilarImages(response?.data?.similar_images);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      alert("error");
      console.log("Error:", error);
    }
  };

  console.log(similarImages);

  return (
    <S.DressUpContainer>
      {isLoading ? <Loader /> : null}
      <S.FormSection>
        <S.FormContainer>
          <h1>
            Similarity <span>Search</span>
          </h1>
          <S.InputsContainer>
            <S.FormInput
              type="text"
              $hasError={imgUrlHasErr}
              placeholder="Image path"
              onChange={(e) => setImgUrl(e.target.value)}
              value={imgUrl}
            />
            <S.FormInput
              type="number"
              placeholder="Returned Img Count"
              onChange={(e) => setLimit(parseInt(e.target.value))}
              value={limit}
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
                background: "#1b75bb",
                color: "white",
              }}
              onClick={() => searchHandler()}
            >
              Search
            </Button>
          </S.InputsContainer>
          <S.PreviewImage src={imgUrl} alt="" />
        </S.FormContainer>
      </S.FormSection>
      <S.ResultsSection>
        <S.ResultsContainer>
          {similarImages?.map((product: any, i: any) => (
            <S.ImageBox
              target="_blank"
              href={product?.payload?.product_url}
              onMouseOver={() =>
                setShoHover(`${product?.payload?.img_path}${i}`)
              }
              onMouseLeave={() => setShoHover(undefined)}
            >
              <AnimatePresence>
                {showHover &&
                  showHover === `${product?.payload?.img_path}${i}` && (
                    <S.Hover
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                    >
                      <S.Score>{(product?.score * 100).toFixed(2)}%</S.Score>
                    </S.Hover>
                  )}
              </AnimatePresence>
              <S.RenderedImage
                $hovered={
                  !!showHover &&
                  showHover === `${product?.payload?.img_path}${i}`
                }
                src={product?.payload?.img_path}
                alt={product?.payload?.product_name}
              />
            </S.ImageBox>
          ))}
        </S.ResultsContainer>
      </S.ResultsSection>
    </S.DressUpContainer>
  );
};

export default DressUp;
