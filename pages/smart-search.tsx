import axios from "axios";
import React, { useState } from "react";
import * as S from "../components/Templates/SmartSearch/style";

const SmartSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [limit, setLimit] = useState<number>();
  const [score, setScore] = useState<number>(90);

  const translateHandler = async () => {
    if (!imgUrl?.length || !limit) return;
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
        url: `https://similarity-api.ss.ge/search`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = (await axios.request(config)).data;
      if (response?.success) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      alert("error");
      console.log("Error:", error);
    }
  };

  return <S.TranslateHandlerContainer>SmartSearch</S.TranslateHandlerContainer>;
};

export default SmartSearch;
