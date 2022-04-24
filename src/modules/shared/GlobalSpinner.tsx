import { css } from "@emotion/react";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { PuffLoader } from "react-spinners";

const overrideLoadingStyle = css`
  position: absolute;
  display: block;
  top: 45%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 9999;
`;

export const GlobalSpinnerComponent = (props: { loadingKey: string }) => {
  const loadingHelper = useGlobalLoading();
  const { promiseInProgress } = usePromiseTracker({ area: props.loadingKey });

  const show = () => loadingHelper.loading || promiseInProgress;

  return show() ? (
    <>
      <div className="spinner-background"></div>
      <PuffLoader color="#63b8ff" size={120} css={overrideLoadingStyle} />
    </>
  ) : (
    <></>
  );
};
