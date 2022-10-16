import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    html{
        font-family: "Noto-Sans", sans-serif;
        scroll-behavior: smooth;
        background-color: #fff;
    }
    body{
        margin:0;
        padding:0;
    }
    .fixed{
        width: 100%;
        top: 0;
        left: 0;
        position: fixed;
    }
`;

export default GlobalStyle;
