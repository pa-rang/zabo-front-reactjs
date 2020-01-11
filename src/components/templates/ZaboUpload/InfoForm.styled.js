import styled from 'styled-components';

const InfoFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 90vh;

  /*label on all inputs*/
  .label {
    margin-top: 20px;
    font-size: 12px;
    color: #8f8f8f;
  }
  /*container for all inputs*/
  .inputContainer {
    width: 100%;
    margin: 5px 0px;
    padding: 9px 10px;
    border-radius: 4px;
    background-color: #f4f4f4;
  }

  /* ========= Inputs ========= */
  .inputs {
    width: 100%;
  }
  /*section: .zabo-poster //*/

  /*// div: .info //
  // section: zabo-title, zabo-description, zabo-expiration*/
  .zabo-description > div > textarea,
  .zabo-title > div > textarea,
  .zabo-expiration > div > div > div > input {
    font-family: "NanumSquare", sans-serif;
  }
  /*// section: zabo-keywords*/
  .zabo-keywords {
    margin-bottom: 30px;
  }
  .tags {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .tag {
    font-size: 14px;
    margin: 10px 10px 0px 0px;
    padding: 4.5px 10px;
    border-radius: 3px;
  }
  .tag:hover {
    color: white;
    background-color: #143441;
  }
  .tag:active {
    opacity: 0.8;
    transform: translate3d(1px, 1px, 1px);
  }
  /*// tag colors*/
  .default {
    color: #c5c5c5;
    background-color: #f4f4f4;
  }
  .selected {
    color: white;
    background-color: #143441;
  }

  /* ========== Submit ========== */
  .submit {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .submit > button {
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-family: "NanumSquare", sans-serif;
    border-color: #143441;
    border-radius: 4px;
    color: white;
    background-color: #143441;
    box-shadow: 0px 3px 6px;
  } /*// button 에는 margin-bottom 이 필요 없잖아.
  // 컴포넌트는 그 자체로만. Layout 은 감싸는 div 가 해결.*/
  .submit > button:hover {
    opacity: 0.9;
  }
  .submit > button:active {
    transform: translate3d(1px, 1px, 1px);
  }

  .loading-bar {
    margin: 24px 0;
    padding: 0 20px;
    width: 100%;
    display: flex;
    .loading-active {
      width: 0;
      border-top: 5px solid pink;
    }
    .loading-inactive {
      flex: 1;
      border-top: 5px solid gainsboro;
    }
  }

  /* ======================================== */
  /* ============ Responsive CSS ============ */
  /* ======================================== */
  @media (min-width: 800px) {
    .headerLow {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    /* ==== adjust position into two columns ==== */
    .inputs {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    section.zabo-poster,
    div.info,
    .submit > button {
      width: calc(50% - 10px);
    }
    .posterContainer {
      height: 524px;
    }

    /*// === loading bar === //*/
    .loading-bar {
      width: 640px;
      padding: 0;
    }
  }
`;

InfoFormWrapper.TitleImage = styled.section`
  width: 50%;
  height: 100%;
  img {
    width: 100%;
    height: auto;
    margin-top: 40px;
  }
`;

InfoFormWrapper.Info = styled.section`
  width: 50%;
  height: 100%;
`;

export {
  InfoFormWrapper,
};