import { useHistory, useLocation } from "react-router-dom";

export type UseNavigatorResult = (
  url: string,
  replace?: boolean,
  preserveQs?: boolean
) => void;
function useNavigator(): UseNavigatorResult {
  let history = useHistory();
  let location = useLocation();
  return (url: string, replace = false, preserveQs = false) => {
    const targetUrl = preserveQs ? url + location.search : url;
    if (replace) {
      history.replace(targetUrl);
    } else {
      history.push(targetUrl);
    }

    window.scrollTo({ behavior: "smooth", top: 0 });
  };
}

export default useNavigator;
