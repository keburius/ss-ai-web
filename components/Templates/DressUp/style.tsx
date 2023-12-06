import { motion } from "framer-motion";
import styled from "styled-components";

export const DressUpContainer = styled("div")`
  height: 100vh;
  width: 100%;

  display: grid;
  grid-template-columns: 50% 50%;
`;
export const FormSection = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-size: 36px;
    color: white;

    span {
      color: #1b75bb;
    }
  }
`;

export const FormContainer = styled("div")`
  width: 400px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  padding: 20px;
`;

export const InputsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FormInput = styled("input")<{ $hasError?: boolean }>`
  width: 100%;
  background: #58585845;
  border: none;
  border-radius: 8px;
  height: 30px;
  outline: none;
  padding: 10px;
  color: white;
  height: 50px;
  border: ${({ $hasError }) => ($hasError ? "1px solid red" : "none")};
`;

export const ResultsSection = styled("div")`
  background: white;
`;
export const ResultsContainer = styled("div")`
  max-height: 100vh;
  height: 100vh;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1023px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1500px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
export const ImageBox = styled("a")`
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  height: 300px;
  position: relative;
`;
export const RenderedImage = styled("img")<{ $hovered: boolean }>`
  width: 100%;
  height: 100%;
  transition: all 0.2s;
  transform: ${({ $hovered }) => ($hovered ? "scale(0.9)" : "scale(1.2)")};
  object-fit: cover;
`;
export const Hover = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #0c1c2bad;

  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Score = styled("h2")`
  color: white;
`;
export const PreviewImage = styled("img")`
  width: 200px;
  margin-top: 20px;
  border-radius: 10px;
`;
